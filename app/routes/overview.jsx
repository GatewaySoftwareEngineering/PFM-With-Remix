import styleUrl from "~/styles/overview.css"
import cardStyleUrl from "~/styles/card.css"
import ModalStyleUrl from "~/styles/modal.css"
import transactionStyleUrl from "~/styles/transaction.css"
import { useLoaderData, useNavigate, Outlet } from "@remix-run/react"
import Card from "~/components/card"
import Transaction from "~/components/transaction"
import {
  getFilteredTransactions,
  getIncome,
  getExpenses,
} from "~/utils/transactions.server"

export let links = () => [
  { rel: "stylesheet", href: styleUrl },
  { rel: "stylesheet", href: cardStyleUrl },
  { rel: "stylesheet", href: ModalStyleUrl },
  { rel: "stylesheet", href: transactionStyleUrl },
]
export let meta = () => ({ title: "Overview - Personal Finance Manager" })

export let loader = async () => {
  const date = new Date()
  const lastWeek = new Date(date.setDate(date.getDate() - 7))
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

  const options = {
    take: 10,
    skip: 0,
  }

  const dateRanges = [
    { dateRange: "This Week", date: lastWeek },
    { dateRange: "Last Month", date: lastMonth },
    { dateRange: "Last Year", date: lastYear },
  ]

  let transactions, dateRange

  // This code loops through the date ranges to find the first date range with
  // transactions.

  for (const { dateRange: range, date } of dateRanges) {
    transactions = await getFilteredTransactions(options, {
      date: {
        gte: new Date(date).toISOString(),
      },
    })

    // set the date range: e.g. "This Week", "Last Month", "Last Year" to show in the frontend.
    if (transactions.length > 0) {
      dateRange = range
      break
    }
  }

  // If there are no transactions in the date ranges, then it
  // returns the lastest 10 transactions.
  if (!transactions || transactions.length === 0) {
    transactions = await getFilteredTransactions()
    dateRange = "All Time"
  }

  let income = await getIncome()
  let expenses = await getExpenses()

  let balance = income._sum.amount - expenses._sum.amount

  return { income, expenses, balance, transactions, dateRange }
}

export default function OverviewRoute() {
  let { income, expenses, balance, transactions, dateRange } = useLoaderData()
  const navigate = useNavigate()

  return (
    <div className="overview-container">
      <Outlet></Outlet>
      <div className="dashboard">
        <Card name="income" amount={income._sum.amount} />
        <Card name="balance" amount={balance} />
        <Card name="expenses" amount={expenses._sum.amount} />
      </div>
      <div className="transactions-container">
        <h3>{dateRange}</h3>
        <div className="recent-transactions">
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
      <div className="add-transaction-container">
        <button
          type="button"
          className="add-transaction-button"
          onClick={() => navigate("add")}
        >
          Add Transaction
        </button>
      </div>
    </div>
  )
}
