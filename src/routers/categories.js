import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { getCategoriesController } from '../controllers/categories.js';

const router = new Router();

router.get('/', authenticate, ctrlWrapper(getCategoriesController));

export default router;
