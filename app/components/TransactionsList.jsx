import Transaction from "./Transaction"

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
        
        
      </div>
      <div className="pagination">Pagination</div>
    </section>
  )
}
