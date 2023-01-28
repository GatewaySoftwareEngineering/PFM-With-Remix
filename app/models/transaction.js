export const transactionTypes = ['income', 'expense']

export const categories = {
  income: ['Salary', 'Loan', 'Gift'],
  expense: ['Tech', 'Food', 'Bills', 'Sports', 'Health', 'Cloths'],
}

export const getTransactions = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]')
  return transactions
}

export const createTransaction = (transaction) => {
  const transactions = getTransactions()
  transactions.push(transaction)

  setTransactions(transactions)
}

export const setTransactions = (transactions) => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}
