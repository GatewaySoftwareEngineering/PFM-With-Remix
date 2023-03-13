import PropTypes from "prop-types"
import FilterIcon from "~/assets/Icons/FilterIcon"
import Select from "react-select"

function FilterData({
  categoryFilter,
  setCategoryFilter,
  clearFilter,
  setCurrentDate,
  setPerviousDate,
  currentDate,
  perviousDate,
}) {
  const handleChange = (e) => {
    setCategoryFilter(e.map((item) => item.value))
  }

  const options = [
    { value: "SALARY", label: "Salary" },
    { value: "TECH", label: "Tech" },
    { value: "LOAN", label: "Loan" },
    { value: "GIFT", label: "Gift" },
    { value: "FOOD", label: "Food" },
    { value: "BILLS", label: "Bills" },
    { value: "SPORTS", label: "SPORTS" },
    { value: "HEALTH", label: "Health" },
    { value: "CLOTHS", label: "Cloths" },
  ]

  return (
    <div className="transaction_history_filter">
      <div className="category_container">
        <FilterIcon />
        <div className="transaction_history_filter_category">
          <Select
            isMulti
            name="category"
            options={options}
            value={options.filter((item) =>
              categoryFilter.includes(item.value)
            )}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="transaction_history_filter_date">
        <label htmlFor="from">from</label>
        <input
          id="from"
          type="date"
          value={perviousDate}
          placeholder="From"
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setPerviousDate(e.target.value)}
        />
        <label htmlFor="to">to</label>
        <input
          id="to"
          type="date"
          value={currentDate}
          placeholder="To"
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setCurrentDate(e.target.value)}
        />
      </div>
      <button onClick={clearFilter}>Clear</button>
    </div>
  )
}

FilterData.propTypes = {
  categoryFilter: PropTypes.array.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  setPerviousDate: PropTypes.func.isRequired,
  currentDate: PropTypes.string.isRequired,
  perviousDate: PropTypes.string.isRequired,
}

export default FilterData
