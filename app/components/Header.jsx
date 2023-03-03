import { Link } from "@remix-run/react"
import { CiDollar } from "react-icons/ci"
export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header-logo">
          <CiDollar />
          Finance Manager
        </h1>
      </Link>
    </header>
  )
}
