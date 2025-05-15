import { model, Schema } from 'mongoose';
import { typeList, expenseCategories, incomeCategory } from '../../constants/categories';

const categorySchema = new Schema({
  type: {
    type: String,
    enum: typeList,
    required: true,
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        if (this.type === 'income') {
          return incomeCategory.includes(value);
        } else if (this.type === 'expense') {
          return expenseCategories.includes(value);
        }
        return false;
      },
  },}}); 
  

const categoriesCollection = model('Category', categorySchema);
export default categoriesCollection;
