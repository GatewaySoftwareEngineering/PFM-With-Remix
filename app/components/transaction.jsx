const CATEGORY_ICONS = {
  tech: "../assets/images/icons/tech.svg",
  food: "../assets/images/icons/food.svg",
  bills: "../assets/images/icons/bills.svg",
  sports: "../assets/images/icons/sports.svg",
  health: "../assets/images/icons/health.svg",
  clothes: "../assets/images/icons/clothes.svg",
  salary: "../assets/images/icons/salary.svg",
  loan: "../assets/images/icons/loan.svg",
  gift: "../assets/images/icons/gift.svg",
  other: "../assets/images/icons/other.svg",
}

const Transaction = ({ transaction }) => {
  const getImage = (category) =>
    CATEGORY_ICONS[category] || CATEGORY_ICONS.other

  const getDateString = (date) => {
    const today = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .slice(0, 10)
    const inputDate = new Date(date).toISOString().slice(0, 10)

    if (inputDate === today) {
      return "Today"
    } else if (inputDate === yesterday) {
      return "Yesterday"
    }

    return new Date(date).toLocaleDateString("en")
  }

  const formatter = new Intl.NumberFormat("en", {
    useGrouping: true,
  })

  const formatAmount = (amount) => {
    if (amount >= 1000) {
      return formatter.format((amount / 1000)) + "K"
    } else {
      return formatter.format(amount)
    }
  }

  return (
    <div className="transaction">
      <div className="transaction-info">
        <div className={"transaction-category-icon " + transaction.type}>
          <img
            src={getImage(transaction.category)}
            alt={transaction.category}
          />
        </div>
        <div className="transaction-name">{transaction.note}</div>
      </div>
      <div className="transaction-details">
        <div className="transaction-date">
          {getDateString(transaction.date)}
        </div>
        <div className={"transaction-amount " + transaction.type}>
          {transaction.type === "expense" ? "-" : "+"}
          {formatAmount(transaction.amount)} IQD
        </div>
      </div>
    </div>
  )
}

export default Transaction
