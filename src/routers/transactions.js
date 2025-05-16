import { Router } from 'express';
import { transactionAddController } from '../controllers/transactions.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { transactionAddSchema } from '../validation/transactions.js';

const router = Router();

router.post(
  '/',
  validateBody(transactionAddSchema),
  ctrlWrapper(transactionAddController),
);

export default router;
