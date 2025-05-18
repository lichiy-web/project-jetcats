import Joi from 'joi';

export const transactionAddSchema = Joi.object({
  type: Joi.string().valid('income', 'expense').required().messages({
    'any.only': 'Type must be either "income" or "expense"',
    'string.empty': 'Type is required',
    'any.required': 'Type is required',
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required',
    'any.required': 'Category is required',
  }),
  sum: Joi.number().min(0.01).max(1000000).required().messages({
    'any.required': 'Sum required',
    'number.min': 'Sum must be greater than 0',
    'number.max': 'Sum must be less than or equal to 1000000',
    'number.base': 'Sum must be a number',
  }),
  date: Joi.date().iso().max('now').required().messages({
    'date.base': 'Date must be a valid ISO date string',
    'any.required': 'Date is required',
  }),
  comment: Joi.string().min(2).max(192).allow('').messages({
    'string.min': 'Comment must be at least 2 characters',
    'string.max': 'Comment must be less than or equal to 192 characters',
  }),
});

export const updateTransactionSchema = Joi.object({
  type: Joi.string().valid('income', 'expense').optional(),
  category: Joi.string().optional(),
  sum: Joi.number().min(0.01).max(1000000).optional(),
  date: Joi.date().iso().max('now').optional(),
  comment: Joi.string().min(2).max(192).optional(),
}).min(1);
