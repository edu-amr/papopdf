"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteChatProps {
  chatId: string;
}

export function DeleteChat({ chatId }: DeleteChatProps) {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch("/api/chat", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: id }),
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar chat.");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents-links"] });
      router.push("/documentos");
    },
    onError: (error: Error) => {
      console.error("Erro ao deletar chat:", error);
    },
    onSettled: () => {
      setOpenUploadDialog(false);
    },
  });

  return (
    <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="icon" className="rounded-xl">
          <Trash2 color="red" stroke="red" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl mb-1 text-left">Deletar essa conversa?</DialogTitle>
          <DialogDescription className="text-base text-left">
            Tem certeza que deseja deletar essa conversa? Isso não poderá ser desfeito.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => mutate(chatId)} disabled={isPending}>
            {isPending ? "Deletando..." : "Deletar"}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setOpenUploadDialog(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
