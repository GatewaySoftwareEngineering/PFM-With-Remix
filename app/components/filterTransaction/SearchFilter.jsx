import PropTypes from "prop-types"

function SearchFilter({ search, setSearch, clearSearch }) {
  return (
    <div className="transaction_history_search">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={clearSearch}>Clear</button>
    </div>
  )
}

SearchFilter.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
}

export default SearchFilter
