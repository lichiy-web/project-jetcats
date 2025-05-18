import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getCurrentUserController } from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const currentRouter = Router();

currentRouter.use(authenticate);

currentRouter.get('/current', ctrlWrapper(getCurrentUserController));

export default currentRouter;
