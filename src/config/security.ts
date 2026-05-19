export const securityConfig = {
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'change-me-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  
  // Bcrypt
  bcrypt: {
    rounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
  },
  
  // API Keys
  apiKeys: {
    internal: process.env.INTERNAL_API_KEY || '',
  },
} as const;

export type SecurityConfig = typeof securityConfig;