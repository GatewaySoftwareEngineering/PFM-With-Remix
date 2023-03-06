import { json } from "@remix-run/node"

import Filter from "~/components/Filter"
import SearchBar from "~/components/SearchBar"
import Topbar from "~/components/Topbar"
import TransactionsList from "~/components/TransactionsList"
import { db } from "~/utils/db.server"

export const loader = async () => {
  const transactions = await db.transactions.findMany()
  return json({ transactions })
}

export default function Transactions() {
  return (
    <div id="transactions-page">
      <Topbar title="Transaction History" />
      <SearchBar />
      <Filter />
      <TransactionsList />
    </div>
  )
}
