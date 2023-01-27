import { setTransactions } from '../models/transaction'

export const seedTransactions = () => {
  const transactions = []

  for (let i = 0; i < 20; i++) {
    transactions.push({
      category: 'Bills',
      amount: Math.floor(Math.random() * 99) + 1,
      date: new Date().toISOString(),
      type: 'expense',
      note: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate.',
    })
  }

  setTransactions(transactions)
}
