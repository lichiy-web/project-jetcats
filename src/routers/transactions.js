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
import { isValidId } from '../middlewares/isValidId.js';
import {
  transactionAddSchema,
  updateTransactionSchema,
} from '../validation/transactions.js';

const router = new Router();
/**
 * Це просто заглушка, щоб лінтер не лаявся на невикористаний validateBody та
 * контролери. Після створення всіх ріутів буде видалено.
 */
router.post('/stubForValidateBody', deleteTransactionController);

// Нижче код раутів.

router.get('/summary', authenticate, ctrlWrapper(getSummaryController));

router.delete(
  '/transactions/:transactionId',
  authenticate,
router.get('/summary', ctrlWrapper(getSummaryController));
router.get('/', ctrlWrapper(getAllTransactionsController));
router.post(
  '/',
  validateBody(transactionAddSchema),
  ctrlWrapper(createTransactionController),
);

router.patch(
  '/:transactionId',
  isValidId,
  ctrlWrapper(deleteTransactionController),
);

export default router;
