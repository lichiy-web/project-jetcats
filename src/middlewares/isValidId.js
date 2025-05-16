import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { RES_MSG } from '../constants/res-msg.js';

//* The 1st variant of this middleware
// export const isValidId = (req, res, next) => {
//   const { contactId } = req.params;
//   if (!isValidObjectId(contactId)) {
//     next(
//       createHttpError(400, RES_MSG[400].default, {
//         details: `ContactId: ${contactId} is not valid`,
//       }),
//     );
//   }
//   next();
// };

//* The 2nd variant of this middleware
export const isValidId = paramName => (req, res, next) => {
  const id = req.params[paramName];
  if (!isValidObjectId(id)) {
    next(
      createHttpError(400, RES_MSG[400].default, {
        details: `${paramName}: ${id} is not valid`,
      }),
    );
  }
  next();
};
