import PropTypes from "prop-types"

function PopUps({ handleCancel, children, title }) {
  return (
    <div className="popup">
      <div className="popup_header">
        <h2>{title}</h2>
        <button onClick={handleCancel}>X</button>
      </div>
      <div className="popup_body">{children}</div>
    </div>
  )
}

PopUps.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default PopUps
