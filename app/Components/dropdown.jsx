import Select from "react-select"
import PropTypes from "prop-types"

export default function Dropdown({ title, options, setCategory }) {
  const onChange = (e) => {
    setCategory(e.value)
  }
  return (
    <div className="elements">
      {" "}
      <label className="input-title">{title}</label>
      <Select name="select" options={options} onChange={onChange} required />
    </div>
  )
}

// props validation
Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setCategory: PropTypes.func.isRequired,
}
