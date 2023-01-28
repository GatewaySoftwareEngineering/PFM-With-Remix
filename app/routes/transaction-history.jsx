import { Form } from '@remix-run/react'
import React from 'react'
import TransactionsList from '~/components/TransactionsList'
import { getTransactions } from '~/models/transaction'

export default function TransactionHistory() {
  const [transactions, setTransactions] = React.useState([])

  const [page, setPage] = React.useState(0)
  const limit = 10

  React.useEffect(() => {
    setTransactions(getTransactions())
  }, [])

  const pages = Math.ceil(transactions.length / limit)

  return (
    <div className="main-section">
      <div className="transactions-section">
        <Form method="get">
          <div className="search-bar">
            <input type="text" name="search" placeholder="Search" />
          </div>

          <div className="filter-bar"></div>
        </Form>

        <TransactionsList transactions={transactions} />

        <div className="pagination">
          <button
            className={page === 0 ? 'nav-button-disabled' : ''}
            onClick={() => {
              if (page === 0) return
              setPage((i) => i - 1)
            }}
          >
            {'<'}
          </button>
          <ul>
            {Array.from({ length: pages }, (_, i) => (
              <li key={i}>
                <button
                  className={
                    i === page ? 'nav-button-active' : 'nav-button-inactive'
                  }
                  onClick={() => setPage(i)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
          <button
            className={page + 1 === pages ? 'nav-button-disabled' : ''}
            onClick={() => {
              if (page + 1 === pages) return
              setPage((i) => i + 1)
            }}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
