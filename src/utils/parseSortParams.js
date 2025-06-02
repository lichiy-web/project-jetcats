import { SORT_ORDER } from '../constants/index.js';
import { getCollectionKeysOf } from './getCollectionKeysOf.js';

const parseSortOrder = sortOrder =>
  ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder) && sortOrder) ||
  SORT_ORDER.DESC;

const parseSortBy = (sortBy, schema) =>
  (getCollectionKeysOf(schema).includes(sortBy) && sortBy) || 'date';

export const parseSortParams = (query, schema) => {
  const { sortOrder, sortBy } = query;

  const parsedSortBy = parseSortBy(sortBy, schema);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
