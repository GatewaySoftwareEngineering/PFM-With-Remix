import propTypes from "prop-types"

export default function Layout({ children }) {
  return (
    <>
      <h1>My App</h1>
      {children}
    </>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}
