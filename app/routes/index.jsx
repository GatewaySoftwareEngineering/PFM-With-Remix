import Card from "~/Components/Card"
import Transaction from "~/Components/Transaction"
import overviewStyles from "~/styles/overview.css"

export const links = () => [
  {
    rel: "stylesheet",
    href: overviewStyles,
  },
]

export default function Overview() {
  function handleClick() {
    console.log("Clicked")
  }
  return (
    <>
      <div className="Main_Content__Header">
        <h1 className="Main_Content__Text">Overview</h1>
      </div>
      <div className="Overview">
        <div className="Card_Container">
          <Card
            value="1000000"
            title="Income"
            color="blue"
            onClick={handleClick}
          />
          <Card
            value="10000"
            title="Balance"
            color="grey"
            onClick={handleClick}
          />
          <Card
            value="100000"
            title="Expense"
            color="red"
            onClick={handleClick}
          />
        </div>
        <div className="week_list">
          <h1 className="week_list_header">This Week</h1>
          <div className="week_lists">
            <Transaction
              category="Education"
              amount="1000"
              date="01/17/2023"
              note="12 Rules for life by Jordan Peterson signed by himself..."
            />
            <Transaction
              category="Salary"
              amount="1000"
              date="01/16/2023"
              note="Salary After Promotion"
            />
            <Transaction
              category="Tech"
              amount="1000"
              date="01/15/2023"
              note="Latest blue yeti microphone"
            />
          </div>
        </div>
        <div className="list-Add">
          <button className="list-button">Add Transaction</button>
        </div>
      </div>
    </>
  )
}
