import { commonDurations } from './commonDurations'
import { filterByRelativeTime } from './filterByRelativeTime'

export const filterAnOverviewOfTransactions = (transactions) => {
  let filteredTransactions = []

  for (const duration of Object.keys(commonDurations)) {
    filteredTransactions = filterByRelativeTime(transactions, duration, 10, 0)
    if (filteredTransactions.length > 0) break
  }

  return filteredTransactions
}
