import propTypes from "prop-types"

export default function Topbar({ title }) {
  return (
    <div className="topbar">
      <h2 className="title">{title}</h2>
    </div>
  )
}

Topbar.propTypes = {
  title: propTypes.string.isRequired,
}
