import Card from "~/Components/Card"
import Transaction from "~/Components/Transaction"
import overviewStyles from "~/styles/overview.css"
import AddTransactionModal from "~/Components/AddTransactionModal"
import { useState, useEffect } from "react"

import { useLoaderData } from "@remix-run/react"
import { income, expense } from "~/utlis/CalcBalance"

export const loader = async () => {
  const res = await fetch(" http://localhost:8000/Data", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  const data = await res.json()
  return data
}

export const links = () => [
  {
    rel: "stylesheet",
    href: overviewStyles,
  },
]

export default function Overview() {

  const [transactions, setTransactions] = useState([])
  const [timeline, setTimeline] = useState("This Week")
  const data = useLoaderData()
  useEffect(() => {
    const today = new Date()
    const thisWeek = data.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt)
      return (
        transactionDate.getFullYear() === today.getFullYear() &&
        transactionDate.getMonth() === today.getMonth() &&
        transactionDate.getDate() >= today.getDate() - 7
      )
    })
    if (thisWeek.length > 0) {
      setTransactions(thisWeek.slice(0, 10))
      setTimeline("This Week")
    } else {
      const lastMonth = data.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt)
        return (
          transactionDate.getFullYear() === today.getFullYear() &&
          transactionDate.getMonth() === today.getMonth() - 1
        )
      })
      if (lastMonth.length > 0) {
        setTransactions(lastMonth.slice(0, 10))
        setTimeline("Last Month")
      } else {
        const lastYear = data.filter((transaction) => {
          const transactionDate = new Date(transaction.createdAt)
          return transactionDate.getFullYear() === today.getFullYear() - 1
        })
        if (lastYear.length > 0) {
          setTransactions(lastYear.slice(0, 10))
          setTimeline("Last Year")
        }
      }
    }
  }, [])

  const [modal, setModal] = useState(false)
  function handleClick() {
    console.log("Clicked")
  }
  function handleModal() {
    setModal(!modal)
  }

  return (
    <>
      {modal && <AddTransactionModal handleClose={handleModal} />}
      <div className="Main_Content__Header">
        <h1 className="Main_Content__Text">Overview</h1>
      </div>
      <div className="Overview">
        <div className="Card_Container">
          <Card
            value={income(data)}
            title="Income"
            color="blue"
            onClick={handleClick}
          />
          <Card
            value={income(data) - expense(data)}
            title="Balance"
            color="grey"
            onClick={handleClick}
          />
          <Card
            value={expense(data)}
            title="Expense"
            color="red"
            onClick={handleClick}
          />
        </div>
        <div className="week_list">
          <h1 className="week_list_header">{timeline}</h1>
          <div className="week_lists">
            {transactions.map(
              (
                transaction 
              ) => (
                <Transaction
                  key={transaction.id}
                  category={transaction.category}
                  amount={transaction.amount}
                  date={transaction.createdAt}
                  note={transaction.note}
                />
              )
            )}
          </div>
        </div>
        <div className="list-Add">
          <button className="list-button" onClick={handleModal}>
            Add Transaction
          </button>
        </div>
      </div>
    </>
  )
}


