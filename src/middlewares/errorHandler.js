import { HttpError } from 'http-errors';
import { RES_MSG } from '../constants/res-msg.js';

export const errorHandler = async (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err?.details ? { message: err.details } : err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: RES_MSG[500].default,
    data: err.message,
  });
};
