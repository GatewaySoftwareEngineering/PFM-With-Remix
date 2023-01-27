const overviewCards = [
  {
    title: 'Income',
    value: '1000',
    variant: 'info',
  },
  {
    title: 'Balance',
    value: '25000',
    variant: 'neutral',
  },
  {
    title: 'Expense',
    value: '4520',
    variant: 'error',
  },
]

export default function Index() {
  return (
    <div className="main-section-container">
      <div className="overview-cards-container">
        {overviewCards.map((card, i) => (
          <div
            key={i}
            className={`overview-card ${card.variant} ${card.variant}-gradient`}
          >
            <div>
              <h5>{card.title}</h5>
              <h1 className="dollar">{card.value}</h1>
            </div>
            <button className={card.variant}>Details</button>
          </div>
        ))}
      </div>
    </div>
  )
}
