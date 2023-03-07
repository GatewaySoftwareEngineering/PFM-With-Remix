import { options } from "./categories"
import { getDateObj } from "./formatDate"

const categoryOptions = [...options["income"], ...options["expense"]].map(
  (option) => option.value
)

export const validateCategory = (category) => {
  if (!category) return "Category is required"
  if (!categoryOptions.includes(category)) return "Category is invalid"

  return null
}

export const validateDate = (date) => {
  if (!date) return "Date is required"
  if (getDateObj(date) > new Date()) return "Date cannot be in the future"

  return null
}

export const validateAmount = (amount) => {
  if (!amount) return "Amount is required"
  if (parseInt(amount, 10) < 0) return "Amount cannot be negative"

  return null
}

export const validateType = (type) => {
  if (!type) return "Type is required"
  if (!["income", "expense"].includes(type)) return "Type is invalid"

  return null
}

export const validateNote = (note) => {
  if (!note) return "Note is required"
  if (note.length > 350 || note.length < 0)
    return "Note must be between 0 and 350 characters"

  return null
}
