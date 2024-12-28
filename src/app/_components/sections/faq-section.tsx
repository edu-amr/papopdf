import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como o PapoPDF compreende o contexto das perguntas que faço?",
    answer:
      "O PapoPDF usa algoritmos avançados de IA que entendem e analisam o conteúdo dentro do seu PDF. A IA capta o contexto, permitindo que ela forneça respostas precisas e relevantes às suas perguntas.",
  },
  {
    question: "Posso pedir ao PapoPDF para fornecer um resumo geral do conteúdo do meu documento?",
    answer:
      "Com certeza! O PapoPDF pode fornecer uma visão geral do conteúdo do seu PDF. Basta pedir um resumo, e ele gerará uma visão geral concisa com base nas informações do PDF.",
  },
  {
    question:
      "A ferramenta pode fornecer explicações para conceitos complexos encontrados em PDF's?",
    answer:
      "PapoPDF é uma ferramenta abrangente que oferece explicações para conceitos complexos em documentos PDF. Com o recurso Explain do PapoPDF, alimentado por IA, você pode ter conceitos complexos explicados com clareza e precisão.",
  },
  {
    question: "O PapoPDF funciona com PDF's em outros idiomas?",
    answer:
      "Sim! O PapoPDF suporta documentos em vários idiomas, permitindo que você faça perguntas e obtenha respostas precisas, independentemente do idioma do PDF.",
  },
  {
    question: "Quais tipos de arquivos o PapoPDF aceita?",
    answer:
      "Atualmente, o PapoPDF aceita apenas arquivos PDF. Estamos trabalhando para expandir o suporte a outros formatos no futuro.",
  },
  {
    question: "O PapoPDF é seguro? Meus documentos ficam armazenados?",
    answer:
      "A segurança é uma prioridade. Seus documentos são processados de forma segura e não ficam armazenados permanentemente em nossos servidores.",
  },
  {
    question: "Existe um limite para o tamanho ou número de páginas dos PDF's que posso enviar?",
    answer:
      "Sim, dependendo do seu plano, existem limitações quanto ao tamanho do arquivo e o número de páginas. Consulte os detalhes do seu plano para saber mais.",
  },
  {
    question: "O PapoPDF pode destacar trechos específicos no documento?",
    answer:
      "Sim! Ao responder suas perguntas, o PapoPDF pode indicar ou destacar os trechos relevantes diretamente relacionados ao que foi perguntado.",
  },
];

export function FaqSection() {
  return (
    <section className="px-6 pt-32">
      <div className="container max-w-screen-xl mx-auto">
        <h3 className="mx-auto mt-4 max-w-xs text-3xl font-semibold sm:max-w-none sm:text-4xl md:text-5xl text-center">
          Perguntas Frequentes
        </h3>

        <Accordion type="single" collapsible className="w-full space-y-3 mt-20">
          {faqs &&
            faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border px-5 rounded-xl">
                <AccordionTrigger className="md:text-xl text-base">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  );
}
