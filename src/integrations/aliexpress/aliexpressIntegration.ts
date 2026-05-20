import axios from 'axios';
import crypto from 'crypto';
import { apisConfig } from '../../config/apis';
import { PlatformIntegration, NormalizedProduct } from '../base/BaseIntegration';
import { AliExpressResponse } from './aliexpress.types';

export class AliExpressIntegration implements PlatformIntegration {
  platformName = 'AliExpress';

  isEnabled(): boolean {
    return apisConfig.aliexpress.enabled && !!apisConfig.aliexpress.apiKey;
  }

  private buildSign(params: Record<string, string>): string {
    const { apiSecret } = apisConfig.aliexpress;
    const sorted = Object.keys(params).sort().map(k => `${k}${params[k]}`).join('');
    return crypto.createHmac('sha256', apiSecret).update(sorted).digest('hex').toUpperCase();
  }

  async fetchProducts(query: string, page = 1): Promise<NormalizedProduct[]> {
    const { apiKey, baseUrl, timeout } = apisConfig.aliexpress;

    const params: Record<string, string> = {
      app_key: apiKey,
      method: 'aliexpress.affiliate.product.query',
      timestamp: new Date().toISOString().replace(/[TZ]/g, ' ').trim(),
      sign_method: 'hmac-sha256',
      format: 'json',
      v: '2.0',
      keywords: query,
      page_no: String(page),
      page_size: '20',
      fields: 'product_id,product_title,target_sale_price,product_detail_url,promotion_link,shop_name,evaluate_rate,lastest_volume',
    };

    params.sign = this.buildSign(params);

    const response = await axios.post<AliExpressResponse>(baseUrl, null, {
      params,
      timeout,
    });

    const result = response.data.aliexpress_affiliate_product_query_response.resp_result;

    if (result.resp_code !== 200) {
      throw new Error(`AliExpress API error: ${result.resp_msg}`);
    }

    return (result.result.products?.product ?? []).map(p => ({
      idItemPlataforma: String(p.product_id),
      nomeItem: p.product_title,
      valorItem: parseFloat(p.target_sale_price),
      linkItem: p.product_detail_url,
      linkAfiliado: p.promotion_link,
      vendedor: p.shop_name,
      valorAvaliacao: parseFloat(p.evaluate_rate) / 20, // converte % para 0-5
      itemsVendidos: p.lastest_volume,
    }));
  }
}