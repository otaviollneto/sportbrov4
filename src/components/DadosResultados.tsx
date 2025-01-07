import { ResultadoEventoProps, SponsorProps } from "@/types";
import { File } from "lucide-react";

export const DadosResultados = ({ lista }: ResultadoEventoProps) => {
  return (
    <section id="sponsors" className="container pt-24 sm:py-32">
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Lista de Resultados
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {lista?.map(({ titulo, link }: SponsorProps) => (
          <div
            onClick={() => window.open(link, "_blank")}
            key={titulo}
            className="flex items-center gap-1 text-muted-foreground/80 cursor-pointer hover:text-primary transition-colors"
          >
            <span>
              <File />
            </span>
            <h3 className="text-xl  font-bold">{titulo}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
