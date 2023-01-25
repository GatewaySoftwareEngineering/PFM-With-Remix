import { useState, useEffect } from "react"
import Card from "~/components/Card"
import CardDeatails from "~/data/CardDeatails"
import TransactionItem from "~/components/TransactionItem"
import PopUps from "~/components/PopUps"
import AddTransaction from "~/components/AddTransaction"
import FormTransaction from "~/components/overview/FormTransaction"

export default function Index() {
  const [mockedTransactions, setMockedTransactions] = useState([])
  const [istransactions, setIsTransactions] = useState(false)

  const handleOpen = () => {
    setIsTransactions(true)
  }

  const handleCancel = () => {
    setIsTransactions(false)
  }

  useEffect(() => {
    fetch('http://localhost:8000/mockedTransactions')
    .then(response => {return response.json()})
    .then(data => {
      setMockedTransactions(data)
    }
    )  
  }, [])
  return (
    <div className="overview-page">
      {istransactions && (
        <PopUps handleCancel={handleCancel} title="Add Transaction">
          <FormTransaction handleCancel={handleCancel} />
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
      <div className="overview_transaction_container">
        <h2>This Week</h2>
        <div className="overview_transaction_data">
        {mockedTransactions.map((transaction) => (
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
