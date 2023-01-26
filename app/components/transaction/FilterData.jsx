import PropTypes from "prop-types"
import FilterIcon from "~/assets/Icons/FilterIcon"
import Select from "react-select"

function FilterData({
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
      <FilterIcon />
      <div className="transaction_history_filter_category">
        <Select
          isMulti
          name="category"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
        />
      </div>

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
  setCategoryFilter: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  setPerviousDate: PropTypes.func.isRequired,
  currentDate: PropTypes.string.isRequired,
  perviousDate: PropTypes.string.isRequired,
}

export default FilterData
