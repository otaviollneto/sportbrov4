import { FetchEventsParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchEvents = ({
  status,
  page,
  limit = 10,
}: FetchEventsParams) => {
  // Função para buscar os eventos
  const fetchEvents = async () => {
    const response = await axios.get(
      `https://sportbro.com.br/api/events_list.php`,
      {
        params: {
          status,
          limite: limit, // Itens por página
          pagina: page, // Página atual
        },
      }
    );
    return response.data;
  };

  // React Query com configuração otimizada
  return useQuery({
    queryKey: ["events", status, page], // Chave única para cache
    queryFn: fetchEvents,
    placeholderData: (previousData) => previousData, // Substitui 'keepPreviousData'
    staleTime: 5 * 60 * 1000, // Tempo de validade do cache (5 minutos)
  });
};
