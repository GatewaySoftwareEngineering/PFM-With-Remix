import { useState } from "react"
import { useLoaderData } from "@remix-run/react"
import Card from "~/components/Card"
import CardDeatails from "~/data/CardDeatails"
import {
  getLastWeekTransactions,
  getLastMonthTransactions,
  getLastYearTransactions,
} from "~/utils/transactions"
import TransactionList from "~/components/transaction/TransactionList"
import FormTransaction from "../components/formtransaction"
import { redirect } from "@remix-run/node"

export const loader = async () => {
  const res = await fetch(" http://localhost:8000/mockedTransactions", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  const data = await res.json()
  return data
}

export default function Index() {
  const [istransactions, setIsTransactions] = useState(false)
  const transactions = useLoaderData()

  const handleOpen = () => {
    setIsTransactions(true)
  }

  const handleClose = () => {
    setIsTransactions(false)
  }

  // for card month balance
  const monthAchievements = getLastMonthTransactions(transactions)
  // for transaction
  const thisWeekTransactions = getLastWeekTransactions(transactions)
  const thisMonthTransactions = getLastMonthTransactions(transactions)
  const thisYearTransactions = getLastYearTransactions(transactions)
  let showntransactions = []
  let shownTitle = ""

  if (thisWeekTransactions.length > 0) {
    showntransactions = thisWeekTransactions
    shownTitle = "This Week"
  } else if (thisMonthTransactions.length > 0) {
    showntransactions = thisMonthTransactions
    shownTitle = "This Month"
  } else if (thisYearTransactions.length > 0) {
    showntransactions = thisYearTransactions
    shownTitle = "This Year"
  } else {
    showntransactions = transactions
    shownTitle = "All Transactions"
  }

  return (
    <div className="overview-page">
      {istransactions && <FormTransaction handleClose={handleClose} />}
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
      <div className="overview_transaction_container">
        <h2>{shownTitle}</h2>
        <TransactionList
          showntransactions={showntransactions}
          className="overview_transaction_data"
        />
      </div>
      <div className="transaction_btn_container">
        <button onClick={handleOpen} className="transaction_btn">
          Add Transaction
        </button>
      </div>
    </div>
  )
}

export const action = async ({ request }) => {
  const body = new URLSearchParams(await request.text())
  const category = body.get("category")
  const createdAt = body.get("createdAt")
  const amount = body.get("amount")
  const type = body.get("type")
  const note = body.get("note")
  if (amount !== "" || category !== "" || note !== "") {
    fetch("http://localhost:8000/mockedTransactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(Math.floor(Math.random() * 100000) + 1),
        note: note,
        category: category,
        type: type,
        amount: Number(amount),
        createdAt: createdAt,
        currency: "USD",
      }),
    })
  }
  return redirect("/overview")
}
