import Transaction from "./Transaction"
import Paginate from "react-paginate"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
export default function TransactionsList() {
  return (
    <section className="transactions-list">
      <div className="container">
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
      </div>
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
