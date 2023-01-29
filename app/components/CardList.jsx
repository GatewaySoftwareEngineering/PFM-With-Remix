import PropTypes from "prop-types"
import Card from "~/components/Card"
import CardDeatails from "~/data/CardDeatails"

function CardList({ transactions }) {
  return (
    <div className="card_row">
      {CardDeatails.map((card) => (
        <Card
          key={card.title}
          className={card.className}
          title={card.title}
          mockedTransactions={transactions}
        />
      ))}
    </div>
  )
}

CardList.propTypes = {
  transactions: PropTypes.array.isRequired,
}

export default CardList
