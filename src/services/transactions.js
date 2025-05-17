import { TransactionCollection } from '../db/models/Transaction.js';
import { UserCollection } from '../db/models/User.js';
import { balanceDiff } from '../utils/balanceDiff.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { balanceDiff } from '../utils/balanceDiff.js';
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

export const createTransaction = async ({ user, sum, type, ...params }) => {
  const newTransaction = await TransactionCollection.create({
    userId: user._id,
    sum,
    type,
    ...params,
  });

  const diff = balanceDiff(type, sum);
  user.balance += diff;
  await user.save();

  return {
    transaction: newTransaction,
    balance: user.balance,
  };
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

export const getSummary = async ({ userId, year, month }) => {
  const categories = await getCategories();
  const transactions = await TransactionCollection.find({
    userId,
    date: getMonthPeriod(year, month),
  });
  return createSummaryFromTransactions(transactions, categories);
};
