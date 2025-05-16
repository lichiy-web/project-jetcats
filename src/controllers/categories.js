import { getCategories } from '../services/categories.js';
import { RES_MSG } from '../constants/res-msg.js';

export const getCategoriesController = async (req, res, next) => {
  const categories = await getCategories();
  const { fetchCategories } = RES_MSG[200];

  res.status(200).json({
    status: 200,
    message: fetchCategories,
    data: categories,
  });
};
