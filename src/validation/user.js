import Joi from 'joi';
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PWD_MAX_LENGTH,
  PWD_MIN_LENGTH,
} from '../constants/index.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH).required(),
  email: Joi.string()
    .email()
    .min(EMAIL_MIN_LENGTH)
    .max(EMAIL_MAX_LENGTH)
    .required(),
  password: Joi.string().min(PWD_MIN_LENGTH).max(PWD_MAX_LENGTH).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required(),
});
