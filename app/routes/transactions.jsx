import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"

import Filter from "~/components/Filter"
import SearchBar from "~/components/SearchBar"
import Topbar from "~/components/Topbar"
import TransactionsList from "~/components/TransactionsList"
import useDebounce from "~/hooks/useDebounce"
import { db } from "~/utils/db.server"
import { filter } from "~/utils/filter"
import { getDateObj } from "~/utils/formatDate"
import { search } from "~/utils/search"

export const loader = async () => {
  const transactions = await db.transactions.findMany({
    orderBy: { date: "asc" },
  })
  return json({ transactions })
}

export const meta = () => ({
  title: "Finance Manager | Transactions History",
})

export default function Transactions() {
  const { transactions } = useLoaderData()

  const [selectedCategories, setSelectedCategories] = useState([])
  const [startDate, setStartDate] = useState(
    getDateObj(transactions[0]?.date || new Date())
  )
  const [endDate, setEndDate] = useState(new Date())

  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const searchedTransactions = search(transactions, debouncedSearchTerm)

  const filteredTransactions = filter(
    searchedTransactions,
    selectedCategories,
    startDate,
    endDate
  )

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected)
  }

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  const handleClearClick = () => {
    setSelectedCategories([])
    setStartDate(getDateObj(transactions[0]?.date || new Date()))
    setEndDate(new Date())
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchClearClick = () => {
    setSearchTerm("")
  }
  return (
    <div id="transactions-page">
      <Topbar title="Transaction History" />
      <SearchBar
        search={searchTerm}
        onSearchChange={handleSearchChange}
        onClearClick={handleSearchClearClick}
      />
      <Filter
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        startDate={startDate}
        onStartDateChange={handleStartDateChange}
        endDate={endDate}
        onEndDateChange={handleEndDateChange}
        onClearClick={handleClearClick}
      />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  )
}
