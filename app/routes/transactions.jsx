import styleUrl from "../styles/transactions.css"
export let links = () => [
  { rel: "stylesheet", href: styleUrl },
]

export const meta = () => {
  return {
    title: "Transaction History",
    description: "View all your transactions",
  }
}
export default function Transactions() {
  return (
    <div className="transcation-history">
    </div>
  )
}
