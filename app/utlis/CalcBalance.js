const income = (data) => {
  let total = 0
  data.forEach((transaction) => {
    if (
      transaction.category === "Loan" ||
      transaction.category === "Salary" ||
      transaction.category === "Gift"
    ) {
      total += transaction.amount
    }
  })
  return total
}

const expense = (data) => {
  let total = 0
  data.forEach((transaction) => {
    if (
      transaction.category !== "Loan" &&
      transaction.category !== "Salary" &&
      transaction.category !== "Gift"
    ) {
      total += transaction.amount
    }
  })
  return total
}


export { income, expense }