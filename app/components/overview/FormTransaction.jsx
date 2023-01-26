import { useState } from "react"
import PropTypes from "prop-types"
import AddTransaction from "../AddTransaction"
function FormTransaction({ handleCancel }) {
  const [formData, setFormData] = useState({
    category: "",
    createdAt: new Date().toISOString().slice(0, 10),
    amount: null,
    type: "INCOME",
    note: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      formData.category === "" ||
      formData.amount === 0 ||
      formData.note === ""
    ) {
      return alert("Please fill out the form")
    } else {
      try {
        const response = await fetch(
          "http://localhost:8000/mockedTransactions",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: Math.floor(Math.random() * 100000) + 1,
              note: formData.note,
              category: formData.category,
              type: formData.type,
              amount: Number(formData.amount),
              createdAt: formData.createdAt,
              currency: "USD",
            }),
          }
        )
        if (!response.ok) {
          throw new Error(response.statusText)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
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
          <div className="radio_group">
            <div className="radio">
              <input
                type="radio"
                id="income"
                name="type"
                value="INCOME"
                checked={formData.type === "INCOME"}
                onChange={handleChange}
                required
              />
              <label htmlFor="income">Income</label>
              <input
                type="radio"
                id="expense"
                name="type"
                value="EXPENSE"
                checked={formData.type === "EXPENSE"}
                onChange={handleChange}
                required
              />
              <label htmlFor="expense">Expense</label>
            </div>
          </div>
        </div>
        <div className="form_label2">
          <label htmlFor="note">Note</label>
          <textarea
            rows="4"
            cols="50"
            maxLength="350"
            name="note"
            form="usrform"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="popup_footer">
        <button className="dismiss" onClick={handleCancel}>
          Dismiss
        </button>
        <AddTransaction
          className="transaction_footer_btn"
          handleTransaction={handleSubmit}
        />
      </div>
    </form>
  )
}

FormTransaction.propTypes = {
  handleCancel: PropTypes.func.isRequired,
}

export default FormTransaction
