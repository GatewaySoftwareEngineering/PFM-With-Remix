import PropTypes from "prop-types"
import AddTransaction from "./AddTransaction"

function PopUps({ handleCancel, children, title }) {
  return (
    <div className="popup">
      <div className="popup_header">
        <h2>{title}</h2>
        <button onClick={handleCancel}>X</button>
      </div>
      <div className="popup_body">{children}</div>
      <div className="popup_footer">
        <button onClick={handleCancel} className="dismiss">
          Dismiss
        </button>
        <AddTransaction
          handleTransaction={handleCancel}
          className="transaction_footer_btn"
        />
      </div>
    </div>
  )
}

PopUps.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default PopUps
