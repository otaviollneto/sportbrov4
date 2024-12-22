import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EventProps } from "@/types";

interface FetchEventParams {
  status: number;
  slug?: string;
}

const fetchEvent = async ({ status, slug }: FetchEventParams) => {
  const response = await axios.get(
    `https://sportbro.com.br/api/events_list.php?status=${status}`
  );

  // Busca o evento pelo slug
  const eventoEncontrado = response.data.evento.find(
    (evento: EventProps) => evento.slug === slug
  );

  if (!eventoEncontrado) {
    throw new Error("Evento não encontrado!");
  }

  return eventoEncontrado;
};

export const useFetchEvent = ({ status, slug }: FetchEventParams) => {
  return useQuery({
    queryKey: ["event", status, slug],
    queryFn: () => fetchEvent({ status, slug }),
    staleTime: 5 * 60 * 1000, // Cache de 5 minutos
  });
};
