import cron from 'node-cron';
import { getEnabledIntegrations } from '../integrations';
import { SyncService } from '../services/JobSyncService';

// Palavras-chave para sincronização
const SYNC_KEYWORDS = [
  'notebook',
  'smartphone',
  'headphone',
  'monitor',
];

export const startProductSyncJob = (): void => {
  const syncService new SyncService();

  // Roda toda hora às :00
  cron.schedule('0 * * * *', async () => {
    console.log('[Job] Iniciando sync de produtos...', new Date().toISOString());

    const integrations = getEnabledIntegrations();

    if (integrations.length === 0) {
      console.warn('[Job] Nenhuma integração habilitada. Configure as variáveis de ambiente.');
      return;
    }

    for (const integration of integrations) {
      await syncService.syncPlatform(integration, SYNC_KEYWORDS);
    }

    console.log('[Job] Sync concluído.', new Date().toISOString());
  });

  console.log('[Job] ProductSyncJob agendado (a cada hora)');
};