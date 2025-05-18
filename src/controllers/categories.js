import { RES_MSG } from '../constants/res-msg.js';
import { getCategories } from '../services/categories.js';

/**
 * Method: GET, Route: '/categories'
 * Controller gets all the available catecories of transactions.
 *
 * @param {object} req - http request
 * @param {object} res - http response
 * @returns {array} Array of all available categories.
 */
export const getCategoriesController = async (req, res) => {
  const categories = await getCategories();

  res.status(200).json({
    status: 200,
    message: RES_MSG[200].getCategories,
    data: categories,
  });
};
