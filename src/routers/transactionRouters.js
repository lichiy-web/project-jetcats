import express from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { deleteTransactionController } from '../controllers/transactions.js';
import { isValidId } from '../middlewares/isValidId.js';

const transactionRouter = express.Router();
transactionRouter.use(authenticate);

transactionRouter.delete(
  '/transactions/:transactionId',
  isValidId('transactionId'),
  ctrlWrapper(deleteTransactionController),
);

export default transactionRouter;
