import propTypes from 'prop-types'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { categories } from '~/models/transaction'
import React from 'react'

export default function AddTransactionModal({ isOpen, onClose }) {
  const data = useActionData()
  const transition = useTransition()

  const [errors, setErrors] = React.useState({})

  const [type, setType] = React.useState('income')

  let formRef = React.useRef()

  React.useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset()
      setErrors({})
    }
  }, [isOpen])

  React.useEffect(() => {
    if (data?.errors) setErrors(data.errors)
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
          <Form ref={formRef} method="post">
            <div className="input-container">
              <div className="input">
                <label htmlFor="category-input">Category</label>

                <select
                  name="category"
                  id="category-input"
                  className={errors?.category ? 'error-input' : ''}
                >
                  <option value="" defaultChecked></option>
                  {categories[type].map((category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {errors?.category ? (
                  <em className="error-message">{errors.category}</em>
                ) : null}
              </div>

              <div className="input">
                <label htmlFor="date-input">Date</label>

                <input
                  type="date"
                  id="date-input"
                  name="date"
                  defaultValue={new Date().toLocaleDateString('en-ca')}
                  max={new Date().toLocaleDateString('en-ca')}
                  className={errors?.date ? 'error-input' : ''}
                />

                {errors?.date ? (
                  <em className="error-message">{errors.date}</em>
                ) : null}
              </div>

              <div className="input">
                <label htmlFor="amount-input">Amount</label>

                <span className="amount-currency">$</span>

                <input
                  type="number"
                  id="amount-input"
                  name="amount"
                  min="0"
                  className={errors?.amount ? 'error-input' : ''}
                />

                {errors?.amount ? (
                  <em className="error-message">{errors.amount}</em>
                ) : null}
              </div>

              <div className="input ">
                <label htmlFor="income-input">Type</label>

                <div className="radio-buttons-container">
                  <div>
                    <input
                      type="radio"
                      id="income-input"
                      name="type"
                      value="income"
                      onChange={(e) => e.target.checked && setType('income')}
                      defaultChecked
                    />
                    <label htmlFor="income-input">Income</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="expense-input"
                      name="type"
                      value="expense"
                      onChange={(e) => e.target.checked && setType('expense')}
                    />
                    <label htmlFor="expense-input">Expense</label>
                  </div>
                </div>

                {errors?.type ? (
                  <em className="error-message">{errors.type}</em>
                ) : null}
              </div>

              <div className="input">
                <label htmlFor="note-input">Note</label>

                <textarea
                  id="note-input"
                  name="note"
                  rows="5"
                  cols="33"
                  maxLength={350}
                  className={errors?.note ? 'error-input' : ''}
                ></textarea>

                {errors?.note ? (
                  <em className="error-message">{errors.note}</em>
                ) : null}
              </div>
            </div>

            <div className="modal-actions">
              <button type="reset" className="dismiss-button" onClick={onClose}>
                Dismiss
              </button>
              <button type="submit">
                {transition.state === 'submitting'
                  ? 'Adding...'
                  : 'Add Transaction'}
              </button>
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
