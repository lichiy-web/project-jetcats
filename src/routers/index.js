import authRouter from './auth.js';
import transactionsRouter from './transactions.js';
import categoriesRouter from './categories.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { rootController } from '../controllers/root.js';
import currentRouter from './current.js';

const router = new Router();

router.get('/', ctrlWrapper(rootController));
router.use('/auth', authRouter);
router.use('/transactions', transactionsRouter);
router.use('/categories', categoriesRouter);
router.use('/user/current', currentRouter);

export default router;
