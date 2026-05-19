export const paginationConfig = {
  defaultLimit: parseInt(process.env.PAGINATION_LIMIT || '20'),
  maxLimit: parseInt(process.env.PAGINATION_MAX_LIMIT || '100'),
} as const;

export type PaginationConfig = typeof paginationConfig;