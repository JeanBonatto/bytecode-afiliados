export interface NormalizedProduct {
  idItemPlataforma: string;
  nomeItem: string;
  descItem?: string;
  valorItem: number;
  linkItem?: string;
  linkAfiliado?: string;
  vendedor?: string;
  valorAvaliacao?: number;
  itemsVendidos?: number;
  entregaFull?: boolean;
}

export interface PlatformIntegration {
  platformName: string;
  isEnabled(): boolean;
  fetchProducts(query: string, page?: number): Promise<NormalizedProduct[]>;
}