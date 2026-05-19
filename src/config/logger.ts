export const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  
  // Formato (pretty para dev, json para produção)
  format: process.env.NODE_ENV === 'development' ? 'pretty' : 'json',
  
  // Ativar logs no console
  console: true,
  
  // Salvar em arquivo
  file: {
    enabled: process.env.LOG_FILE_ENABLED === 'true',
    path: process.env.LOG_FILE_PATH || './logs',
    maxSize: process.env.LOG_MAX_SIZE || '10m',
    maxFiles: process.env.LOG_MAX_FILES || '7',
  },
} as const;

export type LoggerConfig = typeof loggerConfig;