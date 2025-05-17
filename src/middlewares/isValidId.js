import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { RES_MSG } from '../constants/res-msg.js';

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(
      createHttpError(400, RES_MSG[400].default, {
        details: `The following id: ${id} is not valid`,
      }),
    );
  }
  next();
};
