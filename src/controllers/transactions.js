import { getAllTransactions } from '../services/transactions.js';
import { updateTransaction } from '../../services/transactions.js';
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

export const patchTransactionController = async (req, res) => {
  const { transactionId } = req.params;
  const userId = req.user._id;
  const updateData = req.body;

  const updatedTransaction = await updateTransaction({
    transactionId,
    userId,
    updateData,
  });

  if (!updatedTransaction) {
    throw createHttpError(404, 'Transaction not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Transaction updated successfully',
    data: updatedTransaction,
  });
};
