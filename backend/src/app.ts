import express, { Express } from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { generalApiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp(): Express {
  const app = express();

  // Basic security and parsing
  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: '*', // Allow origin for development and embedded iframe
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // General rate limiter on API
  app.use('/api', generalApiLimiter);

  // Mount API endpoints
  app.use('/api', apiRouter);

  // Centralized Error Handling for API routes
  app.use('/api', errorHandler);

  return app;
}
