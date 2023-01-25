import { useState, useEffect } from "react"
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

export default function Index() {
  const [mockedTransactions, setMockedTransactions] = useState([])
  const [istransactions, setIsTransactions] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [title, setTitle] = useState("")

  const handleOpen = () => {
    setIsTransactions(true)
  }

  const handleCancel = () => {
    setIsTransactions(false)
  }

  useEffect(() => {
    fetch("http://localhost:8000/mockedTransactions")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setMockedTransactions(data)
        const weekTransactions = getLastWeekTransactions(data)
        if (weekTransactions.length > 0) {
          setTransactions(weekTransactions)
          setTitle("This Week")
        } else {
          const monthTransactions = getLastMonthTransactions(data)
          if (monthTransactions.length > 0) {
            setTransactions(monthTransactions)
            setTitle("This Month")
          } else {
            const yearTransactions = getLastYearTransactions(data)
            if (yearTransactions.length > 0) {
              setTransactions(yearTransactions)
              setTitle("This Year")
            } else {
              setTransactions(data)
              setTitle("total 10")
            }
          }
        }
      })
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
        <h2>{title}</h2>
        <div className="overview_transaction_data">
          {transactions.slice(0, 10).map((transaction) => (
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
