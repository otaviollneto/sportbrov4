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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

// Hooks personalizados
import { useFetchEvents } from "@/hooks/useFetchEvents";
import { usePagination } from "@/hooks/usePagination";

// Tipos
import { EventProps, FeaturesProps } from "@/types";

export const Features = ({ status = 2 }: FeaturesProps) => {
  const navigate = useNavigate();

  // Paginação
  const { page, handlePageChange, getVisiblePages } = usePagination(10);

  // Buscar eventos
  const { data, isLoading, isError } = useFetchEvents({ status, page });
  const events = data?.evento || [];
  const totalPages = data?.total_paginas || 1;

  // Navegar para a página do evento
  const handleNavigate = (slug: string) => {
    navigate(`/${status === 2 ? "evento" : "resultado"}/${slug}`);
  };

  // Skeleton enquanto carrega
  if (isLoading) {
    return (
      <section className="container py-24 sm:py-32 space-y-8">
        <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
          Carregando Eventos...
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Skeleton className="w-[200px] lg:w-[300px] h-[180px] mx-auto" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="w-full h-10" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  // Exibir erro
  if (isError) {
    return (
      <p className="text-center text-red-500">Erro ao carregar eventos.</p>
    );
  }

  // Renderiza os eventos
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Escolha{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          qual Evento irá participar?!
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(
          ({
            id,
            titulo,
            slug,
            img,
            data_ini,
            organizador,
            categoria,
          }: EventProps) => (
            <Card key={id} className="hover:shadow-lg transition-shadow">
              <CardHeader
                onClick={() => handleNavigate(slug)}
                className="cursor-pointer"
              >
                <img
                  src={img}
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
                  <Badge className="w-60 flex justify-center text-base bg-orange-500 text-white">
                    <strong>{categoria || "--"}</strong>
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
          )
        )}
      </div>

      {/* Paginação */}
      {status === 3 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                  />
                </PaginationItem>
              )}
              {getVisiblePages().map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    onClick={() => handlePageChange(p)}
                    isActive={p === page}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};
