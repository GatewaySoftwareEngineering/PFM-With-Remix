import { useEffect } from "react"

function useOnClickOutside(ref, handler) {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handler(e)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  })
}

export default useOnClickOutside
