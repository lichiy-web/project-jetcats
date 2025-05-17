import { TransactionCollection } from '../db/models/Transaction.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { balanceDiff } from '../utils/balanceDiff.js';
import { UserCollection } from '../db/models/User.js';
import { RES_MSG } from '../constants/res-msg.js';
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

export const createTransaction = async ({ userId, sum, type }) => {
  
    const newTransaction = await TransactionCollection.create({ userId, sum, type });
    const user = await UserCollection.findById(userId);
  
    const diff = balanceDiff(type, sum);
    user.balance += diff;
    await user.save();
  
    return {
    message: RES_MSG[201].default,
    transaction: newTransaction,
    newBalance: user.balance,
    };
  
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
