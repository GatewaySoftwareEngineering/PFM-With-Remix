import Filter from "~/components/Filter"
import SearchBar from "~/components/SearchBar"
import Topbar from "~/components/Topbar"

export default function Transactions() {
  return (
    <div>
      <Topbar title="Transaction History" />
      <SearchBar />
      <Filter />
      <ul>
        <li>Transaction 1</li>
        <li>Transaction 2</li>
      </ul>
    </div>
  )
}
