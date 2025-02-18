import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/authStore";
import { EventData } from "@/types";

const statusColors: { [key: string]: string } = {
  Devolvido: "bg-red-500",
  Pago: "bg-blue-500",
  Disponível: "bg-green-500",
  "Aguardando Pagamento": "bg-yellow-500",
  Cancelado: "bg-orange-500",
};

export const EventsList = () => {
  const { token } = useAuthStore();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://sportbro.com.br/api/user_events_list.php",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setEvents(response.data.data);
        } else {
          setError(response.data.message || "Erro ao carregar eventos.");
        }
      } catch (err) {
        setError("Erro ao buscar eventos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <div className="p-6 space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      {loading && <p>Carregando...</p>}

      {events.map((event) => (
        <Card key={event.event.id} className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{event.event.titulo}</span>
              <Badge className={statusColors[event.status] || "bg-gray-500"}>
                {event.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                {event?.cod_pagseguro && (
                  <div>
                    <strong>Código Pagamento:</strong> {event.cod_pagseguro}
                  </div>
                )}

                <p>
                  <strong>Categoria:</strong> {event.ticket.titulo}
                </p>

                {event?.tamanho_camiseta && (
                  <div>
                    <strong>Tamanho Camiseta:</strong> {event.tamanho_camiseta}
                  </div>
                )}

                {event?.responsavel && (
                  <div>
                    <strong>Responsável:</strong> {event.responsavel}
                  </div>
                )}
              </div>
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                <p>
                  <strong>Data:</strong> {event.event.data_ini}
                </p>
                <p>
                  <strong>Horário:</strong> {event.event.hora_ini}
                </p>
              </div>
              <div className="w-full sm:w-1/3 space-x-2">
                {event?.event?.regulamento && (
                  <Button asChild variant="outline">
                    <a
                      href={`https://sportbro.com.br/sportbro/evento_regulamento/${event.event.regulamento}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Regulamento
                    </a>
                  </Button>
                )}
                <Button asChild>
                  <a
                    href={`/${
                      event.event.status === "2" ? "evento" : "resultado"
                    }/${event.event.slug}`}
                  >
                    Ir para Evento
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
