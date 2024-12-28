import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "40");

  const skip = (page - 1) * perPage;

  try {
    const documents = await prisma.chat.findMany({
      skip,
      take: perPage,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        pdfName: true,
      },
    });

    const totalDocuments = await prisma.chat.count();

    return NextResponse.json({
      documents: documents.map((doc) => ({
        id: doc.id,
        title: doc.pdfName,
        url: `/c/${doc.id}`,
        icon: "MessageCircle",
      })),
      total: totalDocuments,
      page,
      perPage,
    });
  } catch (error) {
    console.error("Erro ao buscar documentos:", error);
    return NextResponse.json({ error: "Erro ao buscar documentos" }, { status: 500 });
  }
}
