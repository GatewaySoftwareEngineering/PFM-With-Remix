import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react"
import PropTypes from "prop-types"
import rootStyles from "~/styles/root.css"
import Navbar from "./layout/Navbar"

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
  title: "Finance App",
  viewport: "width=device-width,initial-scale=1",
})

function Layout({ children }) {
  return (
   <Navbar>
      {children}
   </Navbar>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
