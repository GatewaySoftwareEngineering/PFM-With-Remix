export const paginateTransactions = (transactions, page, limit) => {
  return transactions.slice(page * limit, page * limit + limit)
}
