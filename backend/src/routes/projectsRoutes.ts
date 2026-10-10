import { Router } from 'express';
import { ProjectsController } from '../controllers/projectsController.js';

const router = Router();

router.get('/', ProjectsController.getAll);
router.get('/:id', ProjectsController.getById);
router.post('/', ProjectsController.create);
router.put('/:id', ProjectsController.update);
router.delete('/:id', ProjectsController.delete);

export default router;
