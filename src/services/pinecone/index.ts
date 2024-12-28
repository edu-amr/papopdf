import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import md5 from "md5";

import { storageService } from "../minio";
import { openaiEdge } from "../openai";

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const filePath = await storageService.downloadFile(fileKey);

    if (!filePath) {
      throw new Error("Erro ao baixar o arquivo do S3");
    }

    const loader = new PDFLoader(filePath);
    const pages = (await loader.load()) as PDFPage[];

    const documents = await Promise.all(pages.map(prepareDocument));

    const vectors = await Promise.all(documents.flat().map(embedDocument));

    const pineconeIndex = pinecone.index("papopdf");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

    await namespace.upsert(vectors);

    return documents[0];
  } catch (error) {
    throw error;
  }
}

export function convertToAscii(inputString: string) {
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, "");
  return asciiString;
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent } = page;
  const { metadata } = page;

  if (!pageContent) {
    throw new Error("Página sem conteúdo");
  }

  if (!metadata || !metadata.loc || typeof metadata.loc.pageNumber !== "number") {
    throw new Error("Metadados da página estão incompletos");
  }

  pageContent = pageContent.replace(/\n/g, "");
  pageContent = pageContent.replace(/[^\x20-\x7E]/g, "");

  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  return docs;
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export async function getEmbeddings(text: string) {
  try {
    const response = await openaiEdge.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();

    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      console.error("Resposta inválida da API OpenAI:", result);
      throw new Error("Resposta inválida da API OpenAI.");
    }

    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}
