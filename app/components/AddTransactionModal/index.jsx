import propTypes from 'prop-types'
import { Form, useActionData } from '@remix-run/react'
import { categories, createTransaction } from '~/models/transaction'
import React from 'react'

export default function AddTransactionModal({ isOpen, onClose }) {
  const data = useActionData()

  React.useEffect(() => {
    console.log('data', data)
    if (data) createTransaction(data)
  }, [data])

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

        <div className="modal-content">
          <Form method="post">
            <div>
              <label htmlFor="category-input">Category</label>

              <select name="category" id="category-input">
                {[...categories.income, ...categories.expense].map(
                  (category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label htmlFor="date-input">Date</label>

              <input
                type="date"
                id="date-input"
                name="date"
                max={new Date().toLocaleDateString('en-ca')}
              />
            </div>

            <div>
              <label htmlFor="amount-input">Amount</label>

              <input type="number" id="amount-input" name="amount" min="0" />
            </div>

            <div>
              <label htmlFor="income-input">Type</label>

              <div>
                <input
                  type="radio"
                  id="income-input"
                  name="type"
                  value="income"
                />
                <label htmlFor="income-input">Huey</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="expense-input"
                  name="type"
                  value="expense"
                />
                <label htmlFor="expense-input">Dewey</label>
              </div>
            </div>

            <div>
              <label htmlFor="note-input">Note</label>

              <textarea
                id="note-input"
                name="note"
                rows="5"
                cols="33"
              ></textarea>
            </div>

            <div className="modal-actions">
              <button className="dismiss-button" onClick={onClose}>
                Dismiss
              </button>
              <button type="submit">Add Transaction</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

AddTransactionModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
}
