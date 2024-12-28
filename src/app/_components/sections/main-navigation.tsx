"use client";

import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useFocusSection } from "@/hooks/use-focus-section";

export function MainNavigation() {
  const { focusSection } = useFocusSection();

  return (
    <header className="border-b border-border sticky top-0 bg-background z-[100]">
      <nav className="container max-w-screen-xl flex items-center justify-between h-[8vh] mx-auto">
        <Link href="/" className="hover:opacity-60">
          <Image src="/icons/logo.png" alt="logo" width={120} height={70} />
        </Link>
        <div className="md:flex hidden flex-1">
          <nav className="space-x-3 flex items-center opacity-80 flex-1 ml-5">
            <Button onClick={() => focusSection("sobre")} variant={"ghost"}>
              Sobre
            </Button>
            <Button onClick={() => focusSection("ferramentas")} variant={"ghost"}>
              Ferramentas
            </Button>
            <Button onClick={() => focusSection("precos")} variant={"ghost"}>
              Preços
            </Button>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant={"ghost"} className="text-primary">
                Entrar
                <LogIn />
              </Button>
            </Link>
            <Link href="/login">
              <Button className="rounded-full py-5">Começar</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

{
  /* <ul className="flex gap-4">
          <li>
            <Button onClick={() => focusSection("section1")} variant={"ghost"}>Preços</Button>
          </li>
          <li>
            <Button onClick={() => focusSection("section2")} variant={"ghost"}>Outros</Button>
          </li>
          <li>
            <Link href="/login">
              <Button className="flex gap-2">Entrar <LogIn /></Button>
            </Link>
          </li>
        </ul> */
}
