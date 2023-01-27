import { Dialog } from "@reach/dialog"
import dialogStyles from "@reach/dialog/styles.css"
export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: dialogStyles,
    },
  ]
}

export const meta = () => {
  return {
    title: "Add Transaction",
  }
}

export default function Add() {
  const transition = useTransition()
  function onDismiss() {
    navigate("/overview")
  }

  const disabled =
    transition.state === "submitting" || transition.state === "loading"

  return (
    <Dialog
      isOpen={true}
      aria-label="Add transaction"
      onDismiss={onDismiss}
      className="modal modal-content"
    >
      {transition.state === "submitting" ? <div>Saving...</div> : null}
      <div className="modal-header">
        <h3>Add transaction</h3>
        <button className="close-modal" onClick={onDismiss} disabled={disabled}>
          &times;
        </button>
      </div>
    </Dialog>
  )
}
