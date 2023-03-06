import { json } from "@remix-run/node"
import AddTransactionModal from "~/components/AddTransactionModal"
import Cards from "~/components/Cards"
import LatestTransactions from "~/components/LatestTransactions"
import Topbar from "~/components/Topbar"
import { db } from "~/utils/db.server"

export const loader = async () => {
  const transactions = await db.transactions.findMany()

  return json({ transactions })
}
export default function Index() {
  return (
    <div id="overview-page">
      {/* <AddTransactionModal /> */}
      <Topbar title="Overview" />
      <Cards />
      <LatestTransactions />
    </div>
  )
}
