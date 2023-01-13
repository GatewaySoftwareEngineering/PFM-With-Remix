import Button from "~/components/button"
import Card from "~/components/card"
import Transaction from "~/components/transaction"
import styles from "~/styles/pages/overview.css"
import { redirect } from "@remix-run/node"
import { db } from "~/utils/db.server"
import { useLoaderData } from "@remix-run/react"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader = async () => {
  const transaction = await db.transaction.findMany({
    include: {
      category: true,
    },
    take: 10,
  })

  const cardData =
    await db.$queryRaw`SELECT type, sum(amount) as total FROM "Transaction" INNER JOIN "Category" ON "Transaction".categoryId = "Category".id GROUP BY type`

  return { transaction, cardData }
}

export const action = async ({ request }) => {
  const formData = await request.formData()

  redirect(``)
}

export default function Overview() {
  const { transaction, cardData } = useLoaderData()

  const income = cardData.filter((data) => data.type === "INCOME")[0].total
  const expense = cardData.filter((data) => data.type === "EXPENSE")[0].total

  return (
    <div className="overview-page">
      <div className="card-list">
        <Card title="income" key={"income"} value={income} variant="info" />
        <Card
          title="balance"
          key={"balance"}
          value={income - expense}
          variant="secondary"
        />
        <Card
          title="expense"
          key={"expense"}
          value={expense}
          variant="danger"
        />
      </div>
      <div className="transaction-list">
        <h1 className="transaction-list-header">This Week</h1>
        <div className="transaction-list-list">
          {transaction.map(({ id, note, amount, date, category }) => {
            return (
              <Transaction
                key={id}
                category={category.name}
                type={category.type}
                title={note}
                amount={amount}
                date={new Date(date)}
              />
            )
          })}
        </div>
      </div>
      <div className="button-list">
        <Button
          variant={"primary"}
          size={"large"}
          type={"normal"}
          className={"add-transaction-button"}
        >
          Add Transaction
        </Button>
      </div>
    </div>
  )
}
