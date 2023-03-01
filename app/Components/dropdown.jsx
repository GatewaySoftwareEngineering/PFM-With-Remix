import Select from "react-select"
import {PropTypes} from "prop-types"

export default function Dropdown({ name, title, options, setCategory, defaultValue, isMulti }) {
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
      <Select id="long-value-select" instanceId="long-value-select" htmlFor={name} name={name} options={options} onChange={onChange} defaultValue={defaultValue} isMulti={isMulti} required />
    </div>
  )
}

// default props
Dropdown.defaultProps = {
  title: "",
  defaultValue: "",
  isMulti: false,
  name: "",
}

// props validation
Dropdown.propTypes = {
  title: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.array.isRequired,
  setCategory: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
  name: PropTypes.string,
}
