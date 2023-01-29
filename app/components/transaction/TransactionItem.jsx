import PropTypes from "prop-types"
import Education from "~/assets/Icons/Education"
import Loan from "~/assets/Icons/Loan"
import Salary from "~/assets/Icons/Salary"
import Gift from "~/assets/Icons/Gift"
import Food from "~/assets/Icons/Food"
import Bills from "~/assets/Icons/Bills"
import Sports from "~/assets/Icons/Sports"
import Health from "~/assets/Icons/Health"
import Cloths from "~/assets/Icons/Cloths"
import { formattedAmount, getDayName } from "~/utils/formatTransaction"

const categoryIcons = {
  TECH: <Education />,
  SALARY: <Salary />,
  LOAN: <Loan />,
  GIFT: <Gift />,
  FOOD: <Food />,
  BILLS: <Bills />,
  SPORTS: <Sports />,
  HEALTH: <Health />,
  CLOTHS: <Cloths />,
}

function TransactionItem({ note, amount, date, category, type }) {
  return (
    <div className="overview_transaction">
      <div className="img_note">
        {categoryIcons[category]}
        <p>{note}</p>
      </div>
      <div className="date_amount">
        <p>{getDayName(date)}</p>
        <h3 className={`chip_${type.toLowerCase()}`}>
          {type === "INCOME" ? "$" : "-$"}
          {formattedAmount(amount)}
        </h3>
      </div>
    </div>
  )
}

TransactionItem.propTypes = {
  note: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default TransactionItem