import propTypes from "prop-types"
import { FaMoneyBillAlt } from "react-icons/fa"
import { AiOutlineGift } from "react-icons/ai"
import { GiReceiveMoney, GiHealthNormal, GiClothes } from "react-icons/gi"
import { GrTechnology } from "react-icons/gr"
import { IoFastFoodOutline } from "react-icons/io5"
import { MdAttachMoney, MdOutlineSportsSoccer } from "react-icons/md"
import { formatAmount } from "~/utils/formatAmount"
import { formatDate } from "~/utils/formatDate"

const icons = {
  salary: <FaMoneyBillAlt className="icon green" />,
  loan: <GiReceiveMoney className="icon green" />,
  gift: <AiOutlineGift className="icon green" />,
  tech: <GrTechnology className="icon blue" />,
  food: <IoFastFoodOutline className="icon blue" />,
  bills: <MdAttachMoney className="icon blue" />,
  sports: <MdOutlineSportsSoccer className="icon blue" />,
  health: <GiHealthNormal className="icon blue" />,
  clothes: <GiClothes className="icon blue" />,
}
export default function Transaction({ category, note, date, amount, type }) {
  const formattedAmount = formatAmount(amount)
  const formattedDate = formatDate(date)
  const amountElement =
    type === "income" ? (
      <p className="amount green">+${formattedAmount}</p>
    ) : (
      <p className="amount red">-${formattedAmount}</p>
    )
  return (
    <div className="transaction">
      <div className="wrapper">
        {icons[category]}
        <p className="note">{note}</p>
      </div>
      <div className="wrapper">
        <p className="date">{formattedDate}</p>
        {amountElement}
      </div>
    </div>
  )
}
Transaction.propTypes = {
  category: propTypes.string.isRequired,
  note: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  amount: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
}
