import CategoriesCollection from '../models/Categories.js';

export const getCategories = () => CategoriesCollection.find();
