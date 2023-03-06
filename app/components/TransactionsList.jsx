import Transaction from "./Transaction"
import Paginate from "react-paginate"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
export default function TransactionsList() {
  return (
    <section className="transactions-list">
      <div className="container"></div>
      <Paginate
        pageCount={5}
        previousLabel={<GrFormPrevious />}
        nextLabel={<GrFormNext />}
        renderOnZeroPageCount={null}
        className="pagination"
        pageClassName="page"
        activeClassName="active"
        previousClassName="previous"
        nextClassName="next"
        disabledClassName="disabled"
      />
    </section>
  )
}
