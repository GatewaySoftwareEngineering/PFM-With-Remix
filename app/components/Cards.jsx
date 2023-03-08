import { useLoaderData } from "@remix-run/react"
import { balance, expense, income } from "~/utils/calculateBalance"
import Card from "./Card"

export default function Cards() {
  const { transactions } = useLoaderData()

  return (
    <section className="cards">
      <Card title="Income" amount={income(transactions)} color="blue" />
      <Card title="Balance" amount={balance(transactions)} color="gray" />
      <Card title="Expense" amount={expense(transactions)} color="red" />
    </section>
  )
}
