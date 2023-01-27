import { PrismaClient } from "@prisma/client"
import { mockedTransactions } from "../app/mocks/transactions"

const prisma = new PrismaClient()

async function seed() {

  await Promise.all(
    mockedTransactions.map(async (transaction) => {
      await prisma.transaction.create({
        data: transaction,
      })
    })
  )
}

seed().catch((e) => {
  throw e
})
