import { json } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import React from 'react'
import AddTransactionModal from '~/components/AddTransactionModal'
import TransactionsList from '~/components/TransactionsList'
import { filterAnOverviewOfTransactions } from '~/helpers/filterAnOverviewOfTransactions'
import { filterByRelativeTime } from '~/helpers/filterByRelativeTime'
import { createTransaction, getTransactions } from '~/models/transaction'

const overviewCards = (transactions) => [
  {
    title: 'Income',
    value: filterByRelativeTime(transactions, 'month').reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') return acc + transaction.amount
        else return acc
      },
      0
    ),
    variant: 'info',
  },
  {
    title: 'Balance',
    value: transactions.reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0),
    variant: 'neutral',
  },
  {
    title: 'Expense',
    value: filterByRelativeTime(transactions, 'month').reduce(
      (acc, transaction) => {
        if (transaction.type === 'expense') return acc + transaction.amount
        else return acc
      },
      0
    ),
    variant: 'error',
  },
]

export const action = async ({ request }) => {
  const formData = await request.formData()

  const type = formData.get('type')
  const amount = formData.get('amount')
  const category = formData.get('category')
  const date = formData.get('date')
  const note = formData.get('note')

  const errors = {
    type: type ? null : 'Type is required',
    amount: amount ? null : 'Amount is required',
    category: category ? null : 'Category is required',
    date: date ? null : 'Date is required',
    note: note ? null : 'Note is required',
  }
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)

  return json({
    errors,
    isValid: !hasErrors,
    data: { type, amount: amount && parseInt(amount), category, date, note },
  })
}

export default function Index() {
  const data = useActionData()

  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    React.useState(false)
  const [transactions, setTransactions] = React.useState([])

  React.useEffect(() => {
    setTransactions(getTransactions())
  }, [])

  React.useEffect(() => {
    if (data?.isValid) {
      console.log('Creating transaction...')

      setIsAddTransactionModalOpen(false)
      const updatedTransactions = createTransaction(data.data)
      setTransactions(updatedTransactions)
    }
  }, [data])

  return (
    <>
      <div className="main-section">
        <div className="overview-cards-container">
          {overviewCards(transactions).map((card, i) => (
            <div
              key={i}
              className={`overview-card ${card.variant} ${card.variant}-gradient`}
            >
              <div>
                <h5>{card.title}</h5>
                <h1 className="dollar">{card.value}</h1>
              </div>
              <button className={card.variant}>Details</button>
            </div>
          ))}
        </div>

        <div className="transactions-section">
          <div className="transactions-section-header">
            <h4>This Week</h4>
            <button onClick={() => setIsAddTransactionModalOpen(true)}>
              Add Transaction
            </button>
          </div>

          <TransactionsList
            transactions={filterAnOverviewOfTransactions(transactions)}
          />
        </div>
      </div>

      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
      />
    </>
  )
}
