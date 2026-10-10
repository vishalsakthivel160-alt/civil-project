import { Request, Response } from 'express';
import { DbAdapter } from '../db/dbAdapter.js';
import { EmailService } from '../services/emailService.js';
import { sendSuccess, sendError } from '../utils/responseFormatter.js';
import { sanitizeString, isValidEmail, isValidPhone } from '../utils/sanitizer.js';

export class ContactController {
  static async submit(req: Request, res: Response) {
    try {
      const { name, email, phone, message } = req.body;

      // 1. Validate the name
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return sendError(res, 'Please provide a valid name (at least 2 characters)', 400);
      }

      // 2. Validate the email
      if (!email || !isValidEmail(email)) {
        return sendError(res, 'Please provide a valid email address', 400);
      }

      // 3. Validate the phone if provided
      if (phone && !isValidPhone(phone)) {
        return sendError(res, 'Please provide a valid phone number', 400);
      }

      // 4. Validate the message
      if (!message || typeof message !== 'string' || message.trim().length < 5) {
        return sendError(res, 'Please provide a message with at least 5 characters', 400);
      }

      // 5. Sanitize the input
      const sanitizedName = sanitizeString(name);
      const sanitizedEmail = email.trim().toLowerCase();
      const sanitizedPhone = phone ? sanitizeString(phone) : '';
      const sanitizedMessage = sanitizeString(message);

      // 6. Save the message to Supabase (or dbAdapter)
      const savedMessage = await DbAdapter.saveContactMessage({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        message: sanitizedMessage,
      });

      // 7. Send notification email in background
      EmailService.sendContactNotification({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        message: sanitizedMessage,
      }).catch((err) => console.error('[ContactController] Background email send failure:', err));

      // 8. Return a success response
      return sendSuccess(
        res,
        {
          id: savedMessage.id,
          name: savedMessage.name,
          email: savedMessage.email,
          created_at: savedMessage.created_at,
        },
        'Thank you for your inquiry. Your message has been received and our engineering team will respond shortly.',
        201
      );
    } catch (err: any) {
      console.error('[ContactController] Submit error:', err);
      return sendError(res, err.message || 'Failed to submit contact message');
    }
  }

  static async getAll(_req: Request, res: Response) {
    try {
      const messages = await DbAdapter.getContactMessages();
      return sendSuccess(res, messages, 'Contact messages retrieved successfully');
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to retrieve messages');
    }
  }
}
