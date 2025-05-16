import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const CategoryCollection = model('category', categorySchema);
