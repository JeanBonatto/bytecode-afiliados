// src/config/database.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const databaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'bytecode_afiliados',
  
  // ⚠️ IMPORTANTE: Desabilitar synchronize em produção!
  synchronize: process.env.NODE_ENV === 'development' && process.env.USE_MIGRATIONS !== 'true',
  
  logging: process.env.NODE_ENV === 'development',
  
  pool: {
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    max: parseInt(process.env.DB_POOL_MAX || '10'),
  },
  
  connectionTimeout: parseInt(process.env.DB_TIMEOUT || '30000'),
} as const;

export type DatabaseConfig = typeof databaseConfig;

// AppDataSource - Conexão TypeORM
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  
  // ⚠️ NUNCA usar synchronize em produção!
  synchronize: databaseConfig.synchronize,
  
  logging: databaseConfig.logging,
  
  // Entidades
  entities: [
    process.env.NODE_ENV === 'production' 
      ? 'dist/entities/**/*.js'  // Produção: arquivos compilados
      : 'src/entities/**/*.ts'    // Desenvolvimento: arquivos TypeScript
  ],
  
  // Migrations
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/migrations/**/*.js'
      : 'src/migrations/**/*.ts'
  ],
  
  migrationsTableName: 'migrations_history',
  
  // Pool de conexões
  extra: {
    max: databaseConfig.pool.max,
    min: databaseConfig.pool.min,
  },
});