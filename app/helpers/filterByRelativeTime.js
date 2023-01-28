const isInXDays = (dateString, xDays) => {
  const date = new Date(dateString)
  const today = new Date()

  const diff = today.getTime() - date.getTime()

  const days = diff / (1000 * 60 * 60 * 24)

  if (days <= xDays) return true
}

export const filterByRelativeTime = (
  transactions,
  relativeTime,
  limit,
  offset
) => {
  const filteredTransactions = transactions.filter((transaction) => {
    if (relativeTime === 'all') return true
    if (relativeTime === 'week') return isInXDays(transaction.date, 7)
    if (relativeTime === 'month') return isInXDays(transaction.date, 30)
    if (relativeTime === 'year') return isInXDays(transaction.date, 365)
  })

  return filteredTransactions.slice(offset, limit ? offset + limit : undefined)
}
