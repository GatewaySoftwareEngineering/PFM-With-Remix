import { useReducer, useState, useEffect, useCallback } from "react"
import { HiOutlineFilter } from "react-icons/hi"
import SearchBar from "~/Components/SearchBar"
import Transaction from "~/Components/Transaction"

import transactionStyles from "~/styles/transactions.css"
import { mockedTransactions } from "~/mocks/transactions"

export const links = () => [
  {
    rel: "stylesheet",
    href: transactionStyles,
  },
]

export default function Transactions() {
  const sortByDate = useCallback((transactions) => {
    const sortedTransactions = transactions.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    return sortedTransactions
  }, [])

  const [date, setDate] = useState({ start: "", end: "" })
  const [pageTransaction, setPageTransaction] = useState([])
  const [event, updateEvent] = useReducer(
    (prev, next) => {
      return { ...prev, ...next }
    },
    {
      transactions: sortByDate(mockedTransactions),
      transactionPage: 1,
      dateFilter: false,
    }
  )

  useEffect(() => {
    if (event.transactions.length > 10) {
      setPageTransaction(
        event.transactions.slice(
          (event.transactionPage - 1) * 10,
          (event.transactionPage * 10)
        )
      )
    } else {
      setPageTransaction(event.transactions)
    }
  }, [event.transactionPage, event.transactions])

  const options = [
    { id: 1, value: "all", label: "All" },
    { id: 2, value: "Education", label: "Education" },
    { id: 3, value: "Tech", label: "Tech" },
    { id: 4, value: "Salary", label: "Salary" },
  ]

  const handleCategoryFilter = async (e) => {
    const { value } = e.target
    filterByCategory(value)
  }

  const filterByCategory = (category) => {
    const newTransactions = sortByDate(mockedTransactions)
    if (category === "all") {
      updateEvent({ transactions: newTransactions, transactionPage: 1 })
    } else {
      const filteredTransactions = newTransactions.filter(
        (transaction) => transaction.category === category
      )
      updateEvent({ transactions: filteredTransactions, transactionPage: 1 })
    }
  }

  const handleDateFilter = (e) => {
    const { name, value } = e.target
    setDate((prevState) => ({ ...prevState, [name]: value }))
  }

  const transactionRange = useCallback(() => {
    const { start, end } = date
    const { transactions } = event
    if (start === "" || end === "") {
      return
    } else {
      const startDate = new Date(start)
      const endDate = new Date(end)
      const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt)
        return transactionDate >= startDate && transactionDate <= endDate
      })
      updateEvent({ transactions: filteredTransactions })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  useEffect(() => {
    if (date.start && date.end) {
      transactionRange()
    }
  }, [date, transactionRange])

  const ResetFilters = () => {
    setDate({ start: "", end: "" })
    updateEvent({ transactions: sortByDate(mockedTransactions) })
  }

  return (
    <div className="Transaction">
      <div className="Main_Content__Header">
        <h1 className="Main_Content__Text">Transaction History</h1>
      </div>
      <div className="Main_Content__Body">
        <SearchBar setSearch={function setSearch() {}} />
        <div className="Filter_Section">
          <div className="Filter_Content">
            <div className="Filter_Icon_container">
              {" "}
              <HiOutlineFilter className="Filter_Icon" />
            </div>
            <div className="custom-select">
              <select
                className="Filter_Select"
                onChange={handleCategoryFilter}
                defaultValue={options[0].value}
              >
                {options.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="date-elements">
              <input
                className="date-picker"
                placeholder="from"
                type="date"
                name="start"
                value={date.start}
                onChange={handleDateFilter}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <span className="date-elements">
              <input
                className="date-picker"
                placeholder="to"
                type="date"
                name="end"
                value={date.end}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleDateFilter}
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
        </div>
        <div className="Pagination">
          <button className="Pagination__Btn">
            <span className="Pagination__Btn__Text">{"<"}</span>
          </button>
          {console.log(
            event.transactions.length,
            event.transactionPage,
            pageTransaction,
            event.transactionPage,
            (event.transactionPage - 1) * 10,
            (event.transactionPage * 10) - 1
          )}
          {event.transactions.length > 10 && (
            <>
              {event.transactions.map((transaction, index) => {
                if (index % 10 === 0) {
                  return (
                    <button
                      className="Pagination__Btn"
                      key={index}
                      onClick={() =>
                        updateEvent({ transactionPage: index / 10 + 1 })
                      }
                    >
                      <span className="Pagination__Btn__Text">
                        {index / 10 + 1}
                      </span>
                    </button>
                  )
                } else {
                  return null
                }
              })}
            </>
          )}
          <button className="Pagination__Btn">
            <span className="Pagination__Btn__Text">{">"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
