import { getDateObj } from "./formatDate"

const today = new Date()
const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)

export const income = (transactions) =>
  transactions
    .filter((transaction) => transaction.type === "income")
    .filter((transaction) => getDateObj(transaction.date) >= thisMonth)
    .reduce((sum, transaction) => sum + parseInt(transaction.amount, 10), 0)

export const expense = (transactions) =>
  transactions
    .filter((transaction) => transaction.type === "expense")
    .filter((transaction) => getDateObj(transaction.date) >= thisMonth)
    .reduce((sum, transaction) => sum + parseInt(transaction.amount, 10), 0)

export const balance = (transactions) =>
  income(transactions) - expense(transactions)
