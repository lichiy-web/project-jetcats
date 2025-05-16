import { TransactionCollection } from '../db/models/Transaction.js';

export const deleteTransactionById = async (id, userId) =>
  await TransactionCollection.findOneAndDelete({ _id: id, userId });
