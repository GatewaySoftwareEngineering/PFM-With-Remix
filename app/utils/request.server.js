import { json } from "@remix-run/node"

export const badRequest = (data) => {
  return json(data, { status: 400 })
}

export const successRequest = (date) => {
  return json(date, { status: 200 })
}
