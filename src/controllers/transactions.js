import createHttpError from 'http-errors';
import { getAllTransactions } from '../services/transactions.js';
import { deleteTransactionById } from '../services/transactionServices.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { RES_MSG } from '../constants/res-msg.js';

export const getAllTransactionsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const userId = req.user.id;

  const transactions = await getAllTransactions({
    userId,
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: 'Successfully found all transactions',
    data: transactions,
  });
};

export const deleteTransactionController = async (req, res) => {
  const { transactionId } = req.params;
  const userId = req.user._id;
  const transaction = await deleteTransactionById(transactionId, userId);

  if (!transaction) {
    throw createHttpError(404, RES_MSG[404].noTransaction);
  }

  res.status(204).send();
};
