import { BookOpenText, DraftingCompass, FileSearch } from "lucide-react";

export function InfosSection() {
  return (
    <section className="px-6 pt-32" id="sobre">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center space-y-4 pb-6 mx-auto">
          <h2 className="text-sm text-primary font-mono font-medium tracking-wider uppercase">
            Problema
          </h2>
          <h3 className="mx-auto mt-4 max-w-xs text-3xl font-semibold sm:max-w-none sm:text-4xl md:text-5xl">
            Desafios de Trabalhar com PDF&apos;s.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div>
            <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BookOpenText className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Perda de Tempo em PDF&apos;s Extensos</h3>
                <p className="text-muted-foreground">
                  Buscar informações específicas em documentos longos é cansativo e pouco produtivo.
                  Isso acaba atrasando tarefas importantes.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileSearch className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Documentos Complexos</h3>
                <p className="text-muted-foreground">
                  Cláusulas técnicas ou relatórios complexos tornam a análise manual frustrante, com
                  alto risco de perder detalhes cruciais.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <DraftingCompass className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Falta de Soluções Simples</h3>
                <p className="text-muted-foreground">
                  Ferramentas complexas e pouco acessíveis dificultam ainda mais a tarefa de
                  interagir com PDF&apos;s de forma prática e rápida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
