import {
  getAllTransactions,
  createTransaction,
} from '../services/transactions.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { RES_MSG } from '../constants/res-msg';

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

export const createTransactionController = async (req, res) => {
  const userId = req.user.id;
  const transaction = await createTransaction({ ...req.body, userId });
  const { addTransaction } = RES_MSG[201];
  res.status(201).json({
    status: 201,
    message: addTransaction,
    data: transaction,
  });
};
