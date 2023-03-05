import DatePicker from "react-datepicker"
import { GrClose } from "react-icons/gr"
import Select from "react-select"

export default function AddTransactionModal() {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="title">Add Transaction</h5>
          <button className="close">
            <GrClose className="icon" />
          </button>
        </div>
        <div className="modal-body">
          <form className="modal-form">
            <div className="form-group">
              <label>Category</label>
              <Select id="long-value-select" instanceId="long-value-select" />
            </div>
            <div className="form-group">
              <label>Date</label>
              <DatePicker className="date" />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="amount"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <div className="radio-container">
                <div>
                  <input
                    type="radio"
                    name="type"
                    id="income"
                    className="radio-input"
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
                    className="radio-input"
                  />
                  <label htmlFor="expense" className="radio-label">
                    Expense
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group textarea">
              <label>Note</label>
              <textarea name="note" id="note" cols="30" rows="10"></textarea>
            </div>
            <div className="form-button-group">
              <button className="button cancel">Dismiss</button>
              <button className="button primary" type="submit">
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
