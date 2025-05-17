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
router.use(authenticate);

router.get('/summary', ctrlWrapper(getSummaryController));

router.delete(
  '/:transactionId',
  isValidId,
  ctrlWrapper(deleteTransactionController),
);
router.get('/', ctrlWrapper(getAllTransactionsController));
router.post(
  '/',
  validateBody(transactionAddSchema),
  ctrlWrapper(createTransactionController),
);

router.patch(
  '/:transactionId',
  isValidId,
  validateBody(updateTransactionSchema),
  ctrlWrapper(patchTransactionController),
);

export default router;
