import { AppLogo } from "~/shared/assets/"

export default function Index() {
  return (
    <div className="index-page">
      <div>{<AppLogo />}</div>
      <p>Let&apos;s get this done!</p>
    </div>
  )
}
