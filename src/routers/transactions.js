import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createTransactionController,
  deleteTransactionController,
  patchTransactionController,
  getAllTransactionsController,
  getSummaryController,
} from '../controllers/transactions.js';
import { updateTransactionSchema } from '../validation/transactions.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = new Router();
/**
 * Це просто заглушка, щоб лінтер не лаявся на невикористаний validateBody та
 * контролери. Після створення всіх ріутів буде видалено.
 */
router.post(
  '/stubForValidateBody',
  validateBody,
  getAllTransactionsController,
  createTransactionController,
  deleteTransactionController,
  patchTransactionController,
);

// Нижче код раутів.

router.get('/summary', authenticate, ctrlWrapper(getSummaryController));

router.patch(
  '/:transactionId',
  isValidId,
  authenticate,
  validateBody(updateTransactionSchema),
  ctrlWrapper(updateTransactionController),
);

export default router;
