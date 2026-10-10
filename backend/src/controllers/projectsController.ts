import { Request, Response } from 'express';
import { DbAdapter } from '../db/dbAdapter.js';
import { sendSuccess, sendError } from '../utils/responseFormatter.js';
import { sanitizeString } from '../utils/sanitizer.js';

export class ProjectsController {
  static async getAll(req: Request, res: Response) {
    try {
      const { status, category } = req.query;
      const projects = await DbAdapter.getProjects({
        status: status as string | undefined,
        category: category as string | undefined,
      });
      return sendSuccess(res, projects, 'Projects retrieved successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to retrieve projects');
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await DbAdapter.getProjectById(id);
      if (!project) {
        return sendError(res, `Project with ID ${id} not found`, 404);
      }
      return sendSuccess(res, project, 'Project retrieved successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to retrieve project');
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { title, location, category, description, status, year, cover_image, gallery_images } = req.body;

      if (!title || !location || !category || !description) {
        return sendError(res, 'Title, location, category, and description are required fields', 400);
      }

      if (status && !['Completed', 'Ongoing'].includes(status)) {
        return sendError(res, "Status must be either 'Completed' or 'Ongoing'", 400);
      }

      const newProject = await DbAdapter.createProject({
        title: sanitizeString(title),
        location: sanitizeString(location),
        category: sanitizeString(category),
        description: sanitizeString(description),
        status: (status as 'Completed' | 'Ongoing') || 'Completed',
        year: sanitizeString(year || new Date().getFullYear().toString()),
        cover_image: cover_image || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?q=80&w=1200&auto=format&fit=crop',
        gallery_images: Array.isArray(gallery_images) ? gallery_images : [],
      });

      return sendSuccess(res, newProject, 'Project created successfully', 201);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to create project');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const existing = await DbAdapter.getProjectById(id);
      if (!existing) {
        return sendError(res, `Project with ID ${id} not found`, 404);
      }

      const updates: any = {};
      if (req.body.title) updates.title = sanitizeString(req.body.title);
      if (req.body.location) updates.location = sanitizeString(req.body.location);
      if (req.body.category) updates.category = sanitizeString(req.body.category);
      if (req.body.description) updates.description = sanitizeString(req.body.description);
      if (req.body.year) updates.year = sanitizeString(req.body.year);
      if (req.body.cover_image) updates.cover_image = req.body.cover_image;
      if (req.body.gallery_images && Array.isArray(req.body.gallery_images)) {
        updates.gallery_images = req.body.gallery_images;
      }
      if (req.body.status) {
        if (!['Completed', 'Ongoing'].includes(req.body.status)) {
          return sendError(res, "Status must be either 'Completed' or 'Ongoing'", 400);
        }
        updates.status = req.body.status;
      }

      const updated = await DbAdapter.updateProject(id, updates);
      return sendSuccess(res, updated, 'Project updated successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to update project');
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await DbAdapter.deleteProject(id);
      if (!success) {
        return sendError(res, `Project with ID ${id} not found`, 404);
      }
      return sendSuccess(res, { id }, 'Project deleted successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to delete project');
    }
  }
}
