import { FiFilter } from "react-icons/fi"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import DatePicker from "react-datepicker"
import { useState } from "react"

const options = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]
export default function Filter() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  return (
    <div className="filter">
      <div className="wrapper">
        <FiFilter className="icon" />
        <Select
          id="long-value-select"
          instanceId="long-value-select"
          options={options}
          components={makeAnimated}
          closeMenuOnSelect={false}
          isMulti
          className="dropdown"
        />
      </div>
      <div className="wrapper">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="date"
          closeOnScroll={true}
          dateFormat="dd/MM/yyyy"
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="date"
          closeOnScroll={true}
          dateFormat="dd/MM/yyyy"
          selectsEnd
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <button className="clear-button">Clear</button>
    </div>
  )
}
