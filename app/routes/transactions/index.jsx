import style from "~/styles/pages/transactions.css"
import Button from "~/components/button"
import Searchbar from "~/components/searchbar"
import { FilterIcon } from "~/shared/assets/svg-components/"
import DropDown from "~/components/drop-down"
import { useCallback, useEffect, useState } from "react"
import DatePicker from "~/components/date-picker"
import { db } from "~/utils/db.server"
import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react"
import Transaction from "~/components/transaction"
import CircleButton from "~/components/circle-button"
import { Arrow } from "~/shared/assets/svg-components"
import { Link } from "react-router-dom"
import { validateCategory } from "~/utils/validations.server"

export const links = () => {
  return [{ rel: "stylesheet", href: style }]
}

export const loader = async ({ request }) => {
  const TRANSACTIONS_FOR_EACH_PAGE = 8

  const url = new URL(request.url)

  let page = url.searchParams.get("page")
  page = page ? page : 1

  const transactions = await db.transaction.findMany({
    include: {
      category: true,
    },
    skip: TRANSACTIONS_FOR_EACH_PAGE * (page - 1),
    take: TRANSACTIONS_FOR_EACH_PAGE,
  })

  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  const numberOfPages = Math.ceil(
    (await db.transaction.count()) / TRANSACTIONS_FOR_EACH_PAGE
  )
  return { transactions, categories, numberOfPages }
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const search = formData.get("search")
  const fitlers = JSON.parse(formData.get("filters"))

  const selectedCategory = fitlers.selectedCategories
  const fromDate = fitlers.fromDate ? new Date(fitlers.fromDate) : null
  const toDate = fitlers.toDate ? new Date(fitlers.toDate) : null

  const validateCategoryPromise = selectedCategory.map(async (category) => {
    return validateCategory(category).then(() => {
      return category
    })
  })

  const validatedCategory = await Promise.all(validateCategoryPromise)

  // query here

  return null
}

export default function Transactions() {
  let { transactions, categories, numberOfPages } = useLoaderData()
  const submit = useSubmit()

  const [searchParams] = useSearchParams()

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1
  const previousPage = Math.max(page - 1, 1)
  const nextPage = Math.min(page + 1, numberOfPages)

  const [searchValue, setSearchValue] = useState("")

  const [filterCategorySelected, setFilterCategorySelected] = useState([])
  const [filterFromDate, setFilterFromDate] = useState(null)
  const [filterToDate, setFilterToDate] = useState(null)

  const toggleOptionHandler = useCallback(
    (key) => {
      setFilterCategorySelected(
        filterCategorySelected.includes(key)
          ? [...filterCategorySelected.filter((category) => category !== key)]
          : [...filterCategorySelected, key]
      )
    },
    [filterCategorySelected]
  )

  const submitOnFormChange = useCallback(() => {
    const formData = new FormData()
    formData.append("search", searchValue)
    formData.append(
      "filters",
      JSON.stringify({
        selectedCategories: filterCategorySelected.map(
          (index) => categories[index].name
        ),
        fromDate: filterFromDate ? filterFromDate.toString() : null,
        toDate: filterToDate ? filterToDate.toString() : null,
      })
    )
    submit(formData, { method: "post", replace: true })
  }, [filterCategorySelected, filterFromDate, filterToDate, searchValue])

  useEffect(() => {
    submitOnFormChange()
  }, [submitOnFormChange])

  return (
    <div className="transactions-page">
      <Searchbar value={searchValue} changeHandler={setSearchValue} />
      <Form className="filterbar">
        <div className="filters">
          <div className="filter-icon">
            <FilterIcon />
          </div>
          <DropDown
            name="category"
            options={categories}
            selected={filterCategorySelected}
            toggleOption={toggleOptionHandler}
          />
          <DatePicker
            name="startDate"
            label="from"
            maxDate={new Date()}
            date={filterFromDate}
            onSelect={(date) => {
              setFilterFromDate(date)
            }}
          />
          <DatePicker
            name="toDate"
            label="to"
            maxDate={new Date()}
            date={filterToDate}
            onSelect={(date) => {
              setFilterToDate(date)
            }}
          />
        </div>
        <Button
          type="button"
          className="filter-btn"
          size={"large"}
          buttonType={"normal"}
          rounded={false}
          onClick={() => {
            setFilterCategorySelected([])
            setFilterFromDate(null)
            setFilterToDate(null)
          }}
        >
          Clear
        </Button>
      </Form>
      <div className="transaction-list">
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
      <div
        className={`pagination-section ${
          numberOfPages == 1 ? `page-section-hide` : ""
        }`}
      >
        <Link
          to={`/transactions/?page=${previousPage}`}
          className={page == 1 ? "disable" : ""}
        >
          <CircleButton buttonType={"ghost"} size={"small"} variant={"dark"}>
            <Arrow className="left-arrow-icon" />
          </CircleButton>
        </Link>
        {[...Array(numberOfPages > 4 ? 4 : numberOfPages).keys()].map((i) => {
          i += 1
          if (page != 1) {
            i += page - 2
          }
          return (
            <Link
              to={`/transactions/?page=${i}`}
              key={i}
              className={i > numberOfPages ? "disable" : ""}
            >
              <CircleButton
                size={"small"}
                buttonType={page == i ? "normal" : "ghost"}
              >
                {i + ""}
              </CircleButton>
            </Link>
          )
        })}
        <Link
          to={`/transactions/?page=${nextPage}`}
          className={page == numberOfPages ? "disable" : ""}
        >
          <CircleButton
            className={page == numberOfPages ? "disable" : ""}
            size={"small"}
            buttonType={"ghost"}
            variant={"dark"}
          >
            <Arrow className="right-arrow-icon" />
          </CircleButton>
        </Link>
      </div>
    </div>
  )
}
