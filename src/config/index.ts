/**
 * Barrel export - Centraliza todas as configurações
 * Mas cada uma está em seu próprio arquivo!
 */

import { config as dotenvConfig } from 'dotenv';

// Carregar variáveis de ambiente PRIMEIRO
dotenvConfig();

// Importar todas as configurações
export { serverConfig } from './server';
export { databaseConfig } from './database';
export { securityConfig } from './security';
export { apisConfig } from './apis';
export { uploadConfig } from './upload';
export { cacheConfig } from './cache';
export { loggerConfig } from './logger';
export { paginationConfig } from './pagination';

// Re-exportar types
export type { ServerConfig } from './server';
export type { DatabaseConfig } from './database';
export type { SecurityConfig } from './security';
export type { ApisConfig } from './apis';
export type { UploadConfig } from './upload';
export type { CacheConfig } from './cache';
export type { LoggerConfig } from './logger';
export type { PaginationConfig } from './pagination';

/**
 * Validar configurações críticas
 */
export const validateConfig = (): void => {
  const errors: string[] = [];

  // Validar banco de dados
  if (!process.env.DB_HOST) errors.push('DB_HOST não definido');
  if (!process.env.DB_PASSWORD && process.env.NODE_ENV === 'production') {
    errors.push('DB_PASSWORD não definido em produção');
  }

  // Validar JWT em produção
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'change-me-in-production') {
      errors.push('JWT_SECRET deve ser definido em produção');
    }
  }

  if (errors.length > 0) {
    console.error(' Erros de configuração:');
    errors.forEach(err => console.error(`  - ${err}`));
    
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};