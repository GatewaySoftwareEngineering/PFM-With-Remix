export const displayRelativeDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()

  if (today.getDate() === date.getDate()) return 'Today'
  else if (today.getDate() - date.getDate() === 1) return 'Yesterday'
  else return date.toLocaleDateString()
}
