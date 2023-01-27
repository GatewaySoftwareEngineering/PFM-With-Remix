import styleUrl from "~/styles/overview.css"
import cardStyleUrl from "~/styles/card.css"
import ModalStyleUrl from "~/styles/modal.css"
import transactionStyleUrl from "~/styles/transaction.css"
import { useNavigate, Outlet } from "@remix-run/react"
import Card from "~/components/card"
import Transaction from "~/components/transaction"
export let links = () => [
  { rel: "stylesheet", href: styleUrl },
  { rel: "stylesheet", href: cardStyleUrl },
  { rel: "stylesheet", href: ModalStyleUrl },
  { rel: "stylesheet", href: transactionStyleUrl },
]
export let meta = () => ({ title: "Overview - Personal Finance Manager" })
export default function OverviewRoute() {
  const navigate = useNavigate()

  return (
    <div className="overview-container">
      <Outlet></Outlet>
      <div className="dashboard">
        <Card name="balance" amount={balance} />
      </div>
      <div className="transactions-container">
        <div className="recent-transactions">
            <Transaction key={transaction.id} transaction={transaction} />
        </div>
      </div>
      <div className="add-transaction-container">
        <button
          type="button"
          className="add-transaction-button"
          onClick={() => navigate("add")}
        >
          Add Transaction
        </button>
      </div>
    </div>
  )
}
