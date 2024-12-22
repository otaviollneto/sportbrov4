import { useFetchStatistics } from "@/hooks/useFetchStatistics";
import { Skeleton } from "@/components/ui/skeleton";

export const Statistics = () => {
  const { data: stats, isLoading, isError } = useFetchStatistics();

  // Skeleton para carregamento
  if (isLoading) {
    return (
      <section id="statistics" className="py-12 sm:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-2 text-center">
              <Skeleton className="h-10 w-20 mx-auto" />
              <Skeleton className="h-6 w-28 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Exibir mensagem de erro
  if (isError) {
    return (
      <section id="statistics" className="py-12 sm:py-24 text-center">
        <p className="text-red-500">Erro ao carregar estatísticas.</p>
      </section>
    );
  }

  // Renderizar os dados
  return (
    <section id="statistics" className="py-12 sm:py-24">
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
        {stats?.map(({ quantity, description }) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
