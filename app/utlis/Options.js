const TypeIncomeOptions = [
  { value: "Loan", label: "Loan" },
  { value: "Salary", label: "Salary" },
  { value: "Gift", label: "Gift" },
]

const TypeExpenseOptions = [
  { value: "Tech", label: "Tech" },
  { value: "Food", label: "Food" },
  { value: "Bills", label: "Bills" },
  { value: "Sports", label: "Sports" },
  { value: "Health", label: "Health" },
  { value: "Cloths", label: "Cloths" },
  { value: "Education", label: "Education" },
]

function TypeOptions(type) {
  if (type === "INCOME") {
    return TypeIncomeOptions
  } else if (type === "EXPENSE") {
    return TypeExpenseOptions
  } else if (type === "ALL") {
    return [...TypeIncomeOptions, ...TypeExpenseOptions]
  } else {
    return []
  }
}

export { TypeOptions }
