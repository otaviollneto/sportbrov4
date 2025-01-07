import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EventProps } from "@/types";

interface FetchEventParams {
  status: number;
  slug?: string;
}

const fetchEvents = async ({ status }: FetchEventParams) => {
  const response = await axios.get(
    `https://sportbro.com.br/api/events_list.php?status=${status}`
  );

  // Busca o evento pelo slug
  const eventoEncontrado: EventProps[] = response.data.evento;

  if (!eventoEncontrado) {
    throw new Error("Evento não encontrado!");
  }

  return eventoEncontrado;
};

const fetchEvent = async ({ status, slug }: FetchEventParams) => {
  const hasSlug = `&slug=${slug}`;
  const response = await axios.get(
    `https://sportbro.com.br/api/events_list.php?status=${status}${hasSlug}`
  );

  // Busca o evento pelo slug
  const eventoEncontrado: EventProps = response.data.evento[0];

  if (!eventoEncontrado) {
    throw new Error("Evento não encontrado!");
  }

  return eventoEncontrado;
};

export const useFetchEvents = ({ status, slug }: FetchEventParams) => {
  return useQuery({
    queryKey: ["event", status, slug],
    queryFn: () => fetchEvents({ status }),
    staleTime: 5 * 60 * 1000, // Cache de 5 minutos
  });
};

export const useFetchEvent = ({ status, slug }: FetchEventParams) => {
  return useQuery({
    queryKey: ["event", status, slug],
    queryFn: () => fetchEvent({ status, slug }),
    staleTime: 5 * 60 * 1000, // Cache de 5 minutos
  });
};
