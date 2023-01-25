import PropTypes from "prop-types"
import Education from "~/assets/Icons/Education"
import Loan from "~/assets/Icons/Loan"
import Salary from "~/assets/Icons/Salary"
import { formattedAmount, getDayName } from "~/utils/formatTransaction"

function TransactionItem({ note, amount, date, category }) {

  return (
    <div className="overview_transaction">
      <div className="img_note">
        {category === "EDUCATION" && <Education />}
        {category === "SALARY" && <Salary />}
        {category === "LOAN" && <Loan />}
        <p>{note}</p>
      </div>
      <div className="date_amount">
        <p>{getDayName(date)}</p>
        {category === "SALARY" || category === "LOAN" ? (
          <h3 className="chip_income">${formattedAmount(amount)}</h3>
        ) : (
          <h3 className="chip_expense">-${formattedAmount(amount)}</h3>
        )}
      </div>
    </div>
  )
}

TransactionItem.propTypes = {
  note: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
}

export default TransactionItem
