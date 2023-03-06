import propTypes from 'prop-types'
import { categoryIcons } from '~/constants/categoryIcons'
import { displayRelativeDate } from '~/helpers/displayRelativeDate'
import { categories } from '~/models/transaction'

export const links = () =>
  Object.keys(categoryIcons).map((icon) => ({
    rel: 'preload',
    href: categoryIcons[icon],
    as: 'image',
    type: 'image/svg+xml',
  }))

export default function TransactionsList({ transactions }) {
  return (
    <div className="transactions-list">
      {transactions.length === 0 ? (
        <p>No Transactions</p>
      ) : (
        transactions.map((transaction, i) => (
          <div key={i} className="transaction-card">
            <div>
              <div
                className={`transaction-category-icon-container ${
                  categories.income.includes(transaction.category)
                    ? 'success-chip'
                    : 'error-chip'
                }`}
              >
                <img
                  className="transaction-category-icon"
                  src={categoryIcons[transaction.category]}
                  alt={transaction.category}
                />
              </div>
              <p className="transaction-note">{transaction.note}</p>
            </div>

            <div>
              <p>{displayRelativeDate(transaction.date)}</p>
              <div
                className={`transaction-amount-chip ${
                  transaction.type === 'income' ? 'success-chip' : 'error-chip'
                }`}
              >
                <p>
                  {transaction.type === 'income' ? '+' : '-'}$
                  {transaction.amount}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

TransactionsList.propTypes = {
  transactions: propTypes.array.isRequired,
}
