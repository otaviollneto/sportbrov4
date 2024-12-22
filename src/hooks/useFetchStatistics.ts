import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface StatsProps {
  quantity: string;
  description: string;
}

export const useFetchStatistics = () => {
  // Função para buscar os dados da API
  const fetchStats = async (): Promise<StatsProps[]> => {
    const response = await axios.get("https://sportbro.com.br/api/totais.php");
    const { clientes, eventos } = response.data.total;

    return [
      { quantity: `${clientes}`, description: "Atletas" },
      { quantity: `${eventos}`, description: "Eventos" },
    ];
  };

  // React Query com configuração de cache definida no QueryClient
  return useQuery({
    queryKey: ["stats"], // Cache é identificado por esta chave
    queryFn: fetchStats,
  });
};
