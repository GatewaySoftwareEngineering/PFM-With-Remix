import Filter from "~/components/Filter"
import SearchBar from "~/components/SearchBar"
import Topbar from "~/components/Topbar"
import TransactionsList from "~/components/TransactionsList"

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
