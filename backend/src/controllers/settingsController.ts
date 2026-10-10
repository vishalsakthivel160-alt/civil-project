import { Request, Response } from 'express';
import { DbAdapter } from '../db/dbAdapter.js';
import { sendSuccess, sendError } from '../utils/responseFormatter.js';
import { sanitizeString, isValidEmail } from '../utils/sanitizer.js';

export class SettingsController {
  static async get(_req: Request, res: Response) {
    try {
      const settings = await DbAdapter.getSettings();
      return sendSuccess(res, settings, 'Site settings retrieved successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to retrieve site settings');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updates: any = {};
      if (req.body.business_name) updates.business_name = sanitizeString(req.body.business_name);
      if (req.body.phone) updates.phone = sanitizeString(req.body.phone);
      if (req.body.whatsapp) updates.whatsapp = sanitizeString(req.body.whatsapp);
      if (req.body.email) {
        if (!isValidEmail(req.body.email)) {
          return sendError(res, 'Invalid email address provided', 400);
        }
        updates.email = req.body.email.trim().toLowerCase();
      }
      if (req.body.address) updates.address = sanitizeString(req.body.address);
      if (req.body.about_text) updates.about_text = sanitizeString(req.body.about_text);

      const updated = await DbAdapter.updateSettings(updates);
      return sendSuccess(res, updated, 'Site settings updated successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to update site settings');
    }
  }
}
