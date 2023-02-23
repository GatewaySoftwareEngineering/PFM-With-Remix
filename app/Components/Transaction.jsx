import {PropTypes} from "prop-types"
import { HiOutlineAcademicCap, HiOutlineChip } from "react-icons/hi"
import { TbBriefcase } from "react-icons/tb"

export default function Transaction({ category, amount, date, note }) {
  const objDate = new Date()
  const recivedDate = new Date(date).toLocaleDateString("en-US")
  const today = new Date().toLocaleDateString("en-US")
  let yestrday = new Date(objDate.getTime())
  yestrday.setDate(objDate.getDate() - 1)
  yestrday = yestrday.toLocaleDateString("en-US")

  if (recivedDate === today) {
    date = "Today"
  }
  if (recivedDate === yestrday) {
    date = "Yesterday"
  }

  const icon = {
    Education: <HiOutlineAcademicCap className="Blue-Icon" />,
    Salary: <TbBriefcase className="Green-Icon" />,
    Tech: <HiOutlineChip className="Green-Icon" />,
  }
  return (
    <div className="transaction-item">
      <div className="transaction_head">
        {icon[category]}
        <span className="transaction_note">{note}</span>
      </div>
      <div className="transaction_body">
        <span className="transaction_date">{date}</span>
        <span className="transaction_amount">${amount}</span>
      </div>
    </div>
  )
}

Transaction.propTypes = {
  category: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
}

export function ErrorBoundary({ error }) {
  return (
    <div className="ErrorBoundary">
      <h1 className="ErrorBoundary__Text">Something went wrong</h1>
      <p className="ErrorBoundary__Text">{error.message}</p>
    </div>
  )
}

// props validation
ErrorBoundary.propTypes = {
  error: PropTypes.object.isRequired,
}
