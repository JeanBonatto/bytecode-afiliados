/**
 * Configurações de APIs externas
 */
export const apisConfig = {
  aliexpress: {
    enabled: process.env.ALIEXPRESS_ENABLED === 'true',
    apiKey: process.env.ALIEXPRESS_API_KEY || '',
    apiSecret: process.env.ALIEXPRESS_API_SECRET || '',
    baseUrl: process.env.ALIEXPRESS_BASE_URL || 'https://api.aliexpress.com',
    timeout: parseInt(process.env.ALIEXPRESS_TIMEOUT || '30000'),
  },
  
  mercadoLivre: {
    enabled: process.env.ML_ENABLED === 'true',
    clientId: process.env.ML_CLIENT_ID || '',
    clientSecret: process.env.ML_CLIENT_SECRET || '',
    baseUrl: process.env.ML_BASE_URL || 'https://api.mercadolibre.com',
    timeout: parseInt(process.env.ML_TIMEOUT || '30000'),
  },
  
  shopee: {
    enabled: process.env.SHOPEE_ENABLED === 'true',
    partnerId: process.env.SHOPEE_PARTNER_ID || '',
    partnerKey: process.env.SHOPEE_PARTNER_KEY || '',
    baseUrl: process.env.SHOPEE_BASE_URL || 'https://partner.shopeemobile.com',
    timeout: parseInt(process.env.SHOPEE_TIMEOUT || '30000'),
  },
} as const;

export type ApisConfig = typeof apisConfig;