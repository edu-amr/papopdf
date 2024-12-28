"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { Loading } from "@/components/loading";

interface UploadFormProps {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export function UploadForm({ openState }: UploadFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openUploadDialog, setOpenUploadDialog] = openState;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  interface UploadResponse {
    chat_id: string;
  }

  interface UploadVariables {
    fileName: string;
    fileContent: string;
    fileType: string;
    fileSize: number;
  }

  const uploadMutation = useMutation<UploadResponse, Error, UploadVariables>({
    mutationFn: async (fileData: UploadVariables) => {
      const response = await fetch("/api/create-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao fazer upload.");
      }

      return response.json() as Promise<UploadResponse>;
    },
    onSuccess: (data: UploadResponse) => {
      queryClient.invalidateQueries({ queryKey: ["documents-links"] });
      setOpenUploadDialog(false);
      router.push(`/c/${data.chat_id}`);
    },
    onError: (err: Error) => {
      setError(err.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    setLoading(true);
    setError(null);

    const file = acceptedFiles[0];
    if (file.type !== "application/pdf") {
      setError("Apenas arquivos PDF são permitidos.");
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Content = reader.result?.toString().split(",")[1];
      if (base64Content) {
        uploadMutation.mutate({
          fileName: file.name,
          fileContent: base64Content,
          fileType: file.type,
          fileSize: file.size,
        });
      }
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    maxFiles: 1,
    disabled: loading,
  });

  return (
    <div
      {...getRootProps({
        className: "upload-container",
      })}
      className={`text-center p-4 min-h-72 border-primary border-dashed border-2 rounded-md flex items-center justify-center ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      } bg-primary/5 flex-col`}
    >
      <input {...getInputProps()} disabled={loading} />
      {loading ? (
        <Loading text="Configurando ambiente..." />
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          <FileUp size={60} className="text-primary" />
          <p className="font-semibold">Arraste um arquivo PDF ou clique para selecionar</p>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
