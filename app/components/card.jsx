const Card = ({ name, amount }) => {

  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "IQD",
  })

  return (
    <div className={`card ${name}`}>
      <div className="card-body">
        <h5 className="card-title">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h5>
        <p className="card-text">{formattedAmount}</p>
      </div>
      <div className="card-action">
        <button type="button">Details</button>
      </div>
    </div>
  )
}

export default Card
