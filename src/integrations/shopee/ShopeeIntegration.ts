import axios from 'axios';
import crypto from 'crypto';
import { apisConfig } from '../../config/apis';
import { PlatformIntegration, NormalizedProduct } from '../base/BaseIntegration';
import { ShopeeResponse } from './shopee.types';

export class ShopeeIntegration implements PlatformIntegration {
  platformName = 'Shopee';

  isEnabled(): boolean {
    return apisConfig.shopee.enabled && !!apisConfig.shopee.partnerId;
  }

  private buildSign(path: string, timestamp: number): string {
    const { partnerKey, partnerId } = apisConfig.shopee;
    const base = `${partnerId}${path}${timestamp}`;
    return crypto.createHmac('sha256', partnerKey).update(base).digest('hex');
  }

  async fetchProducts(query: string, page = 1): Promise<NormalizedProduct[]> {
    const { baseUrl, partnerId, timeout } = apisConfig.shopee;
    const path = '/api/v2/product/search_items';
    const timestamp = Math.floor(Date.now() / 1000);
    const sign = this.buildSign(path, timestamp);

    const response = await axios.get<ShopeeResponse>(`${baseUrl}${path}`, {
      params: {
        partner_id: parseInt(partnerId),
        timestamp,
        sign,
        keyword: query,
        page_size: 20,
        offset: (page - 1) * 20,
      },
      timeout,
    });

    if (response.data.error) {
      throw new Error(`Shopee API error: ${response.data.message}`);
    }

    return (response.data.response?.item ?? []).map(item => ({
      idItemPlataforma: String(item.item_id),
      nomeItem: item.item_name,
      valorItem: item.price_min / 100000, // Shopee usa microunidades
      linkItem: item.item_url,
      linkAfiliado: item.item_url,
    }));
  }
}