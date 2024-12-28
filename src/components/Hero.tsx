import { buttonVariants } from "./ui/button";
import { FileTextIcon } from "@radix-ui/react-icons";
import runner3 from "../assets/runner2.jpg";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            Sport
            <span className="inline bg-gradient-to-r from-[#22C55E]  to-[#37ff80]] text-transparent bg-clip-text">
              BRO
            </span>{" "}
            Eventos
          </h1>{" "}
          para{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              TODA
            </span>{" "}
            família
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Somos especializados em promover com a melhor qualidade Eventos
          esportivos e qualidade de vida!
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <a
            href="#features"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "default",
            })}`}
          >
            Começar
          </a>

          <a
            rel="noreferrer noopener"
            href="/resultados"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Ver Resultado de Eventos
            <FileTextIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <img
          src={runner3}
          alt=""
          className="w-[500px] object-contain rounded"
        />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
