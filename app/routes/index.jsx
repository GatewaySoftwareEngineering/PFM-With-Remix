import AddTransactionModal from "~/components/AddTransactionModal"
import Cards from "~/components/Cards"
import LatestTransactions from "~/components/LatestTransactions"
import Topbar from "~/components/Topbar"

export default function Index() {
  return (
    <div id="overview-page">
      <AddTransactionModal />
      <Topbar title="Overview" />
      <Cards />
      <LatestTransactions />
    </div>
  )
}
