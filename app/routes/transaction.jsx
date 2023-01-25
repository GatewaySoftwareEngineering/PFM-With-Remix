import { useState, useEffect } from "react"
import TransactionItem from "~/components/TransactionItem"

function Transaction() {
  const [mockedTransactions, setMockedTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [perviousDate, setPerviousDate] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/mockedTransactions")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setMockedTransactions(data)
      })
  }, [])

  const clearSearch = () => {
    setSearch("")
  }

  const clearFilter = () => {
    setCategoryFilter("")
    setPerviousDate("")
    setCurrentDate("")
  }

  const filteredTransactions = mockedTransactions.filter((transaction) => {
    return (
      transaction.note.toLowerCase().includes(search.toLowerCase()) &&
      transaction.category.toLowerCase().includes(categoryFilter.toLowerCase())
    )
  })

  return (
    <div className="transaction_history_container">
      <div className="transaction_history_search">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={clearSearch}>Clear</button>
      </div>
      <div className="transaction_history_filter_container">
        <div className="transaction_history_filter">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="SALARY">Salary</option>
            <option value="EDUCATION">Education</option>
            <option value="LOAN">Loan</option>
          </select>
          <div className="transaction_history_filter_date">
            <input
              type="date"
              value={perviousDate}
              placeholder="From"
              onChange={(e) => setPerviousDate(e.target.value)}
            />
            <input
              type="date"
              value={currentDate}
              placeholder="To"
              onChange={(e) => setCurrentDate(e.target.value)}
            />
          </div>
          <button onClick={clearFilter}>Clear</button>
        </div>
      </div>
      <div className="transaction_history">
        {perviousDate !== "" && currentDate !== ""
          ? filteredTransactions.map((transaction) => {
              return transaction.createdAt >= perviousDate &&
                transaction.createdAt <= currentDate ? (
                <TransactionItem
                  key={transaction.id}
                  note={transaction.note}
                  amount={transaction.amount}
                  date={transaction.createdAt}
                  category={transaction.category}
                  type={transaction.type}
                />
              ) : null
            })
          : filteredTransactions.map((transaction) => (
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
  )
}

export default Transaction
