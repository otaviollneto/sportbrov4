import { useState, useEffect } from "react";
import axios from "axios";

export const Statistics = () => {
  interface StatsProps {
    quantity: string;
    description: string;
  }

  const [stats, setStats] = useState<StatsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "https://sportbro.com.br/api/totais.php"
        );
        const { clientes, eventos } = response.data.total;

        setStats([
          { quantity: `${clientes}`, description: "Atletas" },
          { quantity: `${eventos}`, description: "Eventos" },
        ]);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar estatísticas.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
        {stats.map(({ quantity, description }: StatsProps) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
