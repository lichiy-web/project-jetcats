import createHttpError from 'http-errors';
import { RES_MSG } from '../constants/res-msg.js';

export const validateBody = schema => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, RES_MSG[400].default, {
      errors: err.details,
    });
    next(error);
  }
};
