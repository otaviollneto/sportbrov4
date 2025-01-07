export interface CategoriaEventoProps {
  id: string;
  titulo: string;
  valor_formatado: string;
  taxa_formatado: string;
  qtd_limite: string;
  data_limite: string;
}

export interface ResultadoEventoProps {
  hasResult: boolean;
  lista: {
    id: string;
    link: string;
    titulo: string;
  }[];
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
  resultado?: ResultadoEventoProps;
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

export interface UserData {
  isPDC: boolean;
  documentType: string;
  document: string;
  name: string;
  email: string;
  phone: string;
  sex: string;
  birthDate: string;
  address: string;
  neighborhood: string;
  state: string;
  city: string;
  country: string;
  cep: string;
  number: string;
  complement?: string;
  pdcName?: string;
  teamName?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  errors?: Record<string, string>;
}

export interface SponsorProps {
  id: string;
  link: string;
  titulo: string;
}

export interface EventProps {
  lista: {
    id: string;
    link: string;
    titulo: string;
  }[];
}

export interface EventData {
  event: {
    id: string;
    id_cliente: string;
    titulo: string;
    data: string;
    img: string;
    img2: string;
    status: string;
    descricao: string;
    regulamento: string;
    data_ini: string;
    hora_ini: string;
    data_fim: string;
    hora_fim: string;
    categoria: string;
    limite: string;
    taxa_adm: string;
    taxa_adm2: string;
    id_promotor: string;
    tipo: string;
    data_fim_boleto: string;
    km: string;
    coletivo: string;
    usaTamanhos: string;
    ver_insc: string;
    desafio: string;
    link: string;
    parcelamento: string;
    semValidaIdade: string;
    slug: string;
    cod_pagseguro: string;
  };
  ticket: {
    id: string;
    id_evento: string;
    titulo: string;
    lote: string;
    qtd: string;
    venda: string;
    qtd_limite: string;
    data_limite: string;
    km: string;
    status: string;
  };
  status: string;
  status_color: string;
  payment_link: string;
  cod_pagseguro: string;
  tempo_corrida: string;
  tamanho_camiseta: string;
  responsavel: string;
}
