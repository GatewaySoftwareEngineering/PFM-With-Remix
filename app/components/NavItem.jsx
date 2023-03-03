import { NavLink } from "@remix-run/react"
import propTypes from "prop-types"

export default function NavItem({ to, title }) {
  return (
    <li>
      <NavLink to={to}>{title}</NavLink>
    </li>
  )
}

NavItem.propTypes = {
  to: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
}
