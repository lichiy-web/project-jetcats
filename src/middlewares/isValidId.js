import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { RES_MSG } from '../constants/res-msg.js';

export const isValidId = (req, res, next) => {
  const { transactionId } = req.params;
  if (!isValidObjectId(transactionId)) {
    next(
      createHttpError(400, RES_MSG[400].default, {
        details: `The following id: ${transactionId} is not valid`,
      }),
    );
  }
  next();
};
