import PropTypes from "prop-types"
import {
  BillsIcon,
  ClothsIcon,
  FoodIcon,
  GiftIcon,
  SalaryIcon,
  LoanIcon,
  HealthIcon,
  TechIcon,
  SportsIcon,
  UndefinedCategoryIcon,
} from "~/shared/assets/svg-components"
import currencyFormatter from "~/utils/currency-formatter"

const getIcon = (category) => {
  switch (category.toUpperCase()) {
    case "SALARY":
      return SalaryIcon
    case "LOAN":
      return LoanIcon
    case "GIFT":
      return GiftIcon
    case "TECH":
      return TechIcon
    case "FOOD":
      return FoodIcon
    case "BILLS":
      return BillsIcon
    case "SPORTS":
      return SportsIcon
    case "HEALTH":
      return HealthIcon
    case "CLOTHS":
      return ClothsIcon
    default:
      return UndefinedCategoryIcon
  }
}

export default function Transaction({ category, title, date, amount, type }) {
  switch (date.getDate()) {
    case new Date().getDate(): {
      date = "today"
      break
    }
    case new Date().getDate() - 1: {
      date = "yesterday"
      break
    }
    default: {
      date = date.toLocaleDateString()
      break
    }
  }

  amount = currencyFormatter(+amount, { useAbbreviation: true, symbol: "$" })

  const className = `transaction transaction-type-${type.toLowerCase()}`

  let Icon = getIcon(category)

  return (
    <div className={className}>
      <div className="icon-title-container">
        <div className="icon">
          <Icon />
        </div>
        <div className="title">{title}</div>
      </div>
      <div className="date-amount-container">
        <div className="date">{date}</div>
        <div className="amount">
          <span className="amount-holder">{amount}</span>
        </div>
      </div>
    </div>
  )
}

Transaction.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}
