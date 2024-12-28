import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import runners from "../assets/runner3.jpg";
import {
  BarChartIcon,
  ClockIcon,
  GearIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Gestão de Eventos Esportivos",
    description: "",
    icon: <BarChartIcon width={24} height={24} />,
  },
  {
    title: "Cronometragem",
    description: "",
    icon: <ClockIcon width={24} height={24} />,
  },
  {
    title: "Inscrição Online",
    description: "",
    icon: <PaperPlaneIcon width={24} height={24} />,
  },
  {
    title: "Equipamento para seu evento",
    description: "",
    icon: <GearIcon width={24} height={24} />,
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Nossos{" "}
            </span>
            Serviços
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Conheça as opções de serviços que oferecemos
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={runners}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain rounded"
          alt="About services"
        />
      </div>
    </section>
  );
};
