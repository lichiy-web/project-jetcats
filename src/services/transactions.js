import { TransactionCollection } from '../db/models/Transaction.js';
import { UserCollection } from '../db/models/User.js';
import { balanceDiff } from '../utils/balanceDiff.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllTransactions = async ({
  userId,
  page = 1,
  perPage = 10,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const totalItems = await TransactionCollection.countDocuments({ userId });
  const transactions = await TransactionCollection.find({ userId })
    .skip(skip)
    .limit(limit);
  const paginationData = calculatePaginationData(page, perPage, totalItems);

  return {
    transactions: transactions,
    ...paginationData,
  };
};

export const createTransaction = async ({ userId }) => {
  // доповнити код-заглушку
};

export const deleteTransaction = async ({ userId, transactionId }) => {
  // доповнити код-заглушку
};

export const updateTransaction = async ({
  transactionId,
  userId,
  updateData,
}) => {
  const previousTransaction = await TransactionCollection.findOne({
    _id: transactionId,
    userId,
  });

  if (!previousTransaction) return null;

  const { type: prevType, sum: prevSum } = previousTransaction;
  let { type: newType, sum: newSum } = updateData;

  newType ??= prevType;
  newSum ??= prevSum;

  const previousAmount = balanceDiff(prevType, prevSum);
  const newAmount = balanceDiff(newType, newSum);

  const balanceChange = newAmount - previousAmount;

  await UserCollection.findByIdAndUpdate(userId, {
    $inc: { balance: balanceChange },
  });

  const updatedTransaction = await TransactionCollection.findByIdAndUpdate(
    transactionId,
    updateData,
    { new: true },
  );

  return updatedTransaction;
};

export const getSummary = async ({ userId }) => {
  // доповнити код-заглушку
};
