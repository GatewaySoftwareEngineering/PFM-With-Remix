import PropTypes from "prop-types"
import {
  NavLink,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { AiOutlineDollar } from "react-icons/ai"
import rootStyles from "~/styles/root.css"

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: rootStyles,
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Inter",
  },
]

/**
 * @returns {import("@remix-run/node").MetaFunction}
 */
export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
    <Layout>
      <div className="ErrorBoundary">
        <h1 className="ErrorBoundary__Text">Something went wrong</h1>
        <p className="ErrorBoundary__Text">{error.message}</p>
      </div>
    </Layout>
    </Document>
  )
}

// props validation
ErrorBoundary.propTypes = {
  error: PropTypes.object.isRequired,
}

// Layout component
function Layout({ children }) {
  const activeStyle = {
    color: "white",
  }
  return (
    <div className="container">
      <nav className="nav">
        <div className="nav_Logo">
          <AiOutlineDollar className="nav_Logo_icon" />
          <NavLink className="nav_Logo_text" to="/">
            Finance Manager
          </NavLink>
        </div>
        <ul>
          <NavLink
            className="nav_item"
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Overview
          </NavLink>
          <NavLink
            className="nav_item"
            to="/transactions"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Transaction History
          </NavLink>
        </ul>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  )
}
// props validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

// Document component
function Document({ children }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

// props validation
Document.propTypes = {
  children: PropTypes.node.isRequired,
}
