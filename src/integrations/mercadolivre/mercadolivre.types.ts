export interface MercadoLivreItem {
  id: string;
  title: string;
  price: number;
  permalink: string;
  seller: { nickname: string };
  condition: string;
  shipping: { free_shipping: boolean; logistic_type: string };
  reviews?: { rating_average: number };
  sold_quantity: number;
}

export interface MercadoLivreResponse {
  results: MercadoLivreItem[];
  paging: { total: number; offset: number; limit: number };
}