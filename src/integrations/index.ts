import { PlatformIntegration } from './base/BaseIntegration';
import { AliExpressIntegration } from './aliexpress/aliexpressIntegration'
import { MercadoLivreIntegration } from './mercadolivre/MercadoLivreIntegration';
import { ShopeeIntegration } from './shopee/ShopeeIntegration';

export const getEnabledIntegrations = (): PlatformIntegration[] => {
  const integrations: PlatformIntegration[] = [
    new AliExpressIntegration(),
    new MercadoLivreIntegration(),
    new ShopeeIntegration(),
  ];

  return integrations.filter(i => i.isEnabled());
};

export * from './base/BaseIntegration';