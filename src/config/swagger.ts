import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bytecode Afiliados API',
      version: '1.0.0',
      description: 'API para integração com plataformas de afiliados (AliExpress, Mercado Livre, Shopee)',
      contact: {
        name: 'API Support',
        email: 'support@bytecode.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Desenvolvimento',
      },
    ],
    tags: [
      { name: 'Health', description: 'Endpoints de verificação' },
      { name: 'Plataformas', description: 'Gerenciamento de plataformas' },
      { name: 'Items', description: 'Gerenciamento de produtos' },
      { name: 'Images', description: 'Gerenciamento de imagens' },
    ],
    components: {
      schemas: {
        Plataforma: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            nomePlataforma: { type: 'string', example: 'AliExpress' },
            urlPrincipal: { type: 'string', example: 'https://aliexpress.com' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Item: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            idPlataforma: { type: 'string', format: 'uuid' },
            nomeItem: { type: 'string', example: 'Notebook Dell' },
            descItem: { type: 'string' },
            valorItem: { type: 'number', example: 2500.00 },
            linkItem: { type: 'string' },
            linkAfiliado: { type: 'string' },
            valorAvaliacao: { type: 'number', example: 4.5 },
            itemsVendidos: { type: 'integer', example: 150 },
            entregaFull: { type: 'boolean' },
          },
        },
      },
    },
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/server.ts',
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);