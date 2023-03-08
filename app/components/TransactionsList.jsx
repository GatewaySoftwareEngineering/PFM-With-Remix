import Transaction from "./Transaction"
import Paginate from "react-paginate"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { useEffect, useState } from "react"
import propTypes from "prop-types"
import { paginate } from "~/utils/pagination"
export default function TransactionsList({ transactions }) {
  const [currentPage, setCurrentPage] = useState(1)

  const { list: paginatedTransaction, pageCount } = paginate(
    transactions,
    10,
    currentPage
  )

  const transactionsArray = paginatedTransaction.map((transaction) => (
    <Transaction
      key={transaction.id}
      category={transaction.category}
      note={transaction.note}
      date={transaction.date}
      amount={transaction.amount}
      type={transaction.type}
    />
  ))

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [transactions])

  return (
    <section className="transactions-list">
      <div className="container">{transactionsArray}</div>

      {transactions.length > 10 ? (
        <Paginate
          pageCount={pageCount}
          previousLabel={<GrFormPrevious />}
          nextLabel={<GrFormNext />}
          initialPage={currentPage - 1}
          renderOnZeroPageCount={null}
          className="pagination"
          pageClassName="page"
          activeClassName="active"
          previousClassName="previous"
          nextClassName="next"
          disabledClassName="disabled"
          onPageChange={handlePageChange}
        />
      ) : null}
    </section>
  )
}

TransactionsList.propTypes = {
  transactions: propTypes.array.isRequired,
}
