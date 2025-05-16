import { CategoryCollection } from '../db/models/Category.js';

export const getCategories = () => CategoryCollection.find();
