import { Link, NavLink } from "@remix-run/react"

export function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="container">
        <div className="sidebar-logo">
          <Link to="/">
            <img src="/assets/images/logo.svg" alt="logo" />
            <h1>Finance Manager</h1>
          </Link>
        </div>
        <div className="links">
          <NavLink to="/overview">Overview</NavLink>
          <NavLink to="/transactions">Transactions History</NavLink>
        </div>
      </div>
    </nav>
  )
}
