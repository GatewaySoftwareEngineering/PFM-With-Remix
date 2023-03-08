import { routes } from "~/utils/route"
import NavItem from "./NavItem"

export default function Navbar() {
  const navItemsArray = routes.map((route, index) => {
    return <NavItem key={index} to={route.path} title={route.title} />
  })
  return (
    <nav>
      <ul className="navbar">{navItemsArray}</ul>
    </nav>
  )
}
