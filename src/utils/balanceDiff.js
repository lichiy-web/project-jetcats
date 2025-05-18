export const balanceDiff = (type, sum) =>
  ({ income: 1, expense: -1 }[type] * sum);
