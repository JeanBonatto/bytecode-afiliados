import { config } from 'dotenv';

config();

export const serverConfig = {
  port: parseInt(process.env.PORT || '3000'),
  env: process.env.NODE_ENV || 'development',
  debug: process.env.NODE_ENV === 'development',
  
  // CORS
  cors: {
    origins: process.env.CORS_ORIGINS?.split(',') || ['*'],
    credentials: true,
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de requisições
  },
} as const;

// Type export
export type ServerConfig = typeof serverConfig;