import { Dialog } from "@reach/dialog"
import dialogStyles from "@reach/dialog/styles.css"
import { redirect } from "@remix-run/node"
import {
  Form,
  useActionData,
  useNavigate,
  useTransition,
} from "@remix-run/react"
import { badRequest } from "~/utils/request.server"
import {
  validateCategory,
  validateType,
  validateDate,
  validateAmount,
  validateNote,
} from "~/utils/validate.server"
import { useState } from "react"
import { CATEGORIES as categories } from "~/utils/constants"
import { createTransaction } from "~/utils/transactions.server"

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

export const action = async ({ request }) => {
  let form = await request.formData()

  let category = form.get("category")
  let type = form.get("type")
  let date = form.get("date")
  let amount = form.get("amount")
  let note = form.get("note")

  if (
    typeof category !== "string" ||
    typeof note !== "string" ||
    typeof date !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    })
  }

  const fields = { category, type, date, amount }

  const fieldErrors = {
    category: validateCategory(category, type),
    type: validateType(type),
    date: validateDate(date),
    amount: validateAmount(amount),
    note: validateNote(note),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields, formError: null })
  }

  await createTransaction(category, type, date, amount, note)
  return redirect(`/overview`)
}

export default function Add() {
  const navigate = useNavigate()
  const actionData = useActionData()
  const transition = useTransition()

  const [transactionType, setTransactionType] = useState(
    actionData?.fields?.type || "expense"
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
                defaultValue={actionData?.fields?.category || "other"}
                aria-invalid={Boolean(actionData?.fieldErrors?.category)}
                aria-errormessage={actionData?.fieldErrors?.category}
              >
                {categories[transactionType].map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
              {actionData?.fieldErrors?.category ? (
                <span id="category-error" className="form-validation-error">
                  {actionData?.fieldErrors?.category}
                </span>
              ) : null}
            </label>
            <label className="radio-group">
              Type
              <fieldset
                aria-invalid={Boolean(actionData?.fieldErrors?.type)}
                aria-errormessage={
                  actionData?.fieldErrors?.type ? "type-error" : undefined
                }
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
              {actionData?.fieldErrors?.type ? (
                <span id="type-error" className="form-validation-error">
                  {actionData?.fieldErrors?.type}
                </span>
              ) : null}
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
                    actionData?.fields?.date ||
                    new Date().toISOString().slice(0, 10)
                  }
                  aria-invalid={Boolean(actionData?.fieldErrors?.date)}
                  aria-errormessage={
                    actionData?.fieldErrors?.date ? "date-error" : undefined
                  }
                />
                {actionData?.fieldErrors?.date ? (
                  <span id="date-error" className="form-validation-error">
                    {actionData?.fieldErrors?.date}
                  </span>
                ) : null}
              </label>
              <label className="amount">
                Amount
                <span className="input-dollar-sign" aria-hidden="true">
                  <input
                    min="0"
                    required
                    type="number"
                    name="amount"
                    defaultValue={actionData?.fields?.amount || 0}
                    aria-invalid={Boolean(actionData?.fieldErrors?.amount)}
                    aria-errormessage={
                      actionData?.fieldErrors?.amount
                        ? "amount-error"
                        : undefined
                    }
                  />
                </span>
                {actionData?.fieldErrors?.amount ? (
                  <span id="amount-error" className="form-validation-error">
                    {actionData?.fieldErrors?.amount}
                  </span>
                ) : null}
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
                defaultValue={actionData?.fields?.note}
                aria-invalid={Boolean(actionData?.fieldErrors?.note)}
                aria-errormessage={
                  actionData?.fieldErrors?.note ? "note-error" : undefined
                }
              />
              {actionData?.fieldErrors?.note ? (
                <span id="note-error" className="form-validation-error">
                  {actionData?.fieldErrors?.note}
                </span>
              ) : null}
            </label>
          </div>
        </div>

        <div className="modal-footer">
          {actionData?.formError ? (
            <p className="form-validation-error" role="alert">
              {actionData.formError}
            </p>
          ) : null}
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
