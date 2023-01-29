import Collapse from "~/assets/Icons/Collapse"
import Logo from "~/assets/logo/Logo.svg"
import PagesRoutes from "~/data/PagesRoutes"
import { Link, useLocation } from "@remix-run/react"
import { useState } from "react"
import PropTypes from "prop-types"

const Navbar = ({children}) => {
  const location = useLocation()
  const currentPath = location.pathname
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <nav className="sidebar-container">
      <div className={isSidebarOpen ? "collapsed" : "sidebar"}>
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>
        <div className="sidebar-menu">
          {PagesRoutes.map((route) => (
            <Link
              key={route.name}
              to={route.path}
              className={currentPath === route.path ? "active" : ""}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
      <div className={isSidebarOpen ? "sub_container_active" : "sub_container"}>
        <div className="header">
          <button onClick={toggleSidebar}>
            <Collapse />
          </button>
          <h1>
            {currentPath === "/overview"  && "Overview"}
            {currentPath === "/overview/formtransaction" && "Overview"}
            {currentPath === "/transaction" && "Transaction History"}
          </h1>
        </div>
        <div className="main">{children}</div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Navbar
