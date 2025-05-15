export const parseNumber = (num, defaultNum) =>
  (typeof num === 'string' && parseInt(num)) || defaultNum;
