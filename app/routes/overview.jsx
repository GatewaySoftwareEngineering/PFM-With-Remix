import styleUrl from "~/styles/overview.css"
import cardStyleUrl from "~/styles/card.css"
import ModalStyleUrl from "~/styles/modal.css"
import transactionStyleUrl from "~/styles/transaction.css"
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
  return (
    <div className="overview-container">
      <Outlet></Outlet>
        <Card name="balance" amount={balance} />
            <Transaction key={transaction.id} transaction={transaction} />
    </div>
  )
}
