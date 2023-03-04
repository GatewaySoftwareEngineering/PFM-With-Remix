import { FiFilter } from "react-icons/fi"

export default function Filter() {
  return (
    <div className="filter">
      <div className="wrapper">
        <FiFilter className="icon" />
        <div className="dropdown">Dropdown</div>
      </div>
      <div className="wrapper">
        <input type="date" name="from" className="date" />
        <input type="date" name="to" className="date" />
      </div>
      <button className="clear-button">Clear</button>
    </div>
  )
}
