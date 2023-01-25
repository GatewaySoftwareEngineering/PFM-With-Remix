export const getLastWeekTransactions = (transactions) => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  return transactions.filter(transaction => new Date(transaction.createdAt) >= lastWeek);
}

export const getLastMonthTransactions = (transactions) => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  return transactions.filter(transaction => new Date(transaction.createdAt) >= lastMonth);
}

export const getLastYearTransactions = (transactions) => {
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  return transactions.filter(transaction => new Date(transaction.createdAt) >= lastYear);
}
