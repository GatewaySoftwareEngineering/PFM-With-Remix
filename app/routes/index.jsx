import Card from "~/components/Card"
import CardDeatails from "~/data/CardDeatails"
import { useLoaderData } from "@remix-run/react"
import { getLastMonthTransactions } from "~/utils/transactions"

export const loader = async () => {
  const res = await fetch(" http://localhost:8000/mockedTransactions", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  const data = await res.json()
  return data
}

export default function Index() {
  const transactions = useLoaderData()

  // for card month balance
  const monthAchievements = getLastMonthTransactions(transactions)
  return (
    <div className="overview-page">
      <div className="card_row">
        {CardDeatails.map((card) => (
          <Card
            key={card.title}
            className={card.className}
            title={card.title}
            mockedTransactions={monthAchievements}
          />
        ))}
      </div>
    </div>
  )
}
