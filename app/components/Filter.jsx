import { FiFilter } from "react-icons/fi"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import DatePicker from "react-datepicker"
import propTypes from "prop-types"
import { options } from "~/utils/categories"

const categories = [...options["income"], ...options["expense"]]

export default function Filter({
  selectedCategories,
  onCategoryChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onClearClick,
}) {
  return (
    <div className="filter">
      <div className="wrapper">
        <FiFilter className="icon" />
        <Select
          id="long-value-select"
          instanceId="long-value-select"
          options={categories}
          components={makeAnimated}
          closeMenuOnSelect={false}
          isMulti
          className="dropdown"
          onChange={onCategoryChange}
          value={selectedCategories}
        />
      </div>
      <div className="wrapper">
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          className="date"
          closeOnScroll={true}
          dateFormat="dd/MM/yyyy"
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
        />
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          className="date"
          closeOnScroll={true}
          dateFormat="dd/MM/yyyy"
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
        />
      </div>
      <button onClick={onClearClick} className="clear-button">
        Clear
      </button>
    </div>
  )
}

Filter.propTypes = {
  selectedCategories: propTypes.array.isRequired,
  onCategoryChange: propTypes.func.isRequired,
  startDate: propTypes.instanceOf(Date).isRequired,
  onStartDateChange: propTypes.func.isRequired,
  endDate: propTypes.instanceOf(Date).isRequired,
  onEndDateChange: propTypes.func.isRequired,
  onClearClick: propTypes.func.isRequired,
}
