export const transactionTypes = ['income', 'expense']

export const categories = {
  income: ['Salary', 'Loan', 'Gift'],
  expense: ['Tech', 'Food', 'Bills', 'Sports', 'Health', 'Cloths'],
}

export const getTransactions = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]')
  return transactions
}

/**
 * Create a new transaction.
 * @param {Object} transaction
 * @param {string} transaction.type
 * @param {string} transaction.category
 * @param {number} transaction.amount
 * @param {string} transaction.note
 * @param {string} transaction.date
 */
export const createTransaction = (transaction) => {
  const transactions = getTransactions()
  transactions.unshift(transaction)

  setTransactions(transactions)
}

export const setTransactions = (transactions) => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}
