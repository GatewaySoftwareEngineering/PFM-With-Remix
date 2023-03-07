import { BiSearch } from "react-icons/bi"
import propTypes from "prop-types"
export default function SearchBar({ search, onSearchChange, onClearClick }) {
  return (
    <div className="search-bar">
      <div className="wrapper">
        <BiSearch className="icon" />
        <input
          type="text"
          placeholder="Search"
          className="input"
          value={search}
          onChange={onSearchChange}
        />
      </div>
      <button onClick={onClearClick} className="clear-button">
        Clear
      </button>
    </div>
  )
}

SearchBar.propTypes = {
  search: propTypes.string.isRequired,
  onSearchChange: propTypes.func.isRequired,
  onClearClick: propTypes.func.isRequired,
}
