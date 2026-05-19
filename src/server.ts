import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './config/database';
import { swaggerSpec } from './config/swagger';
import packageJson from '../package.json';
import { URL, PORT} from './config/app';

// Carregar variáveis de ambiente
config();

const app = express();

const VERSION = packageJson.version || '1.0.0';

// ===== MIDDLEWARES =====
app.use(helmet()); // Segurança
app.use(cors());   // CORS para permitir requisições do frontend
app.use(express.json()); // Parser de JSON

// ===== DOCUMENTAÇÃO SWAGGER =====
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Bytecode Afiliados API',
}));

// ===== ROTAS =====

// Rota de health check (verificar se API está rodando)
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica se a API está funcionando
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: API Bytecode Afiliados funcionando!
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'API Bytecode Afiliados funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota raiz
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Bem-vindo à API Bytecode Afiliados',
    version: VERSION,
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

// ===== INICIALIZAÇÃO =====

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // Conectar ao banco de dados
    await AppDataSource.initialize();
    console.log('✅ Banco de dados conectado com sucesso!');
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('🚀 Servidor rodando!');
      console.log(`📍 URL: ${URL}`);
      console.log(`🏥 Health: ${URL}/health`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV}`);
      console.log(`📦 Versão: ${VERSION}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Iniciar
startServer();