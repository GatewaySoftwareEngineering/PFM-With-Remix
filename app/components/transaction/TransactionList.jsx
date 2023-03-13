import TransactionItem from "~/components/transaction/TransactionItem"
import PropTypes from "prop-types"

const TransactionList = ({showntransactions, className}) => {
  return (
    <div className={className}>
          {showntransactions
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10)
            .map((transaction) => (
              <TransactionItem
                key={transaction.id}
                note={transaction.note}
                amount={transaction.amount}
                date={transaction.createdAt}
                category={transaction.category}
                type={transaction.type}
              />
            ))}
        </div>
  )
}

TransactionList.propTypes = {
  showntransactions: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
}

export default TransactionList