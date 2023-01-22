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
  const { transactionPage, setTransactionPage } = useState(1)
  const { filter, setFilter } = useState("all")
  const { start, setStart } = useState(
    new Date("Sun Jan 01 2023 00:00:00 GMT+0300 (Arabian Standard Time)")
  )
  const { end, setEnd } = useState(
    new Date("Sun Jan 19 2023 00:00:00 GMT+0300 (Arabian Standard Time)")
  )
  const options = [
    { value: "all", label: "All" },
    { value: "food", label: "Food" },
    { value: "transport", label: "Transport" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "others", label: "Others" },
  ]

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
        <SearchBar />
        <div className="Filter_Section">
          <span className="Filter_Content">
            <span className="Filter_Icon_container">
              {" "}
              <HiOutlineFilter className="Filter_Icon" />
            </span>
            <Select
              className="Filter_Select"
              selected={filter}
              options={options}
              onChange={(e) => setFilter(e.value)}
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
                onChange={(e) => setStart(e.target.value)}
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
          {mockedTransactions.map((transaction) => (
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
