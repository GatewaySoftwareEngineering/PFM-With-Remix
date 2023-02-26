import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5"
import Dropdown from "~/Components/dropdown"
import { PropTypes } from "prop-types"
import CurrencyInput from "react-currency-input-field"
import { PostData } from "~/API/API"
import { TypeOptions } from "~/utlis/Options"

export default function AddTransactionModal({ handleClose }) {
  const [category, setCategory] = useState(TypeOptions("income"))
  const [createdAt, setCreatedAt] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState("INCOME")
  const [note, setNote] = useState("")
  const [categoryType, setCategoryType] = useState([])

  useEffect(() => {
    setCategoryType(TypeOptions(type))
  }, [type])

  const handleSubmit = (e) => {
    e.preventDefault()
    PostData({ note, category, type, amount, createdAt, currency: "USD" })
    handleClose()
  }

  // write a function to close modal and reset states
  const handleDismiss = () => {
    handleClose()
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-header-text">Add Transaction</span>
          <IoClose className="modal-close-button-icon" onClick={handleClose} />
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="modal-body-row-1">
            <Dropdown
              title="Category"
              options={categoryType}
              setCategory={setCategory}
              name="category"
            />
            <div className="elements">
              <label className="input-title">Date</label>
              <span className="date-elements">
                <input
                  className="date-picker"
                  type="text"
                  name="createdAt"
                  placeholder={
                    createdAt && createdAt.toISOString().slice(0, 10)
                  }
                  defaultValue={
                    createdAt && createdAt.toISOString().slice(0, 10)
                  }
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  onChange={(e) => setCreatedAt(new Date(e.target.value))}
                  required
                />
              </span>
            </div>
            <div className="elements">
              <label className="input-title">Amount</label>
              <CurrencyInput
                className="amount"
                name="amount"
                placeholder="$"
                prefix="$"
                decimalsLimit={2}
                allowDecimals={true}
                onValueChange={(value) => setAmount(value)}
                required
              />
            </div>
          </div>
          <div className="modal-body-row-2">
            <div className="radio-group">
              <span htmlFor="type" className="input-title">
                Type
              </span>
              <div
                className="radio-elements"
                onChange={(e) => setType(e.target.value)}
              >
                <label htmlFor="income" className="radio-element">
                  <input
                    type="radio"
                    name="type"
                    value="INCOME"
                    checked={true}
                  />
                  income
                </label>
                <label htmlFor="expense" className="radio-element">
                  <input type="radio" name="type" value="EXPENSE" />
                  expense
                </label>
              </div>
            </div>
            <div className="note-group">
              <label htmlFor="note">Note</label>
              <textarea
                maxLength="350"
                name="note"
                className="note"
                onChange={(e) => setNote(e.target.value)}
                onInvalid={(F) =>
                  F.target.setCustomValidity("Enter Transaction Note Here")
                }
                required
              ></textarea>
              <span>{`${note.length}/350`}</span>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-dismiss" onClick={() => handleDismiss()}>
              Dismiss
            </button>
            <button className="btn-transaction" type="submit">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

AddTransactionModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
}
