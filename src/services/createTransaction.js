import TransactionCollection from '../db/models/Transactions.js';
import UserCollection from '../db/models/Users.js';
import { RES_MSG } from '../path/to/errors.js';

const createTransaction = async (payload) => {

    if (!payload.userId) {
    const error = new Error(RES_MSG[400].default);
    error.status = 400;
    throw error;
  }

  const newCollection = await TransactionCollection.create(payload);
  const user = await UserCollection.findById(payload.userId);
  if (!user) {
    const error = new Error(RES_MSG[404].noUser);
    error.status = 404;
    throw error;
  }

  const amount = payload.type === 'expense' ? -Math.abs(payload.amount) : Math.abs(payload.amount);
  const newBalance = (user.balance || 0) + amount;

  user.balance = newBalance;
  await user.save();

  return {
  message: RES_MSG[201].default,
  transaction: newCollection,
  newBalance: user.balance,
  };

};

export default createTransaction;