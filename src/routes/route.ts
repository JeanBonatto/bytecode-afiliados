import { Application } from 'express';
import systemRoutes from './system';
import docsRoutes from './docs';
import itemRoutes from './item';

export const registerRoutes = (app: Application): void => {
  // Rotas de sistema (health, root)
  app.use('/', systemRoutes);

  // Documentação Swagger
  app.use('/api-docs', docsRoutes);

  // API v1
  app.use('/api/items', itemRoutes);
};