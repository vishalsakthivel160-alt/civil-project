import { Router } from 'express';
import { ContactController } from '../controllers/contactController.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', contactRateLimiter, ContactController.submit);
router.get('/', ContactController.getAll);

export default router;
