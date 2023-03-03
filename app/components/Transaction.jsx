import propTypes from "prop-types"
import { GiBlackBook } from "react-icons/gi"
export default function Transaction({ type, title, date, amount }) {
  return (
    <div className="transaction">
      <div className="wrapper">
        <GiBlackBook className="icon" />
        <p className="title">{title}</p>
      </div>
      <div className="wrapper">
        <p className="date">{date.getFullYear()}</p>
        <p className="amount">${amount}</p>
      </div>
    </div>
  )
}
Transaction.propTypes = {
  type: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  date: propTypes.instanceOf(Date).isRequired,
  amount: propTypes.number.isRequired,
}
