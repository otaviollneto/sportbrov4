export interface CategoriaEventoProps {
  id: string;
  titulo: string;
  valor_formatado: string;
  taxa_formatado: string;
  qtd_limite: string;
  data_limite: string;
}

export interface EventProps {
  id: string;
  titulo: string;
  slug: string;
  descricao: string;
  img: string;
  img2?: string;
  data_ini: string;
  regulamento?: string;
  categoria: string;
  link_externo: string;
  hasLinkExterno: boolean;
  organizador: {
    nome: string;
    telefone: string;
  };
  resultado?: {
    hasResult: boolean;
    lista: {
      id: string;
      link: string;
      titulo: string;
    }[];
  };
  categoria_evento?: CategoriaEventoProps[];
}

export interface FeaturesProps {
  status?: number;
}

export interface FetchEventsParams {
  status: number;
  page: number;
  limit?: number;
}
