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
import { Loader2, AlertTriangle, Download, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DadosResultados } from "./DadosResultados";

interface EventProps {
  id: string;
  titulo: string;
  slug: string;
  descricao: string;
  img: string;
  img2?: string;
  data_ini: string;
  regulamento?: string;
  categoria: string;
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
  categoria_evento?: {
    id: string;
    titulo: string;
    valor_formatado: string;
    taxa_formatado: string;
    qtd_limite: string;
    data_limite: string;
  }[];
}

interface FeaturesProps {
  status?: number;
}

export const ResultDetail = ({ status = 3 }: FeaturesProps) => {
  const { slug } = useParams();
  const [event, setEvent] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, [slug, status]);

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
          <div className="flex flex-wrap justify-center gap-4">
            {event?.img && (
              <img
                src={`https://sportbro.com.br/sportbro/evento_img/${event.img}`}
                alt={event?.titulo}
                className="w-full max-w-xs sm:max-w-md rounded-lg"
              />
            )}
            {event?.img2 && (
              <img
                src={`https://sportbro.com.br/sportbro/evento_img/${event.img2}`}
                alt={`${event?.titulo} - Extra`}
                className="w-full max-w-xs sm:max-w-md rounded-lg"
              />
            )}
          </div>
          <CardTitle className="text-2xl text-center mt-4">
            {event?.titulo}
          </CardTitle>
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
              <p>{event?.organizador.nome || "--"}</p>
              <p>
                <strong>Telefone:</strong> {event?.organizador.telefone || "--"}
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

          {event?.categoria_evento && event.categoria_evento.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center">
                Categorias do Evento
              </h3>
              <ul className="space-y-4">
                {event.categoria_evento.map((cat) => (
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

        {event?.resultado?.hasResult && (
          <div className="mt-8">
            <DadosResultados lista={event.resultado.lista} />
          </div>
        )}

        <CardFooter className="flex justify-center">
          <Button onClick={() => window.history.back()}>Voltar</Button>
        </CardFooter>
      </Card>
    </section>
  );
};
