import propTypes from "prop-types"
import Card from "~/Components/Card"
import Transaction from "~/Components/Transaction"
import Dropdown from "~/Components/dropdown"
import overviewStyles from "~/styles/overview.css"
import { IoClose } from "react-icons/io5"
import { useState } from "react"
import { BsCalendar2Date } from "react-icons/bs"

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
          <h1 className="week_list_header">This Week</h1>
          <div className="week_lists">
            <Transaction
              category="Education"
              amount="1000"
              date="01/17/2023"
              note="12 Rules for life by Jordan Peterson signed by himself..."
            />
            <Transaction
              category="Salary"
              amount="1000"
              date="01/16/2023"
              note="Salary After Promotion"
            />
            <Transaction
              category="Tech"
              amount="1000"
              date="01/15/2023"
              note="Latest blue yeti microphone"
            />
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
