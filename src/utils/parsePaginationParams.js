import { parseNumber } from './parseNumber.js';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export const parsePaginationParams = ({ page, perPage }) => ({
  page: parseNumber(page, DEFAULT_PAGE),
  perPage: parseNumber(perPage, DEFAULT_PER_PAGE),
});
