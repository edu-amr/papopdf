import { Loader2 } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface LoadingProps {
  text?: string;
  className?: string;
}

export function Loading({ className, text }: LoadingProps) {
  return (
    <>
      <Loader2 className={cn(["h-10 w-10 text-primary animate-spin", className])} />
      {text && <p className="mt-4 text-sm text-zinc-900">{text}</p>}
    </>
  );
}
