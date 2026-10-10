import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseFormatter.js';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error('[Unhandled Error]', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error occurred';
  return sendError(res, message, status);
}

export function notFoundHandler(req: Request, res: Response) {
  return sendError(res, `API route not found: ${req.method} ${req.originalUrl}`, 404);
}
