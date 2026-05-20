import { Router, Request, Response } from 'express';
import packageJson from '../../package.json';

const router = Router();

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
 *                 version:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'API Bytecode Afiliados funcionando!',
    version: packageJson.version,
    timestamp: new Date().toISOString(),
  });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Informações gerais da API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Informações da API
 */
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Bem-vindo à API Bytecode Afiliados',
    version: packageJson.version,
    endpoints: {
      health: '/health',
      docs: '/api-docs',
      api: '/api',
    },
  });
});

export default router;