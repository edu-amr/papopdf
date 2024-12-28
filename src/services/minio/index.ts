import {
  DeleteObjectCommand,
  GetObjectCommand, 
  PutObjectCommand,
  S3Client} from '@aws-sdk/client-s3';
import fs from "fs";
import os from "os";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

class StorageService {
  private s3: S3Client;
  private bucketName: string;

  constructor() {
    const endpoint = process.env.STORAGE_ENDPOINT;
    const region = process.env.STORAGE_REGION || 'us-east-1';
    const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID;
    const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY;
    
    if (!endpoint || !accessKeyId || !secretAccessKey) {
      throw new Error('As variáveis de ambiente do MinIO não estão configuradas corretamente.');
    }

    this.s3 = new S3Client({
      endpoint,
      region,
      forcePathStyle: true,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    this.bucketName = process.env.STORAGE_BUCKET || '';
    if (!this.bucketName) {
      throw new Error('Bucket name não configurado nas variáveis de ambiente.');
    }
  }

  async uploadFile(key: string, body: Buffer, contentType?: string): Promise<string> {
    const cleanKey = key.replace(/[^\w\-.]/g, "_"); 
    const uniqueKey = `${uuidv4()}/${cleanKey}`;
  
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: uniqueKey,
      Body: body,
      ContentType: contentType,
    });
  
    try {
      await this.s3.send(command);
      return `${process.env.STORAGE_ENDPOINT}/${this.bucketName}/${uniqueKey}`;
    } catch (error) {
      console.error("Erro ao enviar comando para o S3:", error);
      throw new Error("Falha no upload para o S3.");
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      await this.s3.send(command);
      return true;
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      throw new Error('Falha ao deletar arquivo.');
    }
  }

  async downloadFile(fileKey: string): Promise<string> {
    try {
      console.log("Downloading file with key:", fileKey);
  
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });
  
      const response = await this.s3.send(command);
  
      const tempDir = os.tmpdir();
      const tempPath = path.join(tempDir, fileKey.split("/").pop() || "tempFile");
  
      const writeStream = fs.createWriteStream(tempPath);
  
      await new Promise((resolve, reject) => {
        (response.Body as NodeJS.ReadableStream)
          .pipe(writeStream)
          .on("finish", resolve)
          .on("error", reject);
      });
  
      console.log("File downloaded successfully:", tempPath);
      return tempPath;
    } catch (error) {
      console.error("Erro ao fazer download do arquivo:", error);
      throw new Error("Falha ao fazer download do arquivo.");
    }
  }
}

export const storageService = new StorageService();
