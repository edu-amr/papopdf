import { ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import ShineBorder from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative pt-20 md:pt-20 background-animate text-center">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn("[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]")}
      />
      <div className="container relative z-10 mx-auto">
        <div className="px-6">
          <div className="mx-auto md:max-w-[55rem] font-bold text-center text-4xl md:text-5xl md:leading-[4.2rem]">
            <AnimatedGradientText className="mb-6">
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ff4040] via-[#ff4063] to-[#ff407c] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                 Apresentando a PapoPDF
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>

            <h1>Converse com seus PDF&apos;s usando IA</h1>
            <p className="font-normal mt-4 max-w-[30rem] mx-auto md:max-w-2xl text-zinc-900 md:leading-normal text-lg">
              Converse com seus documentos PDF, como livros, ensaios, contratos legais, artigos de
              pesquisa, etc. de uma forma simples e eficaz.
            </p>
            <div className="flex flex-col space-y-2 mt-6">
              <Link href="/login" className="w-fit mx-auto">
                <Button className="h-10 px-4 py-2 rounded-xl btn-pulse">
                  Comece agora
                  <MoveRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-0 px-6">
          <div className="mt-24">
            <ShineBorder
              className="relative max-h-[800px] w-full rounded-lg border bg-background md:shadow-xl overflow-hidden"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              duration={6}
            >
              <Image
                alt="Guides"
                width="1367"
                height="859"
                decoding="async"
                sizes="100vw"
                src="/images/screenshot-light.png"
                style={{
                  width: "100%",
                  height: "auto",
                  color: "transparent",
                }}
              />
            </ShineBorder>
          </div>
        </div>
      </div>
    </section>
  );
}
