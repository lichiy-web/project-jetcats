import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { RES_MSG } from '../constants/res-msg.js';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(
      createHttpError(400, RES_MSG[400].default, {
        details: `ContactId: ${contactId} is not valid`,
      }),
    );
  }
  next();
};
