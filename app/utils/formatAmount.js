export const formatAmount = (amount) => {
  const parsedAmount = parseInt(amount, 10)
  const suffixes = [
    { value: 1000000000, suffix: "B" },
    { value: 1000000, suffix: "M" },
    { value: 1000, suffix: "K" },
  ]
  for (const suffix of suffixes) {
    if (parsedAmount >= suffix.value) {
      return `${(parsedAmount / suffix.value).toFixed(1)}${suffix.suffix}`
    }
  }

  return parsedAmount
}
