export const getCathegoryNameById = (categories, id) =>
  categories.find(cathegory => cathegory._id.toString() === id.toString()).name;

export const createSummaryFromTransactions = ({
  transactions,
  categories,
  year,
  month,
}) => {
  const initSummary = categories.reduce((summary, { name, type }) => {
    summary[type] ??= { category: {}, total: 0 };
    summary[type].category[name] = 0;
    return summary;
  }, {});

  const summary = transactions.reduce((summary, { type, category, sum }) => {
    const name = getCathegoryNameById(categories, category);
    summary[type].category[name] += sum;
    summary[type].total += sum;
    return summary;
  }, initSummary);
  summary.period = { year, month };
  return summary;
};
