import TransactionCollection from '../db/models/Transactions.js';

const createTransaction = async (payload) => {

  const newCollection = await TransactionCollection.create(payload);
  return newCollection;
};

export default createTransaction;