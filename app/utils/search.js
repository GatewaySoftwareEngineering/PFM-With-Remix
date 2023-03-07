export const search = (list, field, term) => {
  const searchedItems = list.filter((item) =>
    item[field].toLowerCase().includes(term.toLowerCase())
  )

  return searchedItems
}
