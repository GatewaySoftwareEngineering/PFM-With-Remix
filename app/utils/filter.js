import { getDateObj } from "./formatDate"

const filter = (list, selectedCategories, startDate, endDate) => {
  const filteredList = list.filter((transaction) => {
    const isCategorySelected = selectedCategories.length
      ? selectedCategories.some(
          (category) => category.value === transaction.category
        )
      : true
    const isDateInRange =
      getDateObj(transaction.date) >= startDate &&
      getDateObj(transaction.date) <= endDate
    return isCategorySelected && isDateInRange
  })

  return filteredList
}

export { filter }
