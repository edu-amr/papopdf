import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PDFChat } from "../_components/pdf-chat";
import { PDFPreview } from "../_components/pdf-preview";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function Chat({ params }: ChatPageProps) {
  const { chatId } = params;

  const chatData = await prisma.chat.findUnique({
    where: { id: chatId },
    select: {
      pdfUrl: true,
    },
  });

  if (!chatData) notFound();
  
  return (
    <div className="flex-1 overflow-hidden flex">
      <PDFChat chatId={chatId} className="flex-1" />
      <PDFPreview
        url={chatData.pdfUrl}
        chatId={chatId}
        className="lg:flex flex-1 hidden flex-col items-center"
      />
    </div>
  );
}
