import { db } from "./db.server"

export const validateCategory = async (categoryName) => {
  if (!categoryName) {
    return "Category not defined!"
  }
  categoryName += ""

  const result = await db.category.findUnique({
    where: { name: categoryName },
    select: { id: true },
  })

  if (result) {
    return `Category with name: ${categoryName} not exist!`
  }
  return null
}

export const validateNote = (note) => {
  if (!note) {
    return "Note not defined!"
  } else if (note.length > 350) {
    return `Note have 350 character limitaion. the current length is ${note.length}`
  }
  return null
}

export const validateAmount = (amount) => {
  amount = +amount
  if (isNaN(amount)) {
    return `Amount is not a number`
  } else if (amount <= 0) {
    return `Amount value should be greater then Zero`
  }
  return null
}

export const validateDate = (date, shouldBeforeNow) => {
  if (!date) {
    return "Date not exist!"
  } else if (!(date instanceof Date)) {
    return "Date is not a type of Date object"
  }

  if (shouldBeforeNow && date > new Date()) {
    return "Date should be in the past."
  }
  return null
}
