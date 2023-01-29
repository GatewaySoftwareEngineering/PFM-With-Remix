import { useState } from "react"
import { Form, useNavigate } from "@remix-run/react"
import PropTypes from "prop-types"
import AddTransaction from "../AddTransaction"

function FormTransaction({ handleCancel }) {
  const [formData, setFormData] = useState({
    category: "",
    createdAt: new Date().toISOString().slice(0, 10),
    amount: "",
    type: "INCOME",
    note: "",
  })

  const [error, setError] = useState({
    category: false,
    amount: false,
    note: false,
  })

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      formData.amount === null ||
      formData.category === "" ||
      formData.note === ""
    ) {
      setError({
        category: formData.category === "" ? true : false,
        amount: formData.amount === null ? true : false,
        note: formData.note === "" ? true : false,
      })
      return alert("Please fill all the fields")
    } else {
      fetch("http://localhost:8000/mockedTransactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Number(Math.floor(Math.random() * 100000) + 1),
          note: formData.note,
          category: formData.category,
          type: formData.type,
          amount: Number(formData.amount),
          createdAt: formData.createdAt,
          currency: "USD",
        }),
      })
    }
    handleCancel()
    setTimeout(() => {
      navigate("/")
    }, 500)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <Form>
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
          <span className={error.category ? "error" : ""}>
            {error.category && "Please select a category"}
          </span>
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
          <span className={error.amount ? "error" : ""}>
            {error.amount && "Please enter an amount"}
          </span>
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
            required
          />
          <span className={error.note ? "error" : ""}>
            {error.note && "Please enter a note"}
          </span>
        </div>
      </div>
      <div className="popup_footer">
        <button className="dismiss" onClick={handleCancel}>
          Dismiss
        </button>
        <AddTransaction
          handleTransaction={handleSubmit}
          className="transaction_footer_btn"
        />
      </div>
    </Form>
  )
}

FormTransaction.propTypes = {
  handleCancel: PropTypes.func.isRequired,
}

export default FormTransaction
