import { useState } from "react"
import SearchBar from "~/Components/SearchBar"
import Select from "react-select"
import { HiOutlineFilter } from "react-icons/hi"
import transactionStyles from "~/styles/transactions.css"
import { BsCalendar2Date } from "react-icons/bs"
import Transaction from "~/Components/Transaction"
import { mockedTransactions } from "~/mocks/transactions"

export const links = () => [
  {
    rel: "stylesheet",
    href: transactionStyles,
  },
]

export default function Transactions() {
  const [transactionPage, setTransactionPage] = useState(1)
  const [filter, setFilter] = useState("all")
  const [start, setStart] = useState(new Date().toLocaleDateString("en-US"))
  const [end, setEnd] = useState(new Date().toLocaleDateString("en-US"))
  const [search, setSearch] = useState("")
  const options = [
    { value: "all", label: "All" },
    { value: "Education", label: "Education" },
    { value: "Tech", label: "Tech" },
    { value: "Salary", label: "Salary" },
  ]

  const handleFilter = (e) => {
    setFilter(e.value)
    console.log(e)
  }

  const filterTransactions = () => {
    if (filter === "all") {
      return mockedTransactions
    }
    return mockedTransactions.filter((transaction) => {
      return transaction.category === filter
    })
  }

  const transactionRange = () => {
    return filterTransactions().filter((transaction) => {
      return (
        new Date(transaction.createdAt) >= new Date(start) &&
        new Date(transaction.createdAt) <= new Date(end)
      )
    })
  }

  /* filter transation based on page number each page showing 5 transactions */
  const paginatedTransactions = () => {
    const start = (transactionPage - 1) * 5
    const end = start + 5
    return filterTransactions().slice(start, end)
  }

  function handleSelect(ranges) {
    const [startDate, endDate] = [ranges.selection]
    console.log(startDate, endDate)
    setStart(startDate)
    setEnd(endDate)
  }

  return (
    <div className="Transaction">
      <div className="Main_Content__Header">
        <h1 className="Main_Content__Text">Transaction History</h1>
      </div>
      <div className="Main_Content__Body">
        <SearchBar setSearch={setSearch} />
        <div className="Filter_Section">
          <span className="Filter_Content">
            <span className="Filter_Icon_container">
              {" "}
              <HiOutlineFilter className="Filter_Icon" />
            </span>
            <Select
              className="Filter_Select"
              options={options}
              onChange={handleFilter}
            />
            <span className="date-elements">
              <input
                className="date-picker"
                placeholder="from"
                type="text"
                name="from"
                value={start}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(e) =>
                  setStart(e.target.value.toLocalString("en-US"))
                }
              />
              <BsCalendar2Date className="calendar-icon" />
            </span>
            <span className="date-elements">
              <input
                className="date-picker"
                placeholder="to"
                type="text"
                name="to"
                value={end}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(e) => setEnd(e.target.value)}
              />
              <BsCalendar2Date className="calendar-icon" />
            </span>
          </span>
          <button className="SearchBar__Btn">Clear</button>
        </div>
        <div className="Transaction__Table">
          {filterTransactions().map((transaction) => (
            <Transaction
              category={transaction.category}
              amount={transaction.amount}
              date={transaction.createdAt}
              note={transaction.note}
              key={transaction.id}
            />
          ))}
          {console.log(filterTransactions())}
        </div>
      </div>
    </div>
  )
}
