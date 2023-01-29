import { useState } from "react"
import { Form } from "@remix-run/react"
import { redirect } from "@remix-run/node"
import { useNavigate } from "react-router-dom"

export const action = async ({ request }) => {
  const body = new URLSearchParams(await request.text())
  const category = body.get("category")
  const createdAt = body.get("createdAt")
  const amount = body.get("amount")
  const type = body.get("type")
  const note = body.get("note")
  if (amount !== "" || category !== "" || note !== "") {
    fetch("http://localhost:8000/mockedTransactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(Math.floor(Math.random() * 100000) + 1),
        note: note,
        category: category,
        type: type,
        amount: Number(amount),
        createdAt: createdAt,
        currency: "USD",
      }),
    })
  }
  return redirect("/overview")
}

function FormTransaction() {
  const [formData, setFormData] = useState({
    category: "",
    createdAt: new Date().toISOString().slice(0, 10),
    amount: "",
    type: "INCOME",
    note: "",
  })

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
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
  }
  const navigate = useNavigate()
  const handleCancel = () => {
    handleReseat()
    navigate("/overview")
  }

  return (
    <div>
      <div className="popup">
        <div className="popup_header">
          <h2>Add Transaction</h2>
          <button onClick={handleCancel}>X</button>
        </div>
        <div className="popup_body">
          <Form method="post" replace>
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
      <div className="shadow" onClick={handleCancel} aria-hidden />
    </div>
  )
}

export default FormTransaction
