import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { Children } from "react"

import rootStyles from "~/styles/root.css"

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: rootStyles,
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

// Layout component
function Layout({ children }) {
  return (
    <container className="container">
      <nav className="side-nav">
        <Link to="/">Finance Manager</Link>
        <ul>
          <Link to="/dashboard">Overview</Link>
          <Link to="/transactions">Transaction History</Link>
        </ul>
      </nav>
      <main className="main-content">{children}</main>
    </container>
  )
}
// props validation
Layout.propTypes = {
  children: Children.isRequired,
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
  children: Children.isRequired,
}
