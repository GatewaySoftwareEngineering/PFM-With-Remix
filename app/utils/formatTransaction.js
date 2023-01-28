const getDayName = (date) => {
  const objDate = new Date()
  const newDate = new Date(date).toLocaleDateString("en-US")
  const today = new Date().toLocaleDateString("en-US")
  let yestrday = new Date(objDate.getTime())
  yestrday.setDate(objDate.getDate() - 1)
  yestrday = yestrday.toLocaleDateString("en-US")

  if (newDate === today) {
    date = "Today"
  } else if (newDate === yestrday) {
    date = "Yesterday"
  }

  return date
}

const formattedAmount = (amount) => {
  let formattedAmount = ""
  if (amount >= 1000 && amount < 1000000) {
    formattedAmount = `${amount / 1000}K`
  } else if (amount >= 1000000) {
    formattedAmount = `${amount / 1000000}M`
  } else {
    formattedAmount = `${amount}`
  }
  return formattedAmount
}

export { getDayName, formattedAmount }
