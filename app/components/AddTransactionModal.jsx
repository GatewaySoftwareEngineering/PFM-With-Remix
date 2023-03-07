import { Form, useActionData, useTransition } from "@remix-run/react"
import propTypes from "prop-types"
import { useState } from "react"
import { BiDollar } from "react-icons/bi"
import { GrClose } from "react-icons/gr"
import { options } from "~/utils/categories"
import {
  validateAmount,
  validateCategory,
  validateDate,
  validateNote,
  validateType,
} from "~/utils/validations"

// get the options from the utils folder
const categoryOptions = options

export default function AddTransactionModal({ onModalOpenClick }) {
  const [type, setType] = useState("income")
  const [note, setNote] = useState("")

  const transition = useTransition()
  const actionData = useActionData()

  // disable the submit button while submitting
  const submitButton =
    transition.state === "submitting" ? (
      <button className="button primary" type="submit" disabled>
        Adding
      </button>
    ) : (
      <button className="button primary" type="submit">
        Add Transaction
      </button>
    )

  const handleFormSubmit = (e) => {
    const category = validateCategory(e.target.category.value)
    const date = validateDate(e.target.date.value)
    const amount = validateAmount(e.target.amount.value)
    const type = validateType(e.target.type.value)
    const note = validateNote(e.target.note.value)
    if (!category && !date && !amount && !type && !note) {
      onModalOpenClick()
    }
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="title">Add Transaction</h5>
          <button onClick={onModalOpenClick} className="close">
            <GrClose className="icon" />
          </button>
        </div>
        <div className="modal-body">
          <Form
            method="POST"
            className="modal-form"
            onSubmit={handleFormSubmit}
          >
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                id="category"
                className="category"
                defaultValue={actionData?.fields?.category}
              >
                {categoryOptions[type].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {actionData?.fieldErrors?.category ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="category-error"
                >
                  {actionData.fieldErrors.category}
                </p>
              ) : null}
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                id="date"
                defaultValue={
                  actionData?.fields?.date ||
                  new Date().toISOString().split("T")[0]
                }
                className="date"
              />
              {actionData?.fieldErrors?.date ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="date-error"
                >
                  {actionData.fieldErrors.date}
                </p>
              ) : null}
            </div>
            <div className="form-group">
              <label>Amount</label>

              <div className="amount">
                <BiDollar className="amount-icon" />
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="amount-input"
                  min={0}
                  defaultValue={actionData?.fields?.amount}
                />
              </div>
              {actionData?.fieldErrors?.amount ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="amount-error"
                >
                  {actionData.fieldErrors.amount}
                </p>
              ) : null}
            </div>
            <div className="form-group">
              <label>Type</label>
              <div className="radio-container">
                <div>
                  <input
                    type="radio"
                    name="type"
                    id="income"
                    value="income"
                    className="radio-input"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "income"}
                  />
                  <label htmlFor="income" className="radio-label">
                    Income
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="type"
                    id="expense"
                    value="expense"
                    className="radio-input"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "expense"}
                  />
                  <label htmlFor="expense" className="radio-label">
                    Expense
                  </label>
                </div>
              </div>
              {actionData?.fieldErrors?.type ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="type-error"
                >
                  {actionData.fieldErrors.type}
                </p>
              ) : null}
            </div>
            <div className="form-group textarea">
              <label>Note</label>
              <textarea
                name="note"
                id="note"
                cols="30"
                rows="10"
                maxLength={350}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                defaultValue={actionData?.fields?.note}
              ></textarea>
              <p>{`${note.length} / 350`}</p>
              {actionData?.fieldErrors?.note ? (
                <p
                  className="form-validation-error"
                  role="alert"
                  id="note-error"
                >
                  {actionData.fieldErrors.note}
                </p>
              ) : null}
            </div>
            <div className="form-button-group">
              <button onClick={onModalOpenClick} className="button cancel">
                Dismiss
              </button>
              {submitButton}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

AddTransactionModal.propTypes = {
  onModalOpenClick: propTypes.func.isRequired,
}
