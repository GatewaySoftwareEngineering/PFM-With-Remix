import { PropTypes } from "prop-types"
import { HiOutlineAcademicCap, HiOutlineChip } from "react-icons/hi"
import { AiOutlineGift } from "react-icons/ai"
import { TbBriefcase } from "react-icons/tb"
import { IoFastFoodOutline } from "react-icons/io5"
import { CiMoneyBill } from "react-icons/ci"
import { MdOutlineSportsTennis, MdOutlineHealthAndSafety } from "react-icons/md"
import { GiClothes } from "react-icons/gi"

export default function Transaction({ category, amount, date, note }) {
  const objDate = new Date()
  const recivedDate = new Date(date).toLocaleDateString("en-US")
  const today = new Date().toLocaleDateString("en-US")
  let yestrday = new Date(objDate.getTime())
  yestrday.setDate(objDate.getDate() - 1)
  yestrday = yestrday.toLocaleDateString("en-US")

  if (recivedDate === today) {
    date = "Today"
  }
  if (recivedDate === yestrday) {
    date = "Yesterday"
  }

  const formatAmount = (amount) => {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + "B"
    } else if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + "M"
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + "K"
    } else {
      return amount
    }
  }

  const icon = {
    Salary: <TbBriefcase className="Green-Icon" />,
    Loan: <TbBriefcase className="Green-Icon" />,
    Gift: <AiOutlineGift className="Blue-Icon" />,

    Tech: <HiOutlineChip className="Green-Icon" />,
    Food: <IoFastFoodOutline className="Blue-Icon" />,
    Bills: <CiMoneyBill className="Green-Icon" />,
    Sports: <MdOutlineSportsTennis className="Blue-Icon" />,
    Health: <MdOutlineHealthAndSafety className="Blue-Icon" />,
    Cloths: <GiClothes className="Green-Icon" />,
    Education: <HiOutlineAcademicCap className="Blue-Icon" />,
  }

  const TypeIncomeOptions = ["Loan", "Salary", "Gift"]

  return (
    <div className="transaction-item">
      <div className="transaction_head">
        {icon[category]}
        <span className="transaction_note">{note}</span>
      </div>
      <div className="transaction_body">
        <span className="transaction_date">{date}</span>
        <span className={`${TypeIncomeOptions.includes(category)? "transaction_amount__income" : "transaction_amount__expense"}`}>${formatAmount(amount)}</span>
      </div>
    </div>
  )
}

Transaction.propTypes = {
  category: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
}
