import { useLocation } from "@remix-run/react"

const pages = {
  overview: "Overview",
  transactions: "Transactions History",
  default: "Personal Finance Manager",
}

export function Topbar() {
  const currentPath = useLocation().pathname.split("/")[1]
  const pageTitle = pages[currentPath] || pages.default

  return (
    <div className="topbar">
      <div className="container">
        <div>
          <h3>{pageTitle}</h3>
        </div>
      </div>
    </div>
  )
}
