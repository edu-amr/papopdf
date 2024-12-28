import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SolutionSection() {
  return (
    <section className="px-6 pt-24" id="ferramentas">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center space-y-4 pb-6 mx-auto">
          <h2 className="text-sm text-primary font-mono font-medium tracking-wider uppercase">
            Solução
          </h2>
          <h3 className="mx-auto mt-4 max-w-xs text-3xl font-semibold sm:max-w-none sm:text-4xl md:text-5xl">
            Transforme PDF&apos;s em Conhecimento.
          </h3>
          <p className="mt-6 text-base leading-8 text-slate-600 max-w-2xl mx-auto">
            Com a nossa IA, você pode resumir PDF&apos;s, fazer perguntas inteligentes e localizar
            detalhes importantes de forma rápida e eficiente.
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5 lg:mt-12">
          <div className="m-auto lg:col-span-2 lg:order-last">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Resumir PDF&apos;s
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Resuma PDF&apos;s rapidamente com a IA. Carregue seu PDF, selecione o recurso e
              obtenha resultados sem nenhuma entrada extra. Resuma PDF agora
            </p>
            <Link href="/login" className="mt-8 block">
              <Button className="rounded-full py-5">Começar</Button>
            </Link>
          </div>
          <video
            src="https://cdn.llm.report/logs-demo.mp4"
            className="rounded-xl border m-auto lg:col-span-3 shadow-2xl"
          ></video>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5 lg:mt-40 mt-20">
          <div className="m-auto lg:col-span-2">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Faça perguntas para o PDF
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Entenda facilmente conceitos ou termos desconhecidos em seus documentos PDF com
              explicações de IA.
            </p>
            <Link href="/login" className="mt-8 block">
              <Button className="rounded-full py-5">Começar</Button>
            </Link>
          </div>
          <video
            src="https://cdn.llm.report/openai-demo.mp4"
            className="rounded-xl border m-auto lg:col-span-3 shadow-2xl"
          ></video>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5 lg:mt-40 mt-20">
          <div className="m-auto lg:col-span-2 lg:order-last">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Encontre informações específicas
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Localize trechos ou dados importantes do seu PDF com rapidez. Faça perguntas sobre
              cláusulas, números ou tópicos específicos e receba respostas precisas em segundos, sem
              complicações.
            </p>
            <Link href="/login" className="mt-8 block">
              <Button className="rounded-full py-5">Começar</Button>
            </Link>
          </div>
          <video
            src="https://cdn.llm.report/logs-demo.mp4"
            className="rounded-xl border m-auto lg:col-span-3 shadow-2xl"
          ></video>
        </div>
      </div>
    </section>
  );
}
