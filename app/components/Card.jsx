import propTypes from "prop-types"
import { formatAmount } from "~/utils/formatAmount"

export default function Card({ title, amount, color }) {
  return (
    <div className={`card ${color}`}>
      <h3 className={`title ${color}`}>{title}</h3>
      <button className={`details-button ${color}`}>details</button>
      <p className="amount">${formatAmount(amount)}</p>
    </div>
  )
}

Card.propTypes = {
  title: propTypes.string.isRequired,
  amount: propTypes.number.isRequired,
  color: propTypes.string.isRequired,
}
