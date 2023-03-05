import AddTransactionModal from "~/components/AddTransactionModal"
import Cards from "~/components/Cards"
import LatestTransactions from "~/components/LatestTransactions"
import Topbar from "~/components/Topbar"

export default function Index() {
  return (
    <>
      <AddTransactionModal />
      <Topbar title="Overview" />
      <Cards />
      <LatestTransactions />
    </>
  )
}
