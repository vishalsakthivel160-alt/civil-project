import { Request, Response } from 'express';
import { DbAdapter } from '../db/dbAdapter.js';
import { sendSuccess, sendError } from '../utils/responseFormatter.js';
import { sanitizeString } from '../utils/sanitizer.js';

export class ServicesController {
  static async getAll(_req: Request, res: Response) {
    try {
      const services = await DbAdapter.getServices();
      return sendSuccess(res, services, 'Services retrieved successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to retrieve services');
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = await DbAdapter.getServiceById(id);
      if (!service) {
        return sendError(res, `Service with ID ${id} not found`, 404);
      }
      return sendSuccess(res, service, 'Service retrieved successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to retrieve service');
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { title, description, icon, display_order } = req.body;

      if (!title || !description) {
        return sendError(res, 'Title and description are required fields', 400);
      }

      const newService = await DbAdapter.createService({
        title: sanitizeString(title),
        description: sanitizeString(description),
        icon: sanitizeString(icon || 'Layers'),
        display_order: typeof display_order === 'number' ? display_order : 99,
      });

      return sendSuccess(res, newService, 'Service created successfully', 201);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to create service');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const existing = await DbAdapter.getServiceById(id);
      if (!existing) {
        return sendError(res, `Service with ID ${id} not found`, 404);
      }

      const updates: any = {};
      if (req.body.title) updates.title = sanitizeString(req.body.title);
      if (req.body.description) updates.description = sanitizeString(req.body.description);
      if (req.body.icon) updates.icon = sanitizeString(req.body.icon);
      if (typeof req.body.display_order === 'number') updates.display_order = req.body.display_order;

      const updated = await DbAdapter.updateService(id, updates);
      return sendSuccess(res, updated, 'Service updated successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to update service');
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await DbAdapter.deleteService(id);
      if (!success) {
        return sendError(res, `Service with ID ${id} not found`, 404);
      }
      return sendSuccess(res, { id }, 'Service deleted successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to delete service');
    }
  }
}
