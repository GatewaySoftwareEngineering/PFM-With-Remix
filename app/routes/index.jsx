import { Form, useLoaderData, useTransition } from "@remix-run/react"
import { db } from "~/utils/db.server"
import Button from "~/components/button"
import Card from "~/components/card"
import Transaction from "~/components/transaction"
import styles from "~/styles/pages/overview.css"
import { CrossSignIcon } from "~/shared/assets/svg-components"
import PropTypes from "prop-types"
import DropDown from "~/components/drop-down"
import { useCallback, useState } from "react"
import DatePicker from "~/components/date-picker"
import CurrencyInput from "~/components/currency-input"
import { badRequest, successRequest } from "~/utils/request.server"
import {
  validateAmount,
  validateCategory,
  validateDate,
  validateNote,
} from "~/utils/validations.server"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader = async () => {
  const transactions = await db.transaction.findMany({
    include: {
      category: true,
    },
    take: 10,
    orderBy: {
      date: "desc",
    },
  })

  const categories = await db.category.findMany()

  const cardData =
    await db.$queryRaw`SELECT type, sum(amount) as total FROM "Transaction" INNER JOIN "Category" ON "Transaction".categoryId = "Category".id GROUP BY type`

  return { transactions, categories, cardData }
}

export const action = async ({ request }) => {
  const form = await request.formData()
  const category = JSON.parse(form.get("category")).selected[0]
  const note = form.get("note")
  const amount = parseFloat(form.get("amount"))
  const stringDate = form.get("date")
  const date = new Date(stringDate)

  const fields = { category, note, amount, date }
  const fieldErrors = {
    category: await validateCategory(category),
    note: validateNote(note),
    amount: validateAmount(amount),
    date: validateDate(date),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    })
  }

  const { id: categoryId } = await db.category.findUnique({
    where: {
      name: category,
    },
  })

  await db.transaction.create({
    data: {
      note: note,
      date: date,
      amount: amount,
      categoryId: categoryId,
    },
  })

  return successRequest({ succeed: true })
}

/* Modal Component */
function Modal({ categoryOptions, closeHandler }) {
  const transition = useTransition()
  const [formCategoryType, setFormCategoryType] = useState("INCOME")
  const [selectedCategory, setSelectedCategory] = useState([])
  const [formDate, setFormDate] = useState(null)
  const [formAmount, setFormAmount] = useState(0)

  categoryOptions.forEach((item) => {
    item.disabled = item.type !== formCategoryType
  })

  const toggleOptionHandler = useCallback((key) => {
    setSelectedCategory([key])
  }, [])

  const radioButtonClickHandler = useCallback(
    (e) => {
      setFormCategoryType(e.target.value)
      setSelectedCategory([])
    },
    [setFormCategoryType]
  )

  return (
    <div className={`modal-container`}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-text-header">Add Transaction</span>
          <div className="modal-close-button">
            <CrossSignIcon width="100%" height="100%" onClick={closeHandler} />
          </div>
        </div>
        <Form method="POST" className="modal-body">
          <div>
            <label htmlFor="drop-down">Category</label>
            <DropDown
              id="drop-down"
              options={categoryOptions}
              selected={selectedCategory}
              toggleOption={toggleOptionHandler}
              name="category"
            />
          </div>
          <div>
            <label htmlFor="date-picker">Date</label>
            <DatePicker
              date={formDate}
              name="date"
              label="date"
              maxDate={new Date()}
              onSelect={setFormDate}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <CurrencyInput
              name="amount"
              value={formAmount + ""}
              changeHandler={(e) => {
                setFormAmount(e.target.value)
              }}
            />
          </div>
          <div className="type-radio-group">
            <label htmlFor="types">Type</label>
            <div>
              <span>
                <input
                  type="radio"
                  name="type"
                  value="INCOME"
                  id="income"
                  checked={formCategoryType == "INCOME"}
                  onChange={() => {}}
                  onClick={radioButtonClickHandler}
                />
                <label htmlFor="income">income</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="type"
                  value="EXPENSE"
                  id="expense"
                  onChange={() => {}}
                  checked={formCategoryType == "EXPENSE"}
                  onClick={radioButtonClickHandler}
                />
                <label htmlFor="expense">expense</label>
              </span>
            </div>
          </div>
          <div className="note-container">
            <label htmlFor="note">Note</label>
            <textarea id="note" name="note" className="note"></textarea>
          </div>

          <div className="modal-footer">
            <Button
              variant={"dark"}
              size={"large"}
              buttonType={"ghost"}
              onClick={closeHandler}
            >
              Dismiss
            </Button>
            <Button
              variant={"primary"}
              size={"large"}
              buttonType={"normal"}
              type={"submit"}
              className={"form-submit-button"}
            >
              {transition.state === "submitting"
                ? "Saving..."
                : transition.state === "loading"
                ? "Saved!"
                : "Add Transaction"}
            </Button>
          </div>
        </Form>
      </div>
      )
    </div>
  )
}

export default function Overview() {
  const { transactions, categories, cardData } = useLoaderData()

  const [modalHidden, setModalHidden] = useState(true)

  const income = cardData.filter((data) => data.type === "INCOME")[0].total
  const expense = cardData.filter((data) => data.type === "EXPENSE")[0].total

  return (
    <div className="overview-page">
      {modalHidden ? (
        ""
      ) : (
        <Modal
          categoryOptions={categories}
          closeHandler={() => {
            setModalHidden(true)
          }}
        />
      )}
      <div className="card-list">
        <Card
          title="income"
          key={"income"}
          value={income}
          variant="info"
          onDetailIsClicked={() => {}}
        />
        <Card
          title="balance"
          key={"balance"}
          value={income - expense}
          variant="secondary"
          onDetailIsClicked={() => {}}
        />
        <Card
          title="expense"
          key={"expense"}
          value={expense}
          variant="danger"
          onDetailIsClicked={() => {}}
        />
      </div>
      <div className="transaction-list">
        <h1 className="transaction-list-header">This Week</h1>
        <div className="transaction-list-list">
          {transactions.map(({ id, note, amount, date, category }) => {
            return (
              <Transaction
                key={id}
                category={category.name}
                type={category.type}
                title={note}
                amount={amount}
                date={new Date(date)}
              />
            )
          })}
        </div>
      </div>
      <div className="button-list">
        <Button
          variant={"primary"}
          size={"large"}
          buttonType={"normal"}
          className={"add-transaction-button"}
          onClick={() => setModalHidden(!modalHidden)}
        >
          Add Transaction
        </Button>
      </div>
    </div>
  )
}

Modal.propTypes = {
  categoryOptions: PropTypes.array.isRequired,
  closeHandler: PropTypes.func.isRequired,
}
