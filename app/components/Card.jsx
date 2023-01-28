import PropTypes from "prop-types"

function Card({ className, title, mockedTransactions }) {
  let total = 0
  if (title === "Balance") {
    mockedTransactions.forEach((transaction) => {
      if (transaction.type === "INCOME") {
        total += Number(transaction.amount)
      } else if (transaction.type === "EXPENSE") {
        total -= Number(transaction.amount)
      }
    })
  } else {
    total = mockedTransactions
      .filter((transaction) => transaction.type === title.toUpperCase())
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  }

  return (
    <div className={`card_container ${className}`}>
      <div className="card_deatils">
        <h3>{title}</h3>
        <p>details</p>
      </div>
      <h2>${total}</h2>
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  mockedTransactions: PropTypes.array.isRequired,
}

export default Card
