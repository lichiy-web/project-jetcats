import { updateTransaction } from '../services/transactions.js';

export const updateTransactionController = async (req, res) => {
  const { transactionId } = req.params;
  const userId = req.user.id;
  const updateData = req.body;

  const updatedTransaction = await updateTransaction({
    transactionId,
    userId,
    updateData,
  });

  if (!updatedTransaction) {
    return res.status(404).json({
      status: '404',
      message: 'Transaction not found or not yours',
    });
  }

  res.json({
    status: 200,
    message: 'Transaction updated successfully',
    data: updatedTransaction,
  });
};
