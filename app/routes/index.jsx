import propTypes from "prop-types"
import Card from "~/Components/Card"
import Transaction from "~/Components/Transaction"
import Dropdown from "~/Components/dropdown"
import overviewStyles from "~/styles/overview.css"
import { IoClose } from "react-icons/io5"
import { useState, useEffect } from "react"
import { BsCalendar2Date } from "react-icons/bs"

import { mockedTransactions } from "~/mocks/transactions"


export const links = () => [
  {
    rel: "stylesheet",
    href: overviewStyles,
  },
]

function Modal({ handleClose }) {
  const [category, setCategory] = useState("")
  const [startDate, setDate] = useState(new Date())

  const selectDateHandler = (e) => {
    setDate(e.target.value)
  }

  const options = [
    { value: "Education", label: "Education" },
    { value: "Salary", label: "Salary" },
    { value: "Tech", label: "Tech" },
  ]
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-header-text">Add Transaction</span>
          <IoClose className="modal-close-button-icon" onClick={handleClose} />
        </div>

        <form className="modal-body">
          <div className="modal-body-row-1">
            <Dropdown
              title="Category"
              options={options}
              setCategory={setCategory}
              selected={category}
            />
            <div className="elements">
              <label className="input-title">Date</label>
              <span className="date-elements">
                <input
                  className="date-picker"
                  type="date"
                  value={startDate}
                  onChange={selectDateHandler}
                />
                <BsCalendar2Date className="calendar-icon" />
              </span>
            </div>
            <div className="elements">
              <label className="input-title">Amount</label>
              <input type="number" className="amount" placeholder="$" />
            </div>
          </div>
          <div className="modal-body-row-2">
            <div className="radio-group">
              <label className="input-title">Type</label>
              <div className="radio-elements">
                <span className="radio-element">
                  <input type="radio" name="type" value="INCOME" />
                  <label>income</label>
                </span>
                <span className="radio-element">
                  <input
                    type="radio"
                    name="type"
                    value="EXPENSE"
                    onChange={() => {}}
                  />
                  <label>expense</label>
                </span>
              </div>
            </div>
            <div className="note-group">
              <label>Note</label>
              <textarea name="note" className="note"></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-dismiss">Dismiss</button>
            <button className="btn-transaction">Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  )
}

Modal.propTypes = {
  handleClose: propTypes.func.isRequired,
}

export default function Overview() {
  // use useEffect to set the state of the transactions
  // only set the transactions from the mockedTransactions that are from this week if empty, set the transactions from last month if empty, set the transactions from last year
  // only show 10 transactions
  const [transactions, setTransactions] = useState([])
  const [timeline, setTimeline] = useState("This Week")
  useEffect(() => {
    const today = new Date()
    const thisWeek = mockedTransactions.filter((transaction) => {
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
      const lastMonth = mockedTransactions.filter((transaction) => {
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
        const lastYear = mockedTransactions.filter((transaction) => {
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
            {transactions.map((transaction) => ( // map through the transactions and render a Transaction component for each transaction
              <Transaction
                key={transaction.id}
                category={transaction.category}
                amount={transaction.amount}
                date={transaction.createdAt}
                note={transaction.note}
              />
            ))}
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
