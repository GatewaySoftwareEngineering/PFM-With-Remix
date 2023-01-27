import { useState } from "react"
import styleUrl from "../styles/transactions.css"
import transactionStyleUrl from "~/styles/transaction.css"
import Transaction from "~/components/transaction"
import { CATEGORIES as categories } from "~/utils/constants"
export let links = () => [
  { rel: "stylesheet", href: styleUrl },
]

export const meta = () => {
  return {
    title: "Transaction History",
    description: "View all your transactions",
  }
}
export default function Transactions() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  return (
    <div className="transcation-history">
      <Form method="get" action="/transactions" className="filter-bar">
        <div className="filter-inputs">
          <div className="filter-icon">
            <img src="assets/images/icons/filter.svg" alt="filter" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            autoComplete="off"
          />

          <select
            name="category"
            id="category"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="from-date"
            id="from-date"
            max={toDate || new Date().toISOString().split("T")[0]}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            name="to-date"
            id="to-date"
            min={fromDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
          <button type="button" className="clear-button" onClick={clearFilters}>
            Clear
          </button>
      </Form>
      <div className="transaction-list">
      </div>
    </div>
  )
}
