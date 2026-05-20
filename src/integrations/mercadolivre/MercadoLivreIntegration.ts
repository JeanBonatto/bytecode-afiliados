import axios from 'axios';
import { apisConfig } from '../../config/apis';
import { PlatformIntegration, NormalizedProduct } from '../base/BaseIntegration';
import { MercadoLivreResponse } from './mercadolivre.types';

export class MercadoLivreIntegration implements PlatformIntegration {
  platformName = 'Mercado Livre';

  isEnabled(): boolean {
    return apisConfig.mercadoLivre.enabled;
  }

  async fetchProducts(query: string, page = 1): Promise<NormalizedProduct[]> {
    const { baseUrl, timeout } = apisConfig.mercadoLivre;
    const limit = 20;
    const offset = (page - 1) * limit;

    const response = await axios.get<MercadoLivreResponse>(`${baseUrl}/sites/MLB/search`, {
      params: {
        q: query,
        limit,
        offset,
        sort: 'relevance',
      },
      timeout,
    });

    return response.data.results.map(item => ({
      idItemPlataforma: item.id,
      nomeItem: item.title,
      valorItem: item.price,
      linkItem: item.permalink,
      linkAfiliado: item.permalink,
      vendedor: item.seller?.nickname,
      valorAvaliacao: item.reviews?.rating_average,
      itemsVendidos: item.sold_quantity,
      entregaFull: item.shipping?.logistic_type === 'fulfillment',
    }));
  }
}