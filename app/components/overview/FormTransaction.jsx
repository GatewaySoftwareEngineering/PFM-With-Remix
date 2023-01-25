import { useState } from "react"
import AddTransaction from "../AddTransaction"
import PropTypes from "prop-types"
function FormTransaction({ handleCancel }) {
  const [category, setCategory] = useState("EDUCATION")
  const [createdAt, setCreatedAt] = useState("")
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState("")
  const [note, setNote] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    let id = Math.floor(Math.random() * 100000) + 1
    const currency = "USD"
    const transaction = {
      id,
      note,
      category,
      type,
      amount,
      createdAt,
      currency,
    }
    fetch("http://localhost:8000/mockedTransactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form_group">
        <div className="form_label">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            placeholder="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="EDUCATION">Education</option>
            <option value="SALARY">Salary</option>
            <option value="LOAN">Loan</option>
          </select>
        </div>
        <div className="form_label">
          <label htmlFor="Date">Date</label>
          <input
            type="date"
            name="Date"
            id="Date"
            required
            placeholder="Date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </div>
        <div className="form_label">
          <label htmlFor="Amount">Amount</label>
          <input
            type="number"
            name="Amount"
            id="Amount"
            required
            placeholder="$"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="form_group">
        <div className="form_label">
          {/* radio button */}
          <label htmlFor="type">Type</label>
          <div className="radio_group">
            <div className="radio">
              <input
                type="radio"
                id="income"
                name="type"
                required
                value="income"
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="income">Income</label>
              <input
                type="radio"
                id="expense"
                name="type"
                required
                value="expense"
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="income">expense</label>
            </div>
          </div>
        </div>
        <div className="form_label2">
          <label htmlFor="Note">Note</label>
          <textarea
            rows="4"
            cols="50"
            name="comment"
            form="usrform"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="popup_footer">
        <button className="dismiss" onClick={handleCancel}>
          Dismiss
        </button>
        <AddTransaction className="transaction_footer_btn" />
      </div>
    </form>
  )
}

FormTransaction.propTypes = {
  handleCancel: PropTypes.func.isRequired,
}

export default FormTransaction
