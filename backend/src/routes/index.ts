import { Router } from 'express';
import projectsRoutes from './projectsRoutes.js';
import servicesRoutes from './servicesRoutes.js';
import contactRoutes from './contactRoutes.js';
import settingsRoutes from './settingsRoutes.js';
import storageRoutes from './storageRoutes.js';

const apiRouter = Router();

apiRouter.use('/projects', projectsRoutes);
apiRouter.use('/services', servicesRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/settings', settingsRoutes);
apiRouter.use('/storage', storageRoutes);

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Tectonic Precision Civil Works API',
  });
});

export default apiRouter;
