export const income = (transactions) => {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0)
  return income
}

export const expense = (transactions) => {
  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0)
  return expense
}
export const balance = (transactions) => {
  const balance = income(transactions) - expense(transactions)

  return balance
}
