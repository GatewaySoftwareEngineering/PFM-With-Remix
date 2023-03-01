const url = "http://localhost:8000/Data"

const GetData = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    return await response.json()
  } catch (error) {
    return console.log(error)
  }
}

const PostData = async ({ note, category, type, amount, createdAt, currency }) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(Math.floor(Math.random() * 100000) + 1),
        note: note,
        category: category,
        type: type,
        amount: Number(amount),
        createdAt: createdAt,
        currency: currency,
      }),
    })
    return await response.json()
  } catch (error) {
    return console.log(error)
  }
}

export { GetData, PostData }
