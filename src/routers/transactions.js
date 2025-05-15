import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateTransactionSchema } from '../validation/transactions.js';
import { updateTransactionController } from '../controllers/transactions.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = new Router();

router.patch('/:transactionId', isValidId, authenticate, validateBody(updateTransactionSchema), ctrlWrapper(updateTransactionController));

export default router;