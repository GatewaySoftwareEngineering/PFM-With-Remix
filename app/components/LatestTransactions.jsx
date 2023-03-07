import { useLoaderData } from "@remix-run/react"
import Transaction from "./Transaction"
import { getLatestTransactions, title } from "~/utils/getLatestTransactions"
import propTypes from "prop-types"
export default function LatestTransactions({ onModalOpenClick }) {
  const data = useLoaderData()

  const latestTransactions = getLatestTransactions(data.transactions)
  const transactionsArray = latestTransactions.map((transaction) => (
    <Transaction
      key={transaction.id}
      category={transaction.category}
      note={transaction.note}
      date={transaction.date}
      amount={parseInt(transaction.amount, 10)}
      type={transaction.type}
    />
  ))
  return (
    <section className="latest-transactions">
      <div className="wrapper">
        <h3 className="title">{title}</h3>
        <button className="add-transaction" onClick={onModalOpenClick}>
          Add Transaction
        </button>
      </div>
      <div className="container">{transactionsArray}</div>
    </section>
  )
}

LatestTransactions.propTypes = {
  onModalOpenClick: propTypes.func.isRequired,
}
