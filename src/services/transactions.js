import { TransactionCollection } from '../../db/models/Transaction.js';
import { UserCollection } from '../../db/models/User.js';

export const updateTransaction = async ({
  transactionId,
  userId,
  updateData,
}) => {
  const previousTransaction = await TransactionCollection.findOne({
    _id: transactionId,
    userId,
  });
  if (!previousTransaction) {
    return null;
  }

  const user = await UserCollection.findById(userId);
  if (!user) {
    return null;
  }

  // сума збереженої транзакції з урахуванням знаку (від'ємна для видатків, та позитивна для доходів)
  let previousAmount;
  if (previousTransaction.type === 'income') {
    previousAmount = previousTransaction.sum;
  } else {
    previousAmount = -previousTransaction.sum;
  }

  let newType;
  if ('type' in updateData) {
    newType = updateData.type;
  } else {
    newType = previousTransaction.type;
  }

  let newSum;
  if ('sum' in updateData) {
    newSum = updateData.sum;
  } else {
    newSum = previousTransaction.sum;
  }

  // сума оновленої транзакції з урахуванням знаку (від'ємна для видатків, та позитивна для доходів)
  let newAmount;
  if (newType === 'income') {
    newAmount = newSum;
  } else {
    newAmount = -newSum;
  }

  // зміна балансу: поточний баланс - сума збереженої транзакції + сума оновленої
  const balanceChange = newAmount - previousAmount;
  user.balance += balanceChange;
  await user.save();

  const updatedTransaction = await TransactionCollection.findByIdAndUpdate(
    transactionId,
    updateData,
    { new: true },
  );

  return updatedTransaction;
};
