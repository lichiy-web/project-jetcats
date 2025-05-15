import authRouter from './auth.js';

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { rootController } from '../controllers/root.js';

const router = new Router();

router.get('/', ctrlWrapper(rootController));
router.use('/auth', authRouter);

export default router;
