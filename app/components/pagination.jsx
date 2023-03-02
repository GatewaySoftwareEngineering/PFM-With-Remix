import { Link, useSearchParams } from "@remix-run/react"

const Pagination = ({ count, totalPages, pageParam }) => {
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get(pageParam) || 1)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const setPage = (page) => {
    const params = new URLSearchParams(queryParams)
    params.set(pageParam, page)
    return { search: params.toString() }
  }

  return (
    <div className="pagination">
      <div className="label">
        <p>
          Showing
          <span>{currentPage}</span>
          to
          <span>{Math.min(currentPage * 10, count)}</span>
          of
          <span>{count}</span>
          results
        </p>
      </div>
      <div>
        <nav aria-label="controls">
          <Link
            to={setPage(currentPage - 1)}
            className={"previous" + (currentPage === 1 ? " disabled" : "")}
          >
            <img src="../assets/images/icons/chevron-left.svg" alt="prev" />
            <span>Prev</span>
          </Link>
          {pages.map((page) => (
            <Link
              key={page}
              to={setPage(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`page-number ${
                page === currentPage ? "current-page" : ""
              }`}
            >
              {page}
            </Link>
          ))}
          <Link
            to={setPage(currentPage + 1)}
            className={"next" + (currentPage === totalPages ? " disabled" : "")}
          >
            <span>Next</span>
            <img src="../assets/images/icons/chevron-right.svg" alt="next" />
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Pagination
