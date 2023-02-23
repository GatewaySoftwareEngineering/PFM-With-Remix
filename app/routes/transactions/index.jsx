import { useReducer, useState, useEffect, useCallback } from "react"
import { HiOutlineFilter } from "react-icons/hi"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import SearchBar from "~/Components/SearchBar"
import Transaction from "~/Components/Transaction"
import transactionStyles from "~/styles/transactions.css"
import { mockedTransactions } from "~/mocks/transactions"
import Dropdown from "~/Components/dropdown"

export const links = () => [
  {
    rel: "stylesheet",
    href: transactionStyles,
  },
]

export default function Transactions() {
  const options = [
    { value: "Tech", label: "Tech" },
    { value: "Food", label: "Food" },
    { value: "Bills", label: "Bills" },
    { value: "Sports", label: "Sports" },
    { value: "Health", label: "Health" },
    { value: "Cloths", label: "Cloths" },
    { value: "Loan", label: "Loan" },
    { value: "Salary", label: "Salary" },
    { value: "Gift", label: "Gift" },
  ]

  const sortByDate = useCallback(
    (transactions) =>
      transactions.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    []
  )

  const [date, setDate] = useState({ start: "", end: "" })
  const [category, setCategory] = useState([])
  const [search, setSearch] = useState("")

  const [pageTransaction, setPageTransaction] = useState([])
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      return { ...prev, ...next }
    },
    {
      transactions: sortByDate(mockedTransactions),
      filteredTransactions: [],
      transactionPage: 1,
      dateFilter: false,
    }
  )

  useEffect(() => {
    const { transactions } = event
    const { start, end } = date
    let filteredTransactions = transactions
    if (search !== "") {
      // filter by search, use notes and amount within
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const { note, amount } = transaction
        return (
          note.toLowerCase().includes(search.toLowerCase()) ||
          amount.toString().includes(search)
        )
      })
    }
    if (category.length !== 0) {
      // filter by category
      filteredTransactions = filteredTransactions.filter((transaction) => {
        return category.includes(transaction.category)
      })
    }
    if (start !== "" && end !== "") {
      // filter by date
      const startDate = new Date(start)
      const endDate = new Date(end)
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt)
        return transactionDate >= startDate && transactionDate <= endDate
      })
    }
    if (filteredTransactions.length === 0) {
      updateEvent({ filteredTransactions: transactions, transactionPage: 1 })
    } else {
      updateEvent({
        filteredTransactions: filteredTransactions,
        transactionPage: 1,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, date])

  useEffect(() => {
    const { filteredTransactions, transactionPage } = event
    const start = (transactionPage - 1) * 10
    const end = start + 10
    setPageTransaction(filteredTransactions.slice(start, end))
  }, [event])

  const ResetFilters = () => {
    setDate({ start: "", end: "" })
  }

  const clearSearch = () => {
    setSearch("")
  }

  const handlePagination = (button) => {
    if (button === "decrease" && event.transactionPage !== 1) {
      updateEvent({ transactionPage: event.transactionPage - 1 })
    } else if (
      button === "increase" &&
      event.transactionPage !==
        Math.ceil(event.filteredTransactions.length / 10)
    ) {
      updateEvent({ transactionPage: event.transactionPage + 1 })
    }
  }

  return (
    <div className="Transaction">
      <div className="Main_Content__Header">
        <h1 className="Main_Content__Text">Transaction History</h1>
      </div>
      <div className="Main_Content__Body">
        <SearchBar setSearch={setSearch} clearSearch={clearSearch} />
        <div className="Filter_Section">
          <div className="Filter_Content">
            <div className="Filter_Icon_container">
              {" "}
              <HiOutlineFilter className="Filter_Icon" />
            </div>
            <div className="custom-select">
              <Dropdown
                options={options}
                setCategory={setCategory}
                isMulti={true}
              />
            </div>

            <div className="date-elements">
              <input
                className="date-picker"
                placeholder="From"
                type="text"
                name="start"
                value={date.start}
                onChange={(e) => {
                  setDate({ ...date, start: e.target.value })
                }}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <span className="date-elements">
              <input
                className="date-picker"
                placeholder="To"
                type="text"
                name="end"
                value={date.end}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(e) => {
                  setDate({ ...date, end: e.target.value })
                }}
              />
            </span>
          </div>
          <button className="SearchBar__Btn" onClick={ResetFilters}>
            Clear
          </button>
        </div>
        <div className="Transaction__Table">
          {pageTransaction.map((transaction) => (
            <Transaction
              category={transaction.category}
              amount={transaction.amount}
              date={transaction.createdAt}
              note={transaction.note}
              key={transaction.id}
            />
          ))}
          <div className="Pagination">
            <button
              className="Pagination__Btn"
              onClick={() => handlePagination("decrease")}
            >
              <FiChevronLeft
                className={`${
                  event.transactionPage !== 1
                    ? "Pagination__Btn_Icon_active"
                    : "Pagination__Btn_Icon"
                }`}
                size={40}
              />
            </button>
            {event.filteredTransactions.map((transaction, index) => {
              if (index % 10 === 0) {
                return (
                  <button
                    className={`${event.transactionPage === (index /10 +1)? "Pagination__Btn__Number_active" : "Pagination__Btn__Number_inactive"}`}
                    key={index}
                    onClick={() =>
                      updateEvent({ transactionPage: index / 10 + 1 })
                    }
                  >
                    <span >
                      {index / 10 + 1}
                    </span>
                  </button>
                )
              } else {
                return null
              }
            })}
            <button
              className="Pagination__Btn"
              onClick={() => handlePagination("increase")}
            >
              <FiChevronRight
                className={`${
                  event.transactionPage ===
                  Math.ceil(event.filteredTransactions.length / 10)
                    ? "Pagination__Btn_Icon"
                    : "Pagination__Btn_Icon_active"
                }`}
                size={40}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
