import PropTypes from "prop-types"

function FilterData({
  categoryFilter,
  setCategoryFilter,
  clearFilter,
  setCurrentDate,
  setPerviousDate,
  currentDate,
  perviousDate,
}) {
  return (
    <div className="transaction_history_filter">
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="SALARY">Salary</option>
        <option value="EDUCATION">Education</option>
        <option value="LOAN">Loan</option>
      </select>
      <div className="transaction_history_filter_date">
        <input
          type="date"
          value={perviousDate}
          placeholder="From"
          onChange={(e) => setPerviousDate(e.target.value)}
        />
        <input
          type="date"
          value={currentDate}
          placeholder="To"
          onChange={(e) => setCurrentDate(e.target.value)}
        />
      </div>
      <button onClick={clearFilter}>Clear</button>
    </div>
  )
}

FilterData.propTypes = {
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  setPerviousDate: PropTypes.func.isRequired,
  currentDate: PropTypes.string.isRequired,
  perviousDate: PropTypes.string.isRequired,
}

export default FilterData
