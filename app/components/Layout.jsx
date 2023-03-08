import propTypes from "prop-types"
import Header from "./Header"

export default function Layout({ children }) {
  return (
    <div className="layout">
      <div className="header">
        <Header />
      </div>
      <div className="children">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}
