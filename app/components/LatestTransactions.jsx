import { useLoaderData } from "@remix-run/react"
import Transaction from "./Transaction"
import { getLatestTransactions, title } from "~/utils/getLatestTransactions"
export default function LatestTransactions() {
  const data = useLoaderData()

  const latestTransactions = getLatestTransactions(data.transactions)
  const transactionsArray = latestTransactions.map((transaction) => (
    <Transaction
      key={transaction.id}
      category={transaction.category}
      note={transaction.note}
      date={transaction.date}
      amount={transaction.amount}
      type={transaction.type}
    />
  ))
  return (
    <section className="latest-transactions">
      <h3 className="title">{title}</h3>
      <div className="container">{transactionsArray}</div>
      <button className="add-transaction">Add Transaction</button>
    </section>
  )
}
