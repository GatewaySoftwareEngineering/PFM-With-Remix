const formatAmount = (amount) => {
  const billion = 1000000000
  const million = 1000000
  const thousand = 1000

  if (amount >= billion) {
    return `${(amount / billion).toFixed(1)}B`
  } else if (amount >= million) {
    return `${(amount / million).toFixed(1)}M`
  } else if (amount >= thousand) {
    return `${(amount / thousand).toFixed(1)}K`
  } else {
    return amount
  }
}

export { formatAmount }
