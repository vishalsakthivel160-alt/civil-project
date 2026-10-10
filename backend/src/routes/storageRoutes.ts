import { Router, Request, Response } from 'express';
import multer from 'multer';
import { StorageService } from '../services/storageService.js';
import { sendSuccess, sendError } from '../utils/responseFormatter.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WEBP, AVIF) are allowed'));
    }
  },
});

// Single image upload (e.g., cover image)
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return sendError(res, 'No image file uploaded', 400);
    }

    const publicUrl = await StorageService.uploadImage(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    return sendSuccess(res, { url: publicUrl }, 'Image uploaded successfully');
  } catch (err: any) {
    return sendError(res, err.message || 'Image upload failed');
  }
});

// Multiple gallery images upload
router.post('/upload-gallery', upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return sendError(res, 'No image files uploaded', 400);
    }

    const urls: string[] = [];
    for (const file of files) {
      const url = await StorageService.uploadImage(file.buffer, file.originalname, file.mimetype);
      urls.push(url);
    }

    return sendSuccess(res, { urls }, 'Gallery images uploaded successfully');
  } catch (err: any) {
    return sendError(res, err.message || 'Gallery upload failed');
  }
});

export default router;
