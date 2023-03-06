import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"

import Filter from "~/components/Filter"
import SearchBar from "~/components/SearchBar"
import Topbar from "~/components/Topbar"
import TransactionsList from "~/components/TransactionsList"
import { db } from "~/utils/db.server"
import { filter } from "~/utils/filter"
import { getDateObj } from "~/utils/formatDate"

export const loader = async () => {
  const transactions = await db.transactions.findMany({
    orderBy: { date: "asc" },
  })
  return json({ transactions })
}

export default function Transactions() {
  const { transactions } = useLoaderData()

  const [selectedCategories, setSelectedCategories] = useState([])
  const [startDate, setStartDate] = useState(getDateObj(transactions[0].date))
  const [endDate, setEndDate] = useState(new Date())

  const filteredTransactions = filter(
    transactions,
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
    setStartDate(new Date())
    setEndDate(new Date())
  }
  return (
    <div id="transactions-page">
      <Topbar title="Transaction History" />
      <SearchBar />
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
