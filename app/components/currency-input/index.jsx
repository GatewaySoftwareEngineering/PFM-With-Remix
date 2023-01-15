import PropTypes from "prop-types"

export default function CurrencyInput({ name, value, changeHandler }) {
  return (
    <div className="currency-input-component">
      <span>$</span>
      <input
        name={name}
        type={"number"}
        min={0}
        value={value}
        onChange={changeHandler}
      />
    </div>
  )
}

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
}
