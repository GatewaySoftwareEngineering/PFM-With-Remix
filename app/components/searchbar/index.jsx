import PropTypes from "prop-types"
import { SearchIcon } from "~/shared/assets/svg-components"
import Button from "../button"

export default function Searchbar({ value, changeHandler }) {
  return (
    <div className="searchbar-container">
      <div className="text-bar">
        <span>
          <SearchIcon />
        </span>
        <input
          type={"text"}
          placeholder="Search"
          value={value}
          onChange={(e) => {
            changeHandler(e.target.value)
          }}
        />
      </div>
      <Button
        className="search-btn"
        size={"large"}
        buttonType={"normal"}
        rounded={false}
        onClick={() => {
          changeHandler("")
        }}
      >
        clear
      </Button>
    </div>
  )
}

Searchbar.propTypes = {
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
}
