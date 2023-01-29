import React, { useEffect } from 'react'
import TransactionsList from '~/components/TransactionsList'
import { filterTransactions } from '~/helpers/filterTransactions'
import { categories, getTransactions } from '~/models/transaction'

export const links = () => [
  {
    rel: 'preload',
    href: '/assets/icons/search.svg',
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: '/assets/icons/filter.svg',
    as: 'image',
    type: 'image/svg+xml',
  },
]

export default function TransactionHistory() {
  const [transactions, setTransactions] = React.useState([])
  const [filteredTransactions, setFilteredTransactions] = React.useState([])

  const limit = 10
  const [page, setPage] = React.useState(0)
  const [search, setSearch] = React.useState('') // search by note or amount
  const [filters, setFilters] = React.useState({
    categories: [],
    from: '',
    to: '',
  })

  React.useEffect(() => {
    const allTransactions = getTransactions()
    setTransactions(allTransactions)
    setFilteredTransactions(allTransactions)
  }, [])

  useEffect(() => {
    const { categories, from, to } = filters

    if (transactions.length > 0) {
      setFilteredTransactions(
        filterTransactions(transactions, { search, categories, from, to })
      )
    }
  }, [search, filters])

  const pages = Math.ceil(filteredTransactions.length / limit)

  return (
    <div className="main-section">
      <div className="transactions-section">
        <div className="bar search-bar">
          <div>
            <img src="/assets/icons/search.svg" alt="search" />

            <input
              type="text"
              name="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button onClick={() => setSearch('')}>Clear</button>
        </div>

        <div className="bar filter-bar">
          <div>
            <img src="/assets/icons/filter.svg" alt="filter" />

            <div className="filter-bar-input-container">
              <select
                name="category"
                id="category-input"
                placeholder="Categories"
              >
                <option value="" defaultChecked>
                  Categories
                </option>
                {[...categories.income, ...categories.expense].map(
                  (category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>

              <input
                type="text"
                id="from-input"
                name="from"
                max={new Date().toLocaleDateString('en-ca')}
                placeholder="From"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = 'text'
                }}
              />

              <input
                type="text"
                id="to-input"
                name="to"
                max={new Date().toLocaleDateString('en-ca')}
                placeholder="To"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = 'text'
                }}
              />
            </div>
          </div>

          <button
            onClick={() => {
              setFilters({
                categories: [],
                from: '',
                to: '',
              })
            }}
          >
            Clear
          </button>
        </div>

        <TransactionsList transactions={filteredTransactions} />

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
