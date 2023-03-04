import { BiSearch } from "react-icons/bi"

export default function SearchBar() {
  return (
    <div className="search-bar">
      <div className="wrapper">
          <BiSearch className="icon"/>
          <input type="text" placeholder="Search" className="input" />
      </div>
      <button className="clear-button">Clear</button>
    </div>
  )
}
