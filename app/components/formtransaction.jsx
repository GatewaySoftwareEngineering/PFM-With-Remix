import { useState, useRef } from "react"
import { Form } from "@remix-run/react"
import PropTypes from "prop-types"

function FormTransaction({ handleClose }) {
  const [formData, setFormData] = useState({
    category: "",
    createdAt: new Date().toISOString().slice(0, 10),
    amount: "",
    type: "INCOME",
    note: "",
  })

  const formRef = useRef(null)

  const handleChange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleReseat = () => {
    setFormData({
      category: "",
      createdAt: new Date().toISOString().slice(0, 10),
      amount: "",
      type: "INCOME",
      note: "",
    })
    handleClose()
  }



  return (
    <div>
      <div className="popup">
        <div className="popup_header">
          <h2>Add Transaction</h2>
          <button onClick={handleClose}>X</button>
        </div>
        <div className="popup_body">
          <Form method="post" ref={formRef}>
            <div className="form_group">
              <div className="form_label">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  placeholder="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose</option>
                  {formData.type === "INCOME" ? (
                    <>
                      <option value="SALARY">Salary</option>
                      <option value="LOAN">Loan</option>
                      <option value="GIFT">Gift</option>
                    </>
                  ) : (
                    <>
                      <option value="TECH">Tech</option>
                      <option value="FOOD">Food</option>
                      <option value="BILLS">Bills</option>
                      <option value="SPORTS">Sports</option>
                      <option value="HEALTH">Health</option>
                      <option value="CLOTHS">Cloths</option>
                    </>
                  )}
                </select>
              </div>
              <div className="form_label">
                <label htmlFor="Date">Date</label>
                <input
                  type="date"
                  name="createdAt"
                  id="Date"
                  placeholder="Date"
                  value={formData.createdAt}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form_label">
                <label htmlFor="amount">amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="$"
                  value={formData.amount}
                  min="0"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form_group">
              <div className="form_label">
                <label htmlFor="type">Type</label>
                <fieldset className="fieldset">
                  <input
                    type="radio"
                    name="type"
                    id="income"
                    value="INCOME"
                    checked={formData.type === "INCOME"}
                    onChange={handleChange}
                  />
                  <label htmlFor="income">Income</label>
                  <input
                    type="radio"
                    name="type"
                    id="expense"
                    value="EXPENSE"
                    checked={formData.type === "EXPENSE"}
                    onChange={handleChange}
                  />
                  <label htmlFor="expense">Expense</label>
                </fieldset>
              </div>
              <div className="form_label2">
                <label htmlFor="note">note</label>
                <textarea
                  rows="4"
                  cols="50"
                  maxLength="350"
                  name="note"
                  id="note"
                  value={formData.note}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="popup_footer">
              <button type="button" className="dismiss" onClick={handleReseat}>
                Dismiss
              </button>
              <button type="submit" className="transaction_btn">
                Add Transaction
              </button>
            </div>
          </Form>
        </div>
      </div>
      <div className="shadow" onClick={handleClose} aria-hidden />
    </div>
  )
}

FormTransaction.propTypes = {
  handleClose: PropTypes.func.isRequired
}

export default FormTransaction
