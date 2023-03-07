import { getDateObj } from "./formatDate"

const filter = (list, selectedCategories, startDate, endDate) =>
  list.filter((transaction) => {
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

export { filter }
