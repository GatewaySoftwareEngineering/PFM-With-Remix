export const search = (list, term) =>
  list.filter((item) => {
    const note = item.note.toLowerCase()
    const amount = item.amount.toString()
    const isNoteMatch = note.includes(term.toLowerCase())
    const isAmountMatch = amount.includes(term)
    return isNoteMatch || isAmountMatch
  })
