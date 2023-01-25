import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
} from "@remix-run/react"
import PropTypes from "prop-types"
import PagesRoutes from "~/data/PagesRoutes"
import Logo from "~/assets/logo/Logo.svg"
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

function Layout({ children }) {
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <nav className="container">
      <div className="sidebar">
        <Link to="/">
          <img src={Logo} alt="logo" width="232px" height="40px" />
        </Link>
        <div className="sidebar_menu">
          {PagesRoutes.map((route) => (
            <Link
              key={route.name}
              to={route.path}
              className={currentPath == route.path ? "active" : ""}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="sub_container">
        <div className="header">
          <h1>
            {currentPath === "/" && "Overview"}
            {currentPath === "/transaction" && "Transaction History"}
          </h1>
        </div>

        <div className="main">{children}</div>
      </div>
    </nav>
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
