import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { storageService } from "@/services/minio";
import { loadS3IntoPinecone } from "@/services/pinecone";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      console.log(session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    const userExists = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { fileName, fileContent, fileType } = body;

    if (!fileName || !fileContent || !fileType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fileUrl = await storageService.uploadFile(
      fileName,
      Buffer.from(fileContent, "base64"),
      fileType
    );

    const relativeKey = fileUrl.replace(
      `${process.env.STORAGE_ENDPOINT}/${process.env.STORAGE_BUCKET}/`,
      ""
    );

    await loadS3IntoPinecone(relativeKey);

    const chat = await prisma.chat.create({
      data: {
        fileKey: relativeKey,
        pdfName: fileName,
        pdfUrl: fileUrl,
        userEmail,
      },
    });

    return NextResponse.json(
      {
        chat_id: chat.id,
        message: "Chat criado com sucesso.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
