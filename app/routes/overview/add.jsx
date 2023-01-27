import { Dialog } from "@reach/dialog"
import dialogStyles from "@reach/dialog/styles.css"
import {
  Form,
  useNavigate,
  useTransition,
} from "@remix-run/react"
import { useState } from "react"
import { CATEGORIES as validCategoryOptions } from "~/utils/constants"
export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: dialogStyles,
    },
  ]
}

export const meta = () => {
  return {
    title: "Add Transaction",
  }
}

export default function Add() {
  const navigate = useNavigate()
  const transition = useTransition()

  const [transactionType, setTransactionType] = useState(
    "expense"
  )

  function onDismiss() {
    navigate("/overview")
  }

  const disabled =
    transition.state === "submitting" || transition.state === "loading"

  return (
    <Dialog
      isOpen={true}
      aria-label="Add transaction"
      onDismiss={onDismiss}
      className="modal modal-content"
    >
      {transition.state === "submitting" ? <div>Saving...</div> : null}
      <div className="modal-header">
        <h3>Add transaction</h3>
        <button className="close-modal" onClick={onDismiss} disabled={disabled}>
          &times;
        </button>
      </div>
      <Form method="post" replace>
        <div className="modal-body">
          <div className="form-group">
            <label>
              Category
              <select
                name="category"
                required
              >
                {categories[transactionType].map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
                <span id="category-error" className="form-validation-error">
                </span>
            </label>
            <label className="radio-group">
              Type
              <fieldset
                onChange={(event) => {
                  setTransactionType(event.target.value)
                }}
              >
                <label>
                  <input type="radio" name="type" value="income" required />
                  Income
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    required
                    defaultChecked
                  />
                  Expense
                </label>
              </fieldset>
                <span id="type-error" className="form-validation-error">
                </span>
            </label>
          </div>
          <div className="form-group">
            <div className="date-amount">
              <label>
                Date
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue={
                    new Date().toISOString().slice(0, 10)
                  }
                />
                  <span id="date-error" className="form-validation-error">
                  </span>
              </label>
              <label className="amount">
                Amount
                <span className="input-dollar-sign" aria-hidden="true">
                  <input
                    min="0"
                    required
                    type="number"
                    name="amount"
                  />
                </span>
                  <span id="amount-error" className="form-validation-error">
                  </span>
              </label>
            </div>
            <label>
              Note
              <textarea
                required
                rows="6"
                name="note"
                minLength="4"
                maxLength="350"
              />
                <span id="note-error" className="form-validation-error">
                </span>
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onDismiss} disabled={disabled}>
            Dismiss
          </button>
          <button type="submit" disabled={disabled}>
            Add transaction
          </button>
        </div>
      </Form>
    </Dialog>
  )
}
