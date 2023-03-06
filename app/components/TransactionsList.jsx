import Transaction from "./Transaction"
import Paginate from "react-paginate"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"
import { paginate } from "~/utils/pagination"
export default function TransactionsList() {
  const [currentPage, setCurrentPage] = useState(1)
  const { transactions } = useLoaderData()

  const { list: paginatedTransaction, pageCount } = paginate(
    transactions,
    5,
    currentPage
  )
  const transactionsArray = paginatedTransaction.map((transaction) => (
    <Transaction
      key={transaction.id}
      category={transaction.category}
      note={transaction.note}
      date={transaction.date}
      amount={parseInt(transaction.amount, 10)}
      type={transaction.type}
    />
  ))

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1)
  }
  return (
    <section className="transactions-list">
      <div className="container">{transactionsArray}</div>
      <Paginate
        pageCount={pageCount}
        previousLabel={<GrFormPrevious />}
        nextLabel={<GrFormNext />}
        renderOnZeroPageCount={null}
        className="pagination"
        pageClassName="page"
        activeClassName="active"
        previousClassName="previous"
        nextClassName="next"
        disabledClassName="disabled"
        onPageChange={handlePageChange}
      />
    </section>
  )
}
