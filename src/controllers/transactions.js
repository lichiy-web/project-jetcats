import { RES_MSG } from '../constants/res-msg.js';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getSummary,
  updateTransaction,
} from '../services/transactions.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import createHttpError from 'http-errors';
import { parsePeriod } from '../utils/parsePeriod.js';

/**
 * Method: GET, Route: '/transactions'
 * Controller gets all the user's transactions using pagination query params.
 *
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {array} All the user's transaction object in DB.
 */
export const getAllTransactionsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const userId = req.user.id;

  const transactions = await getAllTransactions({
    userId,
    page,
    perPage,
  });

  res.status(200).json({
    status: 200,
    message: RES_MSG[200].getAllTransactions,
    data: transactions,
  });
};

/**
 * Method: POST, Route: '/transactions'
 * Controller creates a new user's transaction.
 *
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} The new user's transaction object, created in DB.
 */
export const createTransactionController = async (req, res) => {
  const userId = req.user._id;
  const transaction = await createTransaction({ ...req.body, userId });
  const { addTransaction } = RES_MSG[201];
  res.status(201).json({
    status: 201,
    message: addTransaction,
    data: transaction,
  });
};

/**
 * Method: DELETE, Route: '/transactions/:transactionId'
 * Controller deletes the user's transaction by its ID.
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */
export const deleteTransactionController = async (req, res) => {
  await deleteTransaction(); // доповнити код-заглушку
};

/**
 * Method: PATCH, Route: '/transactions/:transactionId'
 * Controller patchs the user's transaction at least with one field for update.
 *
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} The user's transaction object patched in DB.
 */
export const patchTransactionController = async (req, res) => {
  const { transactionId } = req.params;
  const userId = req.user._id;
  const updateData = req.body;

  const updatedTransaction = await updateTransaction({
    userId,
    transactionId,
    updateData,
  });

  if (!updatedTransaction) {
    throw createHttpError(404, 'Transaction not found');
  }

  res.status(200).json({
    status: 200,
    message: RES_MSG[200].updateTransaction,
    data: updatedTransaction,
  });
};

/**
 * Method: GET, Route: '/transactions/summary'
 * Controller gets statistic of the all transaction for chosen period in format: year-month.
 *
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {object} Object with statistic of expenses by the catigories.
 */
export const getSummaryController = async (req, res) => {
  const userId = req.user._id;
  const { year, month } = parsePeriod(req.query.period);
  const summary = await getSummary({ userId, year, month });

  res.status(200).json({
    status: 200,
    message: RES_MSG[200].getSummary,
    data: summary,
  });
};
