import { PropTypes } from 'prop-types';
import Card from "~/Components/Card"
import Transaction from "~/Components/Transaction"
import Dropdown from "~/Components/dropdown"
import overviewStyles from "~/styles/overview.css"
import { IoClose } from "react-icons/io5"
import { useState, useEffect, useMemo } from "react"
import CurrencyInput from "react-currency-input-field"
import { redirect } from "@remix-run/node"

import { useLoaderData } from "@remix-run/react"

export const loader = async () => {
  const res = await fetch(" http://localhost:3000/Data", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  const data = await res.json()
  console.log(data)
  return data
}

export const action = async ({ request }) => {
  const body = new URLSearchParams(await request.text())
  const category = body.get("category")
  const createdAt = body.get("createdAt")
  const amount = body.get("amount")
  const type = body.get("type")
  const note = body.get("note")
  if (amount !== "" || category !== "" || note !== "") {
    fetch("http://localhost:3000/Data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(Math.floor(Math.random() * 100000) + 1),
        note: note,
        category: category,
        type: type,
        amount: Number(amount),
        createdAt: createdAt,
        currency: "USD",
      }),
    })
  }
  return redirect("/overview")
}

export const links = () => [
  {
    rel: "stylesheet",
    href: overviewStyles,
  },
]

function Modal({ handleClose }) {
  const [category, setCategory] = useState("")
  const [startDate, setDate] = useState(new Date())
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState("INCOME")
  const [note, setNote] = useState("")

  const [categoryType, setCategoryType] = useState([])

  const TypeIncomeOptions = useMemo(
    () => [
      { value: "Loan", label: "Loan" },
      { value: "Salary", label: "Salary" },
      { value: "Gift", label: "Gift" },
    ],
    []
  )

  const TypeExpenseOptions = useMemo(
    () => [
      { value: "Tech", label: "Tech" },
      { value: "Food", label: "Food" },
      { value: "Bills", label: "Bills" },
      { value: "Sports", label: "Sports" },
      { value: "Health", label: "Health" },
      { value: "Cloths", label: "Cloths" },
    ],
    []
  )

  useEffect(() => {
    if (type === "INCOME") {
      setCategoryType([...TypeIncomeOptions])
    } else if (type === "EXPENSE") {
      setCategoryType([...TypeExpenseOptions])
    } else {
      setCategoryType([])
    }
  }, [type, TypeIncomeOptions, TypeExpenseOptions])

  const handleSubmit = (e) => {
    e.preventDefault()

    const transaction = {
      category,
      createdAt: startDate,
      amount,
      type,
      note,
      currency: "USD",
    }
    console.log(transaction)
    handleClose()
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-header-text">Add Transaction</span>
          <IoClose className="modal-close-button-icon" onClick={handleClose} />
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="modal-body-row-1">
            <Dropdown
              title="Category"
              options={categoryType}
              setCategory={setCategory}
            />
            <div className="elements">
              <label className="input-title">Date</label>
              <span className="date-elements">
                <input
                  className="date-picker"
                  type="text"
                  name="date"
                  placeholder={
                    startDate && startDate.toISOString().slice(0, 10)
                  }
                  defaultValue={startDate && startDate.toISOString().slice(0, 10)}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  required
                />
              </span>
            </div>
            <div className="elements">
              <label className="input-title">Amount</label>
              <CurrencyInput
                className="amount"
                name="input-name"
                placeholder="$"
                prefix="$"
                decimalsLimit={2}
                allowDecimals={true}
                onValueChange={(value) => setAmount(value)}
                required
              />
            </div>
          </div>
          <div className="modal-body-row-2">
            <div className="radio-group">
              <span className="input-title">Type</span>
              <div
                className="radio-elements"
                onChange={(e) => setType(e.target.value)}
              >
                <label className="radio-element">
                  <input
                    type="radio"
                    name="type"
                    value="INCOME"
                    checked={true}
                  />
                  income
                </label>
                <label className="radio-element">
                  <input type="radio" name="type" value="EXPENSE" />
                  expense
                </label>
              </div>
            </div>
            <div className="note-group">
              <label>Note</label>
              <textarea
                maxLength="350"
                name="note"
                className="note"
                onChange={(e) => setNote(e.target.value)}
                required
                onInvalid={F => F.target.setCustomValidity('Enter Transaction Note Here')} 
              ></textarea>
              <span>{`${note.length}/350`}</span>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-dismiss">Dismiss</button>
            <button className="btn-transaction" type="submit">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default function Overview() {
  // use useEffect to set the state of the transactions
  // only set the transactions from the mockedTransactions that are from this week if empty, set the transactions from last month if empty, set the transactions from last year
  // only show 10 transactions
  const [transactions, setTransactions] = useState([])
  const [timeline, setTimeline] = useState("This Week")
  const data = useLoaderData()
  useEffect(() => {
    console.log(data)
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
      {modal && <Modal handleClose={handleModal} />}
      <div className="Main_Content__Header">
        <h1 className="Main_Content__Text">Overview</h1>
      </div>
      <div className="Overview">
        <div className="Card_Container">
          <Card
            value="1000000"
            title="Income"
            color="blue"
            onClick={handleClick}
          />
          <Card
            value="10000"
            title="Balance"
            color="grey"
            onClick={handleClick}
          />
          <Card
            value="100000"
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
                transaction // map through the transactions and render a Transaction component for each transaction
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


