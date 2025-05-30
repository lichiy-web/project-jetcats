import { TransactionCollection } from '../db/models/Transaction.js';
import { balanceDiff } from '../utils/balanceDiff.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { createSummaryFromTransactions } from '../utils/createSummaryFromTransactions.js';
import { getMonthPeriod } from '../utils/getMonthPeriod.js';
import { getCategories } from './categories.js';

export const getAllTransactions = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = 'desc',
}) => {
  console.log(sortBy, sortOrder);
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const totalItems = await TransactionCollection.countDocuments({ userId });
  const transactions = await TransactionCollection.find({ userId })
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
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

export const deleteTransaction = async ({ user, transactionId }) => {
  const deletedTransaction = await TransactionCollection.findOneAndDelete({
    _id: transactionId,
    userId: user._id,
  });

  if (deletedTransaction) {
    const { type, sum } = deletedTransaction;
    const diff = balanceDiff(type, sum);
    user.balance -= diff;
    await user.save();
  }
  return { transaction: null, balance: user.balance };
};

export const updateTransaction = async ({
  transactionId,
  user,
  updateData,
}) => {
  const previousTransaction = await TransactionCollection.findOne({
    _id: transactionId,
    userId: user._id,
  });

  if (!previousTransaction) return null;

  const { type: prevType, sum: prevSum } = previousTransaction;
  let { type: newType, sum: newSum } = updateData;

  newType ??= prevType;
  newSum ??= prevSum;

  const previousAmount = balanceDiff(prevType, prevSum);
  const newAmount = balanceDiff(newType, newSum);

  const balanceChange = newAmount - previousAmount;
  user.balance += balanceChange;
  await user.save();

  const updatedTransaction = await TransactionCollection.findByIdAndUpdate(
    transactionId,
    updateData,
    { new: true },
  );

  return {
    transaction: updatedTransaction,
    balance: user.balance,
  };
};

export const getSummary = async ({ userId, year, month }) => {
  const categories = await getCategories();
  const transactions = await TransactionCollection.find({
    userId,
    date: getMonthPeriod(year, month),
  });
  return createSummaryFromTransactions({
    transactions,
    categories,
    year,
    month,
  });
};
