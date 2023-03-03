import Card from "./Card";

export default function Cards() {
  return (
    <section className="cards">
      <Card title="Income" amount={1000} color="blue" />
      <Card title="Balance" amount={1500} color="gray" />
      <Card title="Expense" amount={2000} color="red" />
    </section>
  )
}
