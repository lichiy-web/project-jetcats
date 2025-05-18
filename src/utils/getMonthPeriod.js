export const getMonthPeriod = (year, month) => {
  const beginning = new Date(`${year}-${month}`);
  const from = new Date(beginning);
  const to = new Date(beginning);
  return { $gte: from, $lt: to };
};
