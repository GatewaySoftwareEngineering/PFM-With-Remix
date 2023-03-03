import NavItem from "./NavItem"

export default function Navbar() {
  return (
    <nav>
      <ul>
        <NavItem to="/" title="Overview" />
        <NavItem to="/transactions" title="Transaction History" />
      </ul>
    </nav>
  )
}
