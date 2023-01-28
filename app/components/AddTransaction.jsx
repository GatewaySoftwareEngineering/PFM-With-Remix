import PropTypes from "prop-types"

function AddTransaction({ handleTransaction, className }) {
  return (
    <button onClick={handleTransaction} className={className}>
      Add Transaction
    </button>
  )
}

AddTransaction.propTypes = {
  handleTransaction: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

export default AddTransaction
