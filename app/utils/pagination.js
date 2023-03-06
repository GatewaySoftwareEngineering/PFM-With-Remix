const paginate = (list, pageSize, currentPage) => {
  const pageCount = Math.ceil(list.length / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedList = list.slice(startIndex, endIndex)

  return {
    list: paginatedList,
    pageCount,
  }
}

export { paginate }
