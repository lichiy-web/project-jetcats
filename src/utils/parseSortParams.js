import { SORT_ORDER } from '../constants/index.js';
import { getCollectionKeysOf } from './getCollectionKeysOf.js';

const parseSortOrder = sortOrder =>
  ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder) && sortOrder) ||
  SORT_ORDER.ASC;

const parseSortBy = (sortBy, schema) =>
  (getCollectionKeysOf(schema).includes(sortBy) && sortBy) || '_id';

export const parseSortParams = (query, schema) => {
  const { sortOrder, sortBy } = query;

  const parsedSortBy = parseSortBy(sortBy, schema);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
