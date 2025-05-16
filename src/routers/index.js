import { Router } from 'express';
import authRouter from './auth.js';
import transactionsRouter from './transactions.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { rootController } from '../controllers/root.js';

const router = new Router();

router.get('/', ctrlWrapper(rootController));
router.use('/auth', authRouter);
router.use('/transactions', transactionsRouter);

export default router;
