import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Terminal } from "lucide-react";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { DadosResultados } from "./DadosResultados";

interface EventProps {
  id: string;
  titulo: string;
  slug: string;
  descricao: string;
  img: string;
  data_ini: string;
  organizador: {
    nome: string;
    telefone: string;
  };
  resultado: {
    hasResult: boolean;
    lista: {
      id: string;
      link: string;
      titulo: string;
    }[];
  };
}

interface FeaturesProps {
  status?: number;
}

export const ResultDetail = ({ status = 3 }: FeaturesProps) => {
  const { slug } = useParams();
  const [event, setEvent] = useState<EventProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://sportbro.com.br/api/events_list.php?status=${status}`
        );
        const eventoEncontrado = response.data.evento.find(
          (evento: EventProps) => evento.slug === slug
        );

        if (!eventoEncontrado) {
          throw new Error("Evento não encontrado");
        }

        setEvent(eventoEncontrado);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro ao carregar o evento");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-2 text-red-500">
          <AlertTriangle />
          <span>{error}</span>
        </div>
      </div>
    );

  return (
    <section className="container py-12 sm:py-24">
      <Card>
        <CardHeader>
          {event?.img && (
            <img
              src={`https://sportbro.com.br/sportbro/evento_img/${event.img}`}
              alt={event?.titulo}
              className="w-full max-w-md mx-auto"
            />
          )}
          <CardTitle className="text-2xl text-center mt-4">
            {event?.titulo}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription className="space-y-4">
            <Badge className="w-40 flex justify-center text-base">
              <strong>Data:</strong> {event?.data_ini || "--"}
            </Badge>
            <p>
              <strong>Descrição:</strong>{" "}
              {event?.descricao || "Sem descrição disponível."}
            </p>
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Organizador</AlertTitle>
              <AlertDescription>
                <p>{event?.organizador.nome || "--"}</p>
                <p>
                  <strong>Telefone:</strong>{" "}
                  {event?.organizador.telefone || "--"}
                </p>
              </AlertDescription>
            </Alert>
          </CardDescription>
        </CardContent>

        {event?.resultado?.hasResult && (
          <DadosResultados lista={event.resultado.lista} />
        )}

        <CardFooter className="flex justify-center">
          <Button onClick={() => window.history.back()}>Voltar</Button>
        </CardFooter>
      </Card>
    </section>
  );
};
