import { json, redirect } from "@remix-run/node"
import { useState } from "react"
import AddTransactionModal from "~/components/AddTransactionModal"
import Cards from "~/components/Cards"
import LatestTransactions from "~/components/LatestTransactions"
import Topbar from "~/components/Topbar"
import { db } from "~/utils/db.server"

export const loader = async () => {
  const transactions = await db.transactions.findMany({
    orderBy: { createdAt: "desc" },
  })
  return json({ transactions })
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const { category, date, amount, type, note } = Object.fromEntries(formData)

  if (!category || !date || !amount || !type || !note) {
    return json("Please fill all the fields", { status: 400 })
  }

  await db.transactions.create({
    data: {
      category,
      date: new Date(date),
      amount: Number(amount),
      type,
      note,
    },
  })

  return redirect("/")
}
export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleOpenModalClick = () => {
    setIsModalOpen((prev) => !prev)
  }

  return (
    <div id="overview-page">
      {isModalOpen ? (
        <AddTransactionModal onModalOpenClick={handleOpenModalClick} />
      ) : null}
      <Topbar title="Overview" />
      <Cards />
      <LatestTransactions onModalOpenClick={handleOpenModalClick} />
    </div>
  )
}
