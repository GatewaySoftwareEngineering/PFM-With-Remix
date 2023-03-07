import { options } from "./categories"
import { getDateObj } from "./formatDate"

const categoryOptions = [...options["income"], ...options["expense"]]

export const validateCategory = (category) => {
  if (!category) return "Category is required"
  if (!categoryOptions.includes(category)) return "Category is invalid"
}

export const validateDate = (date) => {
  if (!date) return "Date is required"
  if (getDateObj(date) > new Date()) return "Date cannot be in the future"
}

export const validateAmount = (amount) => {
  if (!amount) return "Amount is required"
  if (parseInt(amount, 10) < 0) return "Amount cannot be negative"
}

export const validateType = (type) => {
  if (!type) return "Type is required"
  if (!["income", "expense"].includes(type)) return "Type is invalid"
}

export const validateNote = (note) => {
  if (!note) return "Note is required"
  if (note.length > 350 || note.length < 0)
    return "Note must be between 0 and 350 characters"
}
