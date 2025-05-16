import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import getCategoriesController from '../controllers/categories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const categoriesRouter = Router();

categoriesRouter.use(authenticate);

categoriesRouter.get('/categories', ctrlWrapper(getCategoriesController));

export default categoriesRouter;
