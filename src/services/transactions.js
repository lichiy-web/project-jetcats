import { TransactionCollection } from '../db/models/Transaction.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { createSummaryFromTransactions } from '../utils/createSummaryFromTransactions.js';
import { getMonthPeriod } from '../utils/getMonthPeriod.js';
import { getCategories } from './categories.js';

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
  userId,
  transactionId,
  updateData,
  options = {},
}) => {
  // доповнити код-заглушку
};

export const getSummary = async ({ userId, year, month }) => {
  const categories = await getCategories();
  const transactions = await TransactionCollection.find({
    userId,
    date: getMonthPeriod(year, month),
  });
  return createSummaryFromTransactions(transactions, categories);
};
