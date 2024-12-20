import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
}

interface FeaturesProps {
  status?: number;
}

export const Features = ({ status = 2 }: FeaturesProps) => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://sportbro.com.br/api/events_list.php?status=${status}`
        );
        console.log(response);
        setEvents(response.data.evento);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar eventos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [status]);

  const handleNavigate = (slug: string) => {
    navigate(`/${status === 2 ? "eventos" : "resultados"}/${slug}`);
  };

  if (loading) {
    return <p className="text-center">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Escolha{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          qual Evento irá participar?!
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(({ id, titulo, slug, img, data_ini, organizador }) => (
          <Card key={id} className="hover:shadow-lg transition-shadow">
            <CardHeader
              onClick={() => handleNavigate(slug)}
              className="cursor-pointer"
            >
              <img
                src={`https://sportbro.com.br/sportbro/evento_img/${img}`}
                alt={titulo}
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardHeader>

            <CardContent className="space-y-4">
              <CardTitle>{titulo}</CardTitle>
              <CardDescription className="space-y-2">
                <Badge>
                  <strong>Data:</strong> {data_ini || "--"}
                </Badge>
                <p>
                  <strong>Organizador:</strong> {organizador?.nome || "--"}
                </p>
              </CardDescription>
            </CardContent>

            <CardFooter>
              <Button onClick={() => handleNavigate(slug)} className="w-full">
                <Check className="mr-2" />{" "}
                {status === 2 ? "Inscrever" : "Ver resultado"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
