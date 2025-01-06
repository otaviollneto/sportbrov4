import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchEvent } from "@/hooks/useFetchEvent"; // Novo Hook
import { CategoriaEventoProps, FeaturesProps } from "@/types";

export const EventDetail = ({ status = 2 }: FeaturesProps) => {
  const { slug } = useParams();

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useFetchEvent({
    status,
    slug,
  });

  if (isLoading) {
    return (
      <section className="container py-24 sm:py-32">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap justify-center gap-4">
              <Skeleton className="w-full max-w-xs sm:max-w-md h-40 rounded-lg" />
              <Skeleton className="w-full max-w-xs sm:max-w-md h-40 rounded-lg" />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Skeleton className="w-40 h-8 rounded-lg" />
              <Skeleton className="w-60 h-8 rounded-lg" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Skeleton className="w-32 h-10" />
          </CardFooter>
        </Card>
      </section>
    );
  }

  // Exibição de erro
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          {error?.message || "Erro ao carregar evento!"}
        </p>
      </div>
    );
  }

  // Conteúdo principal após carregamento
  return (
    <section className="container py-24 sm:py-32">
      <Card>
        <CardTitle className="text-2xl text-center mt-4">
          {event?.titulo}
        </CardTitle>
        <CardHeader>
          <div className="flex flex-wrap justify-center gap-4">
            {event?.img && (
              <img
                src={event.img}
                alt={event?.titulo}
                className="w-full max-w-xs sm:max-w-md rounded-lg"
              />
            )}
            {event?.img2 && (
              <img
                src={event.img2}
                alt={`${event?.titulo} - Extra`}
                className="w-full max-w-xs sm:max-w-md rounded-lg"
              />
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <CardDescription className="flex flex-wrap gap-4 justify-center">
            <Badge className="w-40 flex justify-center text-base">
              <strong>Data:</strong> {event?.data_ini || "--"}
            </Badge>
            <Badge className="w-60 flex justify-center text-base bg-orange-500 text-white">
              <strong>{event?.categoria || "--"}</strong>
            </Badge>
          </CardDescription>

          <p>
            <strong>Descrição:</strong>{" "}
            {event?.descricao || "Sem descrição disponível."}
          </p>

          <Alert>
            <PhoneCall className="h-4 w-4" />
            <AlertTitle>Organizador</AlertTitle>
            <AlertDescription>
              <p>{event?.organizador?.nome || "--"}</p>
              <p>
                <strong>Telefone:</strong>{" "}
                {event?.organizador?.telefone || "--"}
              </p>
            </AlertDescription>
          </Alert>

          {event?.regulamento && (
            <div className="flex justify-center">
              <Button
                variant="secondary"
                onClick={() => window.open(event.regulamento, "_blank")}
                className="flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Baixar Regulamento
              </Button>
            </div>
          )}

          {event?.categoria_evento &&
            event.categoria_evento.length > 0 &&
            !event.hasLinkExterno && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-center">
                  Categorias do Evento
                </h3>
                <ul className="space-y-4">
                  {event.categoria_evento.map((cat: CategoriaEventoProps) => (
                    <li
                      key={cat.id}
                      className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-500 rounded-lg gap-4"
                    >
                      <div className="text-white text-center sm:text-left">
                        <p className="text-lg font-semibold">{cat.titulo}</p>
                      </div>
                      <Badge className="bg-blue-500 text-white w-32 h-10 flex items-center justify-center">
                        Valor: R$ {cat.valor_formatado}
                      </Badge>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-gray-400 text-center mt-4">
                  Consulte as <strong>taxas aplicáveis</strong> no processo de
                  inscrição para garantir total transparência.
                </p>
              </div>
            )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button onClick={() => window.history.back()}>Voltar</Button>
        </CardFooter>
      </Card>
    </section>
  );
};
