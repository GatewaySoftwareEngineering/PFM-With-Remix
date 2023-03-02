import { db } from "~/utils/db.server"

export const createTransaction = async (
  category,
  type,
  date,
  amount,
  note,
) => {
  await db.transaction.create({
    data: {
      id: crypto.randomUUID(),
      category,
      type,
      date: new Date(date),
      amount: parseInt(amount),
      note,
      currency: "IQD",
    },
  })
}

export const getFilteredTransactions = async ({ take = 10, skip = 0 }, whereFilter) => {
  return await db.transaction.findMany({
    take,
    skip,
    orderBy: {
      date: "desc",
    },
    where: {
      ...whereFilter,
    },
  })
}

export const getIncome = async () => {
  return await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "income",
    },
  })
}

export const getExpenses = async () => {
  return await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "expense",
    },
  })
}

export const getTransactionsCount = async (whereFilter) => {
  return await db.transaction.count(
    {
      where: {
        ...whereFilter,
      },
    },
  )
}
