import { useState } from "react"
import Card from "~/components/Card"
import CardDeatails from "~/data/CardDeatails"
import { mockedTransactions } from "~/mocks/transactions"
import TransactionItem from "~/components/TransactionItem"
import PopUps from "~/components/PopUps"
import AddTransaction from "~/components/AddTransaction"
import FormTransaction from "~/components/overview/FormTransaction"

export default function Index() {
  const [istransactions, setIsTransactions] = useState(true)

  const handleOpen = () => {
    setIsTransactions(true)
  }

  const handleCancel = () => {
    setIsTransactions(false)
  }
  return (
    <div className="overview-page">
      {istransactions && (
        <PopUps handleCancel={handleCancel} title="Add Transaction">
          <FormTransaction />
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
            mockedTransactions={mockedTransactions}
          />
        ))}
      </div>
      <div className="overview_transaction_data">
        <h2>This Week</h2>
        {mockedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            note={transaction.note}
            amount={transaction.amount}
            date={transaction.createdAt}
            category={transaction.category}
          />
        ))}
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
