import Transaction from "./Transaction"

export default function LatestTransactions() {
  return (
    <section className="latest-transactions">
      <h3 className="title">This Week</h3>
      <div className="container">
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet"
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet "
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet "
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet "
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet "
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet "
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet "
          date={new Date(Date.now())}
          amount={45}
        />
        <Transaction
          type="tech"
          title="lorem ipsum dolor sit amet "
          date={new Date(Date.now())}
          amount={45}
        />
      </div>
      <button className="add-transaction">Add Transaction</button>
    </section>
  )
}
