import { useState, useEffect } from "react"
import FilterData from "~/components/transaction/FilterData"
import SearchFilter from "~/components/transaction/SearchFilter"
import TransactionItem from "~/components/TransactionItem"

function Transaction() {
  const [mockedTransactions, setMockedTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [perviousDate, setPerviousDate] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/mockedTransactions")
      .then((response) => response.json())
      .then((data) => setMockedTransactions(data))
  }, [])

  const clearSearch = () => setSearch("")

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
      <SearchFilter
        search={search}
        setSearch={setSearch}
        clearSearch={clearSearch}
      />
      <div className="transaction_history_filter_container">
        <FilterData
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          clearFilter={clearFilter}
          setCurrentDate={setCurrentDate}
          setPerviousDate={setPerviousDate}
          currentDate={currentDate}
          perviousDate={perviousDate}
        />
      </div>
      <div className="transaction_history">
        {filteredTransactions.map((transaction) => {
          if (
            perviousDate !== "" &&
            currentDate !== "" &&
            (transaction.createdAt < perviousDate ||
              transaction.createdAt > currentDate)
          ) {
            return null
          }
          return (
            <TransactionItem
              key={transaction.id}
              note={transaction.note}
              amount={transaction.amount}
              date={transaction.createdAt}
              category={transaction.category}
              type={transaction.type}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Transaction
