import { parseValueOfType } from './parseParams.js';

export const parsePeriod = period => {
  const curDate = new Date();
  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth();

  const periodFrom = parseValueOfType(period, Date);
  if (!periodFrom || periodFrom > curDate)
    return { year: curYear, month: curMonth + 1 };
  return { year: periodFrom.getFullYear(), month: periodFrom.getMonth() + 1 };
};
