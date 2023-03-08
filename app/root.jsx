import { Outlet, useCatch } from "@remix-run/react"
import propTypes from "prop-types"

import rootStyles from "~/styles/root.css"
import Layout from "~/components/Layout"
import datePickerStyles from "react-datepicker/dist/react-datepicker.css"
import Document from "~/components/Document"
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
    href: datePickerStyles,
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
  const { message, name } = error
  return (
    <Document>
      <Layout>
        <div className="error-container error-boundary">
          <h1 className="title">{name}</h1>
          <p className="message">{message}</p>
        </div>
      </Layout>
    </Document>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  return (
    <Document>
      <Layout>
        <div className="error-container catch-boundary ">
          <h1 className="status">{caught.status}</h1>
          <p className="status-text">
            {caught.statusText || "Something went wrong"}
          </p>
          <p className="message">{caught.data || "Something went wrong"}</p>
        </div>
      </Layout>
    </Document>
  )
}

ErrorBoundary.propTypes = {
  error: propTypes.object.isRequired,
}
