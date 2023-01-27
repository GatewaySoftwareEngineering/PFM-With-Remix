import {
  Form,
  useLoaderData,
  useSearchParams,
  useNavigate,
} from "@remix-run/react"
import { useState } from "react"
import styleUrl from "../styles/transactions.css"
import transactionStyleUrl from "~/styles/transaction.css"
import Transaction from "~/components/transaction"
import { CATEGORIES as categories } from "~/utils/constants"
import {
  getFilteredTransactions,
  getTransactionsCount,
} from "~/utils/transactions.server"

const PER_PAGE = 10

export let links = () => [
  { rel: "stylesheet", href: styleUrl },
  { rel: "stylesheet", href: transactionStyleUrl },
]

export const meta = () => {
  return {
    title: "Transaction History",
    description: "View all your transactions",
  }
}

export let loader = async ({ request }) => {
  const url = new URL(request.url)
  const search = url.searchParams.get("search")
  const category = url.searchParams.get("category")
  const fromDate = url.searchParams.get("from-date")
  const toDate = url.searchParams.get("to-date")
  let searchFilters = {}

  if (search) {
    searchFilters = {
      note: {
        contains: search,
      },
    }
  }

  if (category) {
    searchFilters = {
      ...searchFilters,
      category: {
        contains: category,
      },
    }
  }

  if (fromDate) {
    searchFilters = {
      ...searchFilters,
      date: {
        gte: new Date(fromDate).toISOString(),
      },
    }
  }

  if (toDate) {
    searchFilters = {
      ...searchFilters,
      date: {
        ...searchFilters.date,
        lte: new Date(toDate).toISOString(),
      },
    }
  }

  const transactions = await getFilteredTransactions(searchFilters)
  return {
    transactions,
  }
}
export default function Transactions() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { transactions } = useLoaderData()

  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const clearFilters = () => {
    searchParams.delete("search")
    searchParams.delete("category")
    searchParams.delete("from-date")
    searchParams.delete("to-date")
    navigate("/transactions")
  }

  const allCategories = categories.expense.concat(categories.income)

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
            defaultValue={searchParams.get("search")}
          />

          <select
            name="category"
            id="category"
            defaultValue={searchParams.get("category")}
          >
            <option value="">All</option>
            {allCategories.map((category) => (
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
            defaultValue={searchParams.get("from-date")}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            name="to-date"
            id="to-date"
            min={fromDate}
            max={new Date().toISOString().split("T")[0]}
            defaultValue={searchParams.get("to-date")}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
        {searchParams.toString() && (
          <button type="button" className="clear-button" onClick={clearFilters}>
            Clear
          </button>
        )}
      </Form>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  )
}
