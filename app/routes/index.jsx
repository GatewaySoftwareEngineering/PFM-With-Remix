import { json, redirect } from "@remix-run/node"
import { useState } from "react"
import AddTransactionModal from "~/components/AddTransactionModal"
import Cards from "~/components/Cards"
import LatestTransactions from "~/components/LatestTransactions"
import Topbar from "~/components/Topbar"
import { db } from "~/utils/db.server"
import {
  validateAmount,
  validateCategory,
  validateDate,
  validateNote,
  validateType,
} from "~/utils/validations"

export const loader = async () => {
  const transactions = await db.transactions.findMany({
    orderBy: { createdAt: "desc" },
  })
  return json({ transactions })
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const { category, date, amount, type, note } = Object.fromEntries(formData)

  const fieldErrors = {
    category: validateCategory(category),
    date: validateDate(date),
    amount: validateAmount(amount),
    type: validateType(type),
    note: validateNote(note),
  }

  const fields = {
    category,
    date,
    amount,
    type,
    note,
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({
      fieldErrors,
      fields,
    })
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
  const [isModalOpen, setIsModalOpen] = useState(false)

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
