import { FiFilter } from "react-icons/fi"
import Select from "react-select"
import makeAnimated from "react-select/animated"
const options = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]
export default function Filter() {
  return (
    <div className="filter">
      <div className="wrapper">
        <FiFilter className="icon" />
        <Select
          options={options}
          components={makeAnimated}
          closeMenuOnSelect={false}
          isMulti
          className="dropdown"
        />
      </div>
      <div className="wrapper">
        <input type="date" name="from" className="date" />
        <input type="date" name="to" className="date" />
      </div>
      <button className="clear-button">Clear</button>
    </div>
  )
}
