import { useReducer, useState, useEffect, useCallback } from "react"
import { HiOutlineFilter } from "react-icons/hi"
import { BsCalendar2Date } from "react-icons/bs"
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
  // sort by date function useCallback
  const sortByDate = useCallback((transactions) => {
    const sortedTransactions = transactions.sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateB - dateA
    })
    return sortedTransactions
  }, [])

  const [date, setDate] = useState({ start: "", end: "" })
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
      updateEvent({ transactions: newTransactions })
      return
    } else {
      const filteredTransactions = newTransactions.filter(
        (transaction) => transaction.category === category
      )
      updateEvent({ transactions: filteredTransactions })
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
              <BsCalendar2Date className="calendar-icon" />
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
              <BsCalendar2Date className="calendar-icon" />
            </span>
          </div>
          <button className="SearchBar__Btn" onClick={ResetFilters}>
            Clear
          </button>
        </div>
        <div className="Transaction__Table">
          {event.transactions.map((transaction) => (
            <Transaction
              category={transaction.category}
              amount={transaction.amount}
              date={transaction.createdAt}
              note={transaction.note}
              key={transaction.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
