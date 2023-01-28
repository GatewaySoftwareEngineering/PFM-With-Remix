import { getTransactions, setTransactions } from '../models/transaction'

export const seedTransactions = () => {
  const transactions = getTransactions()

  if (transactions.length > 0) return

  console.log('Seeding transactions...')

  for (let i = 0; i < 40; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    const type = Math.random() > 0.5 ? 'income' : 'expense'

    const category = type === 'income' ? 'Salary' : 'Sports'

    transactions.push({
      category,
      amount: Math.floor(Math.random() * 99) + 1,
      date: date.toISOString(),
      type,
      note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate.',
    })
  }

  setTransactions(transactions)
}
