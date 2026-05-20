import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AppDataSource } from './config/database';
import { registerRoutes } from './routes/route';
import { PORT, URL } from './config/app';
import packageJson from '../package.json';
import { startAllJobs } from './jobs';

const app = express();

// ===== MIDDLEWARES =====
app.use(helmet());
app.use(cors());
app.use(express.json());

// ===== ROTAS =====
registerRoutes(app);

// ===== INICIALIZAÇÃO =====
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Banco de dados conectado com sucesso!');

    app.listen(PORT, () => {
      console.log('🚀 Servidor rodando!');
      console.log(`📍 URL: ${URL}`);
      console.log(`🏥 Health: ${URL}/health`);
      console.log(`📚 Docs: ${URL}/api-docs`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV}`);
      console.log(`📦 Versão: ${packageJson.version}`);
    });
    // Inicia os jobs agendados
    startAllJobs();
  } catch (error) {
    console.error(' Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();