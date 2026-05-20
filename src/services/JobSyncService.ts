import { AppDataSource } from '../config/database';
import { Item } from '../entities/Item';
import { Plataforma } from '../entities/Plataforma';
import { NormalizedProduct, PlatformIntegration } from '../integrations/base/BaseIntegration';

export class SyncService {
  private itemRepo = AppDataSource.getRepository(Item);
  private plataformaRepo = AppDataSource.getRepository(Plataforma);

  async syncPlatform(integration: PlatformIntegration, keywords: string[]): Promise<void> {
    const plataforma = await this.findOrCreatePlataforma(integration.platformName);

    for (const keyword of keywords) {
      try {
        const products = await integration.fetchProducts(keyword);
        await this.upsertProducts(products, plataforma.id);
        console.log(`[Sync] ${integration.platformName} | "${keyword}" | ${products.length} produtos`);
      } catch (error) {
        console.error(`[Sync] Erro em ${integration.platformName} para "${keyword}":`, error);
      }
    }
  }

  private async findOrCreatePlataforma(nome: string): Promise<Plataforma> {
    let plataforma = await this.plataformaRepo.findOne({ where: { nomePlataforma: nome } });

    if (!plataforma) {
      plataforma = this.plataformaRepo.create({ nomePlataforma: nome, urlPrincipal: '' });
      await this.plataformaRepo.save(plataforma);
    }

    return plataforma;
  }

  private async upsertProducts(products: NormalizedProduct[], idPlataforma: string): Promise<void> {
    for (const product of products) {
      const existing = await this.itemRepo.findOne({
        where: { idPlataforma, idItemPlataforma: product.idItemPlataforma },
      });

      if (existing) {
        await this.itemRepo.update(existing.id, { ...product, idPlataforma });
      } else {
        const item = this.itemRepo.create({ ...product, idPlataforma });
        await this.itemRepo.save(item);
      }
    }
  }
}