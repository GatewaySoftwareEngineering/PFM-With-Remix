import propTypes from "prop-types"
import Header from "./Header"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}
