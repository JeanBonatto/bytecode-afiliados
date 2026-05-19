export const cacheConfig = {
  enabled: process.env.CACHE_ENABLED === 'true',
  
  // TTL padrão (segundos)
  ttl: parseInt(process.env.CACHE_TTL || '3600'),
  
  // Driver (memory, redis, etc)
  driver: process.env.CACHE_DRIVER || 'memory',
  
  // Redis (quando implementar)
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0'),
  },
} as const;

export type CacheConfig = typeof cacheConfig;