import { contactSchema } from '../db/models/contact.js';
import { parseParams } from './parseParams.js';

const parseContactType = type =>
  parseParams('contactType', type, contactSchema);

const parseIsFavourite = isFavourite =>
  parseParams('isFavourite', isFavourite, contactSchema);

export const parseFilterParams = query => {
  const { type, isFavourite } = query;

  return {
    type: parseContactType(type),
    isFavourite: parseIsFavourite(isFavourite),
  };
};
