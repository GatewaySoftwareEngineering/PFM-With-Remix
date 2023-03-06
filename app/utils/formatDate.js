const formatDate = (date) => {
  const today = new Date()
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  )

  // I add plus 1 to getMonth because it starts from 0
  const dateObj = new Date(date)
  if (dateObj.toDateString() === today.toDateString()) {
    return "Today"
  } else if (dateObj.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  } else {
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`
  }
}

export { formatDate }
