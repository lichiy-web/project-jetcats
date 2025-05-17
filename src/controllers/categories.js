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
  await getCategories(); // доповнити код-заглушку
};
