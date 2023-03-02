import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { Sidebar } from "~/components/sidebar"
import { Topbar } from "~/components/topbar"

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
  title: "Personal Finance Manager",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="index-page">
          <Sidebar />
          <div className="content">
            <Topbar />
            <div className="appdata">
              <Outlet />
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
