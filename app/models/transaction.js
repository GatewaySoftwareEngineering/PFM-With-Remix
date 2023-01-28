// export type Category =
//   | 'Salary'
//   | 'Loan'
//   | 'Gift'
//   | 'Tech'
//   | 'Food'
//   | 'Bills'
//   | 'Sports'
//   | 'Health'
//   | 'Cloths'

// export type TransactionType = 'income' | 'expense'

// export type Transaction = {
//   category: Category
//   type: TransactionType
//   date: string
//   amount: number
//   note: string
// }

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
