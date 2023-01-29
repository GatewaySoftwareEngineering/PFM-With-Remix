export const filterTransactions = (
  transactions = [],
  { search, categories = [], to, from }
) => {
  return transactions.filter((transaction) => {
    const isSearchMatch = search
      ? `${transaction.note} ${transaction.amount}`
          .toLowerCase()
          .includes(search.toLowerCase())
      : true

    const isCategoryMatch =
      categories.length > 0 ? categories.includes(transaction.category) : true

    let isToDateMatch = true
    if (to) {
      const toDate = new Date(to)
      const transactionDate = new Date(transaction.date)
      isToDateMatch = transactionDate <= toDate
    }

    let isFromDateMatch = true
    if (from) {
      const fromDate = new Date(from)
      const transactionDate = new Date(transaction.date)
      isFromDateMatch = transactionDate >= fromDate
    }

    return isSearchMatch && isCategoryMatch && isToDateMatch && isFromDateMatch
  })
}
