import propTypes from 'prop-types'
import { displayRelativeDate } from '~/helpers/displayRelativeDate'

export default function TransactionsList({ transactions }) {
  return (
    <div className="transactions-list">
      {transactions.map((transaction, i) => (
        <div key={i} className="transaction-card">
          <div>
            <div className="transaction-card-icon"></div>
            <p className="transaction-note">{transaction.note}</p>
          </div>

          <div>
            <p>{displayRelativeDate(transaction.date)}</p>
            <div className="transaction-amount-chip">
              <p className="dollar">{transaction.amount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

TransactionsList.propTypes = {
  transactions: propTypes.array.isRequired,
}
