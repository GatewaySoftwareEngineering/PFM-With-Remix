import { useState } from "react"
import Card from "~/components/Card"
import CardDeatails from "~/data/CardDeatails"
import TransactionItem from "~/components/TransactionItem"
import PopUps from "~/components/PopUps"
import AddTransaction from "~/components/AddTransaction"
import FormTransaction from "~/components/overview/FormTransaction"
import {
  getLastWeekTransactions,
  getLastMonthTransactions,
  getLastYearTransactions,
} from "~/utils/transactions"
import { useLoaderData } from "@remix-run/react"

export const loader = async () => {
  const res = await fetch(" http://localhost:8000/mockedTransactions", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  const data = await res.json()
  return data
}

export default function Index() {
  const [istransactions, setIsTransactions] = useState(false)
  const transactions = useLoaderData()

  const handleOpen = () => {
    setIsTransactions(true)
  }

  const handleCancel = () => {
    setIsTransactions(false)
  }

  const thisWeekTransactions = getLastWeekTransactions(transactions)
  const thisMonthTransactions = getLastMonthTransactions(transactions)
  const thisYearTransactions = getLastYearTransactions(transactions)
  let showntransactions = []
  let shownTitle = ""

  if (thisWeekTransactions.length > 0) {
    showntransactions = thisWeekTransactions.slice(0, 10)
    shownTitle = "This Week"
  } else if (thisMonthTransactions.length > 0) {
    showntransactions = thisMonthTransactions.slice(0, 10)
    shownTitle = "This Month"
  } else if (thisYearTransactions.length > 0) {
    showntransactions = thisYearTransactions.slice(0, 10)
    shownTitle = "This Year"
  } else {
    showntransactions = transactions.slice(0, 10)
    shownTitle = "All Transactions"
  }

  return (
    <div className="overview-page">
      {istransactions && (
        <PopUps handleCancel={handleCancel} title="Add Transaction">
          <FormTransaction
            handleCancel={handleCancel}
            setIsTransactions={setIsTransactions}
          />
        </PopUps>
      )}
      {istransactions && (
        <div className="shadow" onClick={handleCancel} aria-hidden />
      )}
      <div className="card_row">
        {CardDeatails.map((card) => (
          <Card
            key={card.title}
            className={card.className}
            title={card.title}
            mockedTransactions={transactions}
          />
        ))}
      </div>
      <div className="overview_transaction_container">
        <h2>{shownTitle}</h2>
        <div className="overview_transaction_data">
          {showntransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              note={transaction.note}
              amount={transaction.amount}
              date={transaction.createdAt}
              category={transaction.category}
              type={transaction.type}
            />
          ))}
        </div>
      </div>
      <div className="transaction">
        <AddTransaction
          handleTransaction={handleOpen}
          className="transaction_btn"
        />
      </div>
    </div>
  )
}
