import PropTypes from "prop-types"

export default function CurrencyInput({ value, changeHandler }) {
  return (
    <div className="currency-input-component">
      <span>$</span>
      <input type={"number"} value={value} onChange={changeHandler} />
    </div>
  )
}

CurrencyInput.propTypes = {
  value: PropTypes.number.isRequired,
  changeHandler: PropTypes.func.isRequired,
}
