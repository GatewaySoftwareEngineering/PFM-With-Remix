import PropTypes from "prop-types"

export default function Transaction({ category, amount, date, note }) {
  return (
    <div className="transaction-item">
      <div className="transaction_head">
        <span className="transaction_category">{category}</span>
        <span className="transaction_date">{date}</span>
      </div>
      <div className="transaction_body">
        <span className="transaction_amount">${amount}</span>
        <span className="transaction_note">{note}</span>
      </div>
    </div>
  )
}

Transaction.propTypes = {
  category: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
}
