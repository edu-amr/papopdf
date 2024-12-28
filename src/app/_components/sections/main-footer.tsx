import { Linkedin,Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

export function MainFooter() {
  return (
    <footer className="py-12 border-t border-border relative mt-28 mx-auto">
      <div className="container max-w-screen-xl flex flex-col items-center justify-center text-center mx-auto">
        <Image
          alt="Logo"
          width={140}
          height={80}
          className="rounded-md w-10 h-10"
          src="/icons/favicon.png"
        />
        <p className="text-lg text-muted-foreground md:max-w-[20%] mt-4 px-4">
          Transformando PDF&apos;s em respostas claras e rápidas.
        </p>
        <div className="flex items-center space-x-2 mt-8">
          <Link
            href="https://x.com/edu_amr_"
            target="_blank"
            rel="noreferrer"
            className="group rounded-md p-2 transition-colors dark:text-white/60 dark:hover:bg-white/10 dark:active:bg-white/20"
          >
            <span className="sr-only">Twitter</span>
            <Twitter />
          </Link>
          <Separator orientation="vertical" className="h-8" />
          <Link
            href="https://www.linkedin.com/in/edu-amr/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 transition-colors dark:text-white/60 dark:hover:bg-white/10 dark:active:bg-white/20"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin />
          </Link>
        </div>
      </div>
      <div className="border-t border-border mt-6 pt-8 text-sm mx-auto">
        <div className="container max-w-screen-xl flex flex-col md:flex-row text-center md:text-left justify-between opacity-60 mx-auto px-10">
          <p className="mb-8 md:mb-0">© {new Date(). getFullYear()} PapoPDF. Todos os direitos reservados.</p>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0">
            <li>
              <Link href="/termos">Termos de Uso</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
