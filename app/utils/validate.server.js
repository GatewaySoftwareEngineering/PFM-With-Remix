import { CATEGORIES as validCategories } from "./constants"

function isEmpty(val) {
  return !val || val.trim() === ""
}

export function validateDate(date) {
  if (isEmpty(date)) {
    return "Date is required"
  }
  if (isNaN(Date.parse(date))) {
    return "Date is invalid"
  }
  if (new Date(date) > new Date()) {
    return "Date cannot be in the future"
  }
}

export function validateCategory(category, type) {
  if (isEmpty(category)) {
    return "Category is required"
  }

  if (!validCategories[type].includes(category)) {
    return "Category is invalid"
  }

}

export function validateType(type) {
  if (isEmpty(type)) {
    return "Type is required"
  }

  if (type !== "income" && type !== "expense") {
    return "Type is invalid"
  }
}

export function validateAmount(amount) {
  if (isEmpty(amount)) {
    return "Amount is required"
  }

  if (isNaN(amount)) {
    return "Amount is invalid"
  }

  if (amount < 0) {
    return "Amount cannot be negative"
  }

  if (amount % 1 !== 0) {
    return "Amount cannot have decimals"
  }
}

export function validateNote(note) {
  if (isEmpty(note)) {
    return "Note is required"
  }

  if (typeof note !== "string") {
    return "Note must be a string"
  }

  if (note.length < 4) {
    return "Note must be at least 4 characters"
  }

  if (note.length > 350) {
    return "Note cannot be longer than 350 characters"
  }
}

export function validateSearch(search) {
  if (isEmpty(search)) {
    return "Search is required"
  }

  if (typeof search !== "string") {
    return "Search must be a string"
  }
}

export function validateFromDate(fromDate) {
  if (isEmpty(fromDate)) {
    return "From date is required"
  }

  if (isNaN(Date.parse(fromDate))) {
    return "From date is invalid"
  }
}

export function validateToDate(toDate) {
  if (isEmpty(toDate)) {
    return "To date is required"
  }

  if (isNaN(Date.parse(toDate))) {
    return "To date is invalid"
  }
}

export function validateDateRange(fromDate, toDate) {
  if (fromDate && toDate) {
    if (new Date(fromDate) > new Date(toDate)) {
      return "From date cannot be after to date"
    }
  }
}
