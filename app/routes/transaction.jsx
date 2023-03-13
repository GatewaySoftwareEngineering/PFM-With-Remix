import { useState } from "react"
import { useLoaderData } from "@remix-run/react"
import FilterData from "~/components/filterTransaction/FilterData"
import SearchFilter from "~/components/filterTransaction/SearchFilter"
import TransactionList from "~/components/transaction/TransactionList"

export const loader = async () => {
  const res = await fetch(" http://localhost:8000/mockedTransactions", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  const data = await res.json()
  return data
}

function Transaction() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState([])
  const [perviousDate, setPerviousDate] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const mockedTransactions = useLoaderData()

  const clearSearch = () => setSearch("")

  const clearFilter = () => {
    setPerviousDate("")
    setCurrentDate("")
    setCategoryFilter([])
  }

  const filterTransactions = (transactions) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.note.toLowerCase().includes(search.toLowerCase()) ||
          transaction.amount.toString().includes(search)
      )
      .filter((transaction) =>
        categoryFilter.length > 0
          ? categoryFilter.some((f) => f === transaction.category)
          : true
      )
      .filter((transaction) =>
        perviousDate !== "" && currentDate !== ""
          ? transaction.createdAt >= perviousDate &&
            transaction.createdAt <= currentDate
          : true
      )
  }

  const filteredTransactions = filterTransactions(mockedTransactions)
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
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          clearFilter={clearFilter}
          setCurrentDate={setCurrentDate}
          setPerviousDate={setPerviousDate}
          currentDate={currentDate}
          perviousDate={perviousDate}
        />
      </div>
      <TransactionList
        showntransactions={paginatedTransactions}
        className="transaction_history"
      />
      <div className="pagination_container">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {" < "}
        </button>
        <span
          className={currentPage === 1 ? "active" : ""}
          onClick={() => setCurrentPage(1)}
        >
          1
        </span>
        {
          // eslint-disable-next-line array-callback-return
          filteredTransactions.map((transaction, index) => {
            if (index % 5 === 0 && index !== 0) {
              return (
                <span
                  key={index}
                  className={
                    currentPage === Math.ceil(index / 5) + 1 ? "active" : ""
                  }
                  onClick={() => setCurrentPage(Math.ceil(index / 5) + 1)}
                >
                  {Math.ceil(index / 5) + 1}
                </span>
              )
            }
          })
        }
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
