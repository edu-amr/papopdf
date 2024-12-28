import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

import { getContext } from "@/lib/getContext";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();

    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      return new Response(JSON.stringify({ error: "Chat not found" }), {
        status: 404,
      });
    }

    const fileKey = chat.fileKey;
    const lastMessage = messages[messages.length - 1];

    await prisma.message.create({
      data: {
        chatId,
        content: lastMessage.content,
        role: "user",
      },
    });

    const context = await getContext(lastMessage.content, fileKey);
    console.log(context)
    const prompt = {
      role: "system",
      content: `Você é a IA assistente do PapoPDF, uma plataforma projetada para auxiliar usuários a esclarecer dúvidas sobre documentos em PDF. 
      Você possui conhecimento especializado, é prestativo, perspicaz e capaz de se expressar de forma clara e articulada. 
      Sua conduta é sempre educada, cortês, amigável, gentil e inspiradora, e você está empenhado(a) em fornecer respostas detalhadas, bem estruturadas e fundamentadas no contexto fornecido.
      INÍCIO DO BLOCO DE CONTEXTO
      ${context}
      FIM DO BLOCO DE CONTEXTO
      Como assistente do PapoPDF, utilize exclusivamente o conteúdo do BLOCO DE CONTEXTO para responder às perguntas do usuário.`
    };

    // Se as informações necessárias para responder não estiverem no contexto fornecido, diga: "Desculpe, mas não sei a resposta para essa pergunta."

    const result = streamText({
      model: openai("gpt-4-turbo"),
      messages: [
        prompt,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...messages.filter((message: any) => message.role === "user"),
      ],
      async onFinish({ text }) {
        await prisma.message.create({
          data: {
            chatId,
            content: text,
            role: "system",
          },
        });
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Erro no processamento:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { chatId } = await req.json();

    if (!chatId) {
      return new Response(
        JSON.stringify({ error: "Chat ID is required" }),
        { status: 400 }
      );
    }

    await prisma.message.deleteMany({
      where: { chatId },
    });

    await prisma.chat.delete({
      where: { id: chatId },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar chat:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
