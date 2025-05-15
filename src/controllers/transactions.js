import { getAllTransactions } from '../services/transactions.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

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
