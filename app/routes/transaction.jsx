import { useState, useEffect } from "react"
import FilterData from "~/components/transaction/FilterData"
import SearchFilter from "~/components/transaction/SearchFilter"
import TransactionItem from "~/components/TransactionItem"

function Transaction() {
  const [mockedTransactions, setMockedTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState([])
  const [perviousDate, setPerviousDate] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

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

  const filteredTransactions = mockedTransactions
  .filter((transaction) =>
    transaction.note.toLowerCase().includes(search.toLowerCase()) ||
    transaction.amount.toString().includes(search) 
  )
  .filter((transaction) =>
    categoryFilter.length > 0 ? categoryFilter.some((f) => f === transaction.category) : true
  )
    .filter((transaction) =>
      perviousDate !== "" && currentDate !== ""
        ? transaction.createdAt >= perviousDate &&
          transaction.createdAt <= currentDate
        : true
    )

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  )

 
  return (
    <div className="transaction_history_container">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        clearSearch={clearSearch}
      />
      <div className="transaction_history_filter_container">
        <FilterData
          setCategoryFilter={setCategoryFilter}
          clearFilter={clearFilter}
          setCurrentDate={setCurrentDate}
          setPerviousDate={setPerviousDate}
          currentDate={currentDate}
          perviousDate={perviousDate}
        />
      </div>
      <div className="transaction_history">
        {paginatedTransactions.map((transaction) => (
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
      <div className="pagination_container">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {" < "}
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredTransactions.length / 5)}
        >
           {" > "}
        </button>
      </div>
    </div>
  )
}

export default Transaction
