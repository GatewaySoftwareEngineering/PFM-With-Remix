const { PrismaClient } = require("@prisma/client")
const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getTransactions().map((transaction) => {
      return db.transactions.create({ data: transaction })
    })
  )
}

seed()

function getTransactions() {
  return [
    {
      category: "salary",
      date: new Date(),
      amount: 1000,
      type: "income",
      note: "Salary for the month of February",
    },
    {
      category: "loan",
      date: new Date(),
      amount: 5000,
      type: "income",
      note: "Loan from the bank",
    },
    {
      category: "gift",
      date: new Date(),
      amount: 200,
      type: "income",
      note: "Gift from my parents",
    },
    {
      category: "tech",
      date: new Date(),
      amount: 1500,
      type: "expense",
      note: "New laptop",
    },
    {
      category: "food",
      date: new Date(),
      amount: 100,
      type: "expense",
      note: "Groceries",
    },
    {
      category: "bills",
      date: new Date(),
      amount: 500,
      type: "expense",
      note: "Electricity bill",
    },
    {
      category: "sports",
      date: new Date(),
      amount: 100,
      type: "expense",
      note: "New shoes",
    },
    {
      category: "health",
      date: new Date(),
      amount: 200,
      type: "expense",
      note: "New medicine",
    },
    {
      category: "clothes",
      date: new Date(),
      amount: 100,
      type: "expense",
      note: "New shirt",
    },
  ]
}
