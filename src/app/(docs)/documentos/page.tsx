"use client";

import { UploadButton } from "../_components/upload/upload-button";
import { CloudUpload } from "lucide-react";

export default function Documents() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full px-4">
      <CloudUpload className="h-16 w-16 text-primary" />
      <h3 className="font-semibold text-2xl text-center">Inicie uma conversa</h3>
      <p className="text-center text-lg">Que tal fazer o upload de um PDF?</p>
      <UploadButton className="rounded-xl mt-4" forceFullDisplay />
    </div>
  );
}
