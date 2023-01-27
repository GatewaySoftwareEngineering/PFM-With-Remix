import styleUrl from "~/styles/overview.css"
export let links = () => [
  { rel: "stylesheet", href: styleUrl },
]
export let meta = () => ({ title: "Overview - Personal Finance Manager" })
export default function OverviewRoute() {
  return (
    <div className="overview-container">
    </div>
  )
}
