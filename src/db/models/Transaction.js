import { model, Schema } from 'mongoose';
export const transactionSchema = new Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sum: {
    type: Number,
    min: 0.01,
    max: 1000000,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    minlength: 2,
    maxlength: 192,
    default: '',
  },
});
export const TransactionCollection = model('transaction', transactionSchema);
