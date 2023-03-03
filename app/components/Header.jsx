import { Link } from "@remix-run/react"
import { CiDollar } from "react-icons/ci"
import Navbar from "./Navbar"
export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="logo">
          <CiDollar className="icon"/>
          Finance Manager
        </h1>
      </Link>
      <Navbar/>
    </header>
  )
}
