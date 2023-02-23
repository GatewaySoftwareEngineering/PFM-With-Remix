import Select from "react-select"
import PropTypes from "prop-types"

export default function Dropdown({ title, options, setCategory, defaultValue, isMulti }) {
  const onChange = (e) => {
    if (isMulti) {
      const categories = e.map((item) => item.value)
      return setCategory(categories)
    }
    setCategory(e.value)
  }
  return (
    <div className="elements">
      {" "}
      {title.length?  <label className="input-title">{title}</label> : null}
      <Select name="select" options={options} onChange={onChange} defaultValue={defaultValue} isMulti={isMulti} required />
    </div>
  )
}

// default props
Dropdown.defaultProps = {
  title: "",
  defaultValue: "",
  isMulti: false,
}

// props validation
Dropdown.propTypes = {
  title: PropTypes.string,
  defaultValue: PropTypes.object,
  options: PropTypes.array.isRequired,
  setCategory: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
}
