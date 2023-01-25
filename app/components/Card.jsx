import PropTypes from "prop-types"

function Card({ className, title, mockedTransactions }) {
  const total = mockedTransactions.reduce((acc, curr) => {
    if (curr.type === title.toUpperCase()) {
      acc += curr.amount
    } else if (title === "Balance") {
      acc += curr.amount
    }
    return acc
  }, 0)
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
