function FormTransaction() {
  return (
    <form>
    <div className="form_group">
      <div className="form_label">
        <label htmlFor="category">Category</label>
        <select name="category" id="category" placeholder="category">
          <option value="EDUCATION">Education</option>
          <option value="SALARY">Salary</option>
          <option value="LOAN">Loan</option>
        </select>
      </div>
      <div className="form_label">
        <label htmlFor="Date">Date</label>
        <input type="date" name="Date" id="Date" placeholder="Date" />
      </div>
      <div className="form_label">
        <label htmlFor="Amount">Amount</label>
        <input
          type="number"
          name="Amount"
          id="Amount"
          placeholder="$"
        />
      </div>
    </div>
    <div className="form_group">
      <div className="form_label">
        <label htmlFor="Type">Type</label>
        <div className="radio_group">
          <div className="radio">
            <input type="radio" name="Type" id="Expense" value="EXPENSE" />
            <label htmlFor="Expense">Expense</label>
            <input type="radio" name="Type" id="Income" value="INCOME" />
            <label htmlFor="Income">Income</label>
          </div>
        </div>
      </div>
      <div className="form_label2">
        <label htmlFor="Note">Note</label>
        <textarea rows="4" cols="50" name="comment" form="usrform">
          Enter text here...
        </textarea>
      </div>
    </div>
  </form>
  )
}

export default FormTransaction