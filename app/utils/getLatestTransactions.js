import { getDateObj } from "./formatDate"

export let title = ""
export const getLatestTransactions = (transactions) => {
  // Get current date
  const currentDate = new Date()

  // Get dates for last seven days, last month, and this year
  const lastWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 7
  )
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
  )
  const thisYear = new Date(currentDate.getFullYear(), 0, 1)

  // Initialize an array to hold all transactions
  let allTransactions = []

  //Check for transactions this week
  if (
    transactions.some((transaction) => getDateObj(transaction.date) >= lastWeek)
  ) {
    allTransactions = transactions.filter(
      (transaction) => getDateObj(transaction.date) >= lastWeek
    )
    title = "This Week"
  }
  // Check for transactions last month
  else if (
    transactions.some(
      (transaction) => getDateObj(transaction.date) >= lastMonth
    )
  ) {
    allTransactions = transactions.filter(
      (transaction) => getDateObj(transaction.date) >= lastMonth
    )
    title = "Last Month"
  }

  // Check for transactions this year
  else if (
    transactions.some((transaction) => getDateObj(transaction.date) >= thisYear)
  ) {
    allTransactions = transactions.filter(
      (transaction) => getDateObj(transaction.date) >= thisYear
    )
    title = "This Year"
  }

  // Return the last 10 transactions
  return allTransactions.slice(Math.max(allTransactions.length - 10, 0))
}
