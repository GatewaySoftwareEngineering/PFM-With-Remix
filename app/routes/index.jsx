import React from 'react'
import { displayRelativeDate } from '~/helpers/displayRelativeDate'
import { filterByRelativeTime } from '~/helpers/filterByRelativeTime'
import { getTransactions } from '~/models/transaction'

const overviewCards = (transactions) => [
  {
    title: 'Income',
    value: filterByRelativeTime(transactions, 'month').reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') return acc + transaction.amount
        else return acc
      },
      0
    ),
    variant: 'info',
  },
  {
    title: 'Balance',
    value: transactions.reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0),
    variant: 'neutral',
  },
  {
    title: 'Expense',
    value: filterByRelativeTime(transactions, 'month').reduce(
      (acc, transaction) => {
        if (transaction.type === 'expense') return acc + transaction.amount
        else return acc
      },
      0
    ),
    variant: 'error',
  },
]

export default function Index() {
  const [transactions, setTransactions] = React.useState([])

  React.useEffect(() => {
    setTransactions(getTransactions())
  }, [])

  return (
    <div className="main-section">
      <div className="overview-cards-container">
        {overviewCards(transactions).map((card, i) => (
          <div
            key={i}
            className={`overview-card ${card.variant} ${card.variant}-gradient`}
          >
            <div>
              <h5>{card.title}</h5>
              <h1 className="dollar">{card.value}</h1>
            </div>
            <button className={card.variant}>Details</button>
          </div>
        ))}
      </div>

      <div className="transactions-section">
        <h4>This Week</h4>

        <div className="transactions-list">
          {transactions.map((transaction, i) => (
            <div key={i} className="transaction-card">
              <div>
                <div className="transaction-card-icon"></div>
                <p className="transaction-note">{transaction.note}</p>
              </div>

              <div>
                <p>{displayRelativeDate(transaction.date)}</p>
                <div className="transaction-amount-chip">
                  <p className="dollar">{transaction.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
