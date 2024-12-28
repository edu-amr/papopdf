"use client";

import React from "react";

import { Card,Carousel } from "@/components/ui/apple-cards-carousel";

export function ProfessionalsSection() {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />);

  return (
    <section className="w-full">
      <div className="px-6 pt-32">
        <div className="container max-w-screen-xl mx-auto">
          <div className="text-center space-y-4 pb-6 mx-auto">
            <h2 className="text-sm text-primary font-mono font-medium tracking-wider uppercase">
              público
            </h2>
            <h3 className="mx-auto mt-4 max-w-xs text-3xl font-semibold sm:max-w-none sm:text-4xl md:text-5xl">
              Para quem busca respostas rápidas em PDF&apos;s.
            </h3>
            <p className="mt-6 text-base leading-8 text-slate-600 max-w-2xl mx-auto">
              Nossa ferramenta é ideal para profissionais, estudantes e qualquer pessoa que precise
              transformar PDF&apos;s em informações claras e acessíveis.
            </p>
          </div>
        </div>
      </div>
      <Carousel items={cards} />
    </section>
  );
}

const data = [
  {
    category: "Advogados e Profissionais Jurídicos",
    title: "Analise contratos e encontre cláusulas específicas rapidamente.",
    src: "/images/carrousel-1.jpg",
    content: (
      <p>
        Lidar com contratos e processos extensos pode ser exaustivo, mas o PapoPDF simplifica esse
        trabalho. Basta fazer o upload de um documento e perguntar sobre cláusulas específicas,
        prazos ou termos jurídicos. Economize tempo valioso na leitura de documentos e concentre-se
        no que realmente importa: atender seus clientes com agilidade e precisão.
      </p>
    ),
  },
  {
    category: "Estudantes e Pesquisadores",
    title: "Resuma artigos acadêmicos e extraia dados relevantes para trabalhos ou projetos.",
    src: "/images/carrousel-2.jpg",
    content: (
      <p>
        Pesquisas acadêmicas exigem acesso rápido a informações relevantes. Com o PapoPDF, você pode
        resumir artigos extensos, encontrar citações específicas ou explorar dados estatísticos sem
        perder horas lendo cada página. É a ferramenta ideal para otimizar seu tempo e aprofundar
        seu conhecimento.
      </p>
    ),
  },
  {
    category: "Empreendedores e Executivos",
    title: "Explore relatórios financeiros e propostas de negócios com eficiência.",
    src: "/images/carrousel-3.jpg",
    content: (
      <p>
        Em um ambiente corporativo, decisões rápidas são cruciais. O PapoPDF permite que você
        analise relatórios financeiros, propostas comerciais ou apresentações de maneira rápida e
        eficiente. Encontre insights importantes para tomar decisões estratégicas sem complicações.
      </p>
    ),
  },
  {
    category: "Consultores e Analistas",
    title: "Extraia informações relevantes de relatórios técnicos ou de mercado.",
    src: "/images/carrousel-4.jpg",
    content: (
      <p>
        Consultores e analistas frequentemente lidam com relatórios técnicos e dados de mercado. Com
        o PapoPDF, você pode localizar informações essenciais, identificar tendências ou extrair
        dados relevantes de maneira ágil. Transforme documentos complexos em respostas claras e
        objetivas.
      </p>
    ),
  },
  {
    category: "Professores e Educadores",
    title: "Resuma materiais didáticos ou encontre rapidamente conteúdos específicos.",
    src: "/images/carrousel-5.jpg",
    content: (
      <p>
        Organizar e preparar aulas pode ser mais fácil com o PapoPDF. Use a ferramenta para resumir
        materiais didáticos, encontrar rapidamente trechos importantes ou adaptar conteúdos para
        diferentes necessidades. Ideal para quem quer otimizar o tempo e melhorar o desempenho em
        sala de aula.
      </p>
    ),
  },
  {
    category: "Médicos e Profissionais da Saúde",
    title: "Analise laudos médicos e relatórios clínicos com rapidez.",
    src: "/images/carrousel-6.jpg",
    content: (
      <p>
        Organizar e preparar aulas pode ser mais fácil com o PapoPDF. Use a ferramenta para resumir
        materiais didáticos, encontrar rapidamente trechos importantes ou adaptar conteúdos para
        diferentes necessidades. Ideal para quem quer otimizar o tempo e melhorar o desempenho em
        sala de aula.
      </p>
    ),
  },
  {
    category: "Jornalistas e Criadores de Conteúdo",
    title: "Localize dados em documentos extensos, como relatórios governamentais.",
    src: "/images/carrousel-7.jpg",
    content: (
      <p>
        Organizar e preparar aulas pode ser mais fácil com o PapoPDF. Use a ferramenta para resumir
        materiais didáticos, encontrar rapidamente trechos importantes ou adaptar conteúdos para
        diferentes necessidades. Ideal para quem quer otimizar o tempo e melhorar o desempenho em
        sala de aula.
      </p>
    ),
  },
  {
    category: "Contadores e Profissionais de Finanças",
    title: "Identifique números e cálculos em demonstrações financeiras.",
    src: "/images/carrousel-8.jpg",
    content: (
      <p>
        Organizar e preparar aulas pode ser mais fácil com o PapoPDF. Use a ferramenta para resumir
        materiais didáticos, encontrar rapidamente trechos importantes ou adaptar conteúdos para
        diferentes necessidades. Ideal para quem quer otimizar o tempo e melhorar o desempenho em
        sala de aula.
      </p>
    ),
  },
  {
    category: "Qualquer Pessoa que Lide com PDF&apos;s",
    title: "Desde contratos pessoais até manuais técnicos, o PapoPDF é para todos.",
    src: "/images/carrousel-9.jpg",
    content: (
      <p>
        Seja um contrato de aluguel, um manual técnico ou um guia de viagem, o PapoPDF é a solução
        para quem precisa encontrar informações em PDF&apos;s de forma rápida e prática. Com uma interface
        intuitiva e respostas instantâneas, ele torna a análise de documentos acessível para todos.
      </p>
    ),
  },
];
