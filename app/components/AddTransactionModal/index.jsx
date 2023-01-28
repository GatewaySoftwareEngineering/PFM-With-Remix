import propTypes from 'prop-types'

export default function AddTransactionModal({ isOpen, onClose }) {
  return (
    <div
      className="modal-container"
      style={{
        display: isOpen ? 'block' : 'none',
      }}
      onClick={(e) => {
        if (e.target.className === 'modal-container') {
          onClose()
        }
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <h4>Add Transaction</h4>
          <h4 className="icon-button modal-close-icon" onClick={onClose}>
            X
          </h4>
        </div>
      </div>
    </div>
  )
}

AddTransactionModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
}
