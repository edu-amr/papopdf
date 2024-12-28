"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMedia as isMobile } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

import { UploadForm } from "./upload-form";

interface UploadButtonProps {
  className?: string;
  useMedia?: boolean;
  forceFullDisplay?: boolean;
}

export function UploadButton({ className, useMedia, forceFullDisplay }: UploadButtonProps) {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const isWide = isMobile("(min-width: 1024px)");

  return (
    <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
      <DialogTrigger asChild>
        {forceFullDisplay || (useMedia && isWide) ? (
          <Button className={cn(["rounded-[8px]", className])} variant={"outline"}>
            <Plus width={16} className="text-primary" />
            Nova Conversa
          </Button>
        ) : (
          <Button className={cn(["rounded-[8px]", className])} variant={"outline"} size={"icon"}>
            <Plus width={16} className="text-primary" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl mb-1 text-left">Envie seu Documento</DialogTitle>
          <DialogDescription className="text-base text-left">
            Carregue um arquivo PDF para começar. Nossa plataforma transforma seus documentos em uma
            conversa inteligente.
          </DialogDescription>
        </DialogHeader>
        <UploadForm openState={[openUploadDialog, setOpenUploadDialog]} />
      </DialogContent>
    </Dialog>
  );
}
