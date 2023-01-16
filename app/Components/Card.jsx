import PropTypes from "prop-types"

export default function Card({ title, value, color, onClick }) {
  return (
    <div className={`card ${color}`}>
      <span className="card_head">
        <span className="card-title">{title}</span>
        <button
          className={`card-detail-button ${color}_button`}
          onClick={onClick}
        >
          details
        </button>
      </span>
      <span className="card-value">${value}</span>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
