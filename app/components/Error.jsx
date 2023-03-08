import propTypes from "prop-types"
export default function Error({ error }) {
  return <p className="form-validation-error">{error}</p>
}

Error.propTypes = {
  error: propTypes.string.isRequired,
}
