import PropTypes from "prop-types"
import { IoSearchSharp } from "react-icons/io5"

function SearchBar({ setSearch }) {
  const onInActive = (e) => {
    e.target.placeholder = "Search"
  }

  const onChangeInput = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="SearchBar" data-testid="search-bar">
      <i
        className="SearchBar__Icon"
        aria-hidden="true"
        data-testid="SearchBar__Icon"
      >
        <IoSearchSharp
          style={{ width: "30px", height: "30px", color: "#7E8594" }}
        />
      </i>
      <input
        className="SearchBar__input"
        data-testid="SearchBar__input"
        placeholder="Search"
        onChange={onChangeInput}
        onBlur={onInActive}
      />
      <button className="SearchBar__Btn">Clear</button>
    </div>
  )
}

SearchBar.propTypes = {
  setSearch: PropTypes.func.isRequired,
}

export default SearchBar
