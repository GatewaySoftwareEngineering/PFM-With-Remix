import PropTypes from "prop-types"
import { useCallback, useRef, useState } from "react"
import { Calendar } from "react-date-range"
import useOnClickOutside from "~/hooks/useOnClickOutside"
import { Calender as CalenderIcon } from "~/shared/assets/svg-components"

export default function DatePicker({
  name,
  label,
  date,
  maxDate,
  minDate,
  onSelect,
}) {
  const [isSelectorShowedUp, setIsSelectorShowed] = useState(false)

  const ref = useRef(null)

  const pickerTogglerHandler = useCallback(() => {
    setIsSelectorShowed((isSelectorShowedUp) => !isSelectorShowedUp)
  }, [])

  useOnClickOutside(ref, () => {
    setIsSelectorShowed(false)
  })

  return (
    <div className="date-picker" ref={ref}>
      <input type={"hidden"} name={name} value={date ? date.toString() : ""} />
      <div className="date-picker-toggler" onClick={pickerTogglerHandler}>
        <span className="date-picker-content">{`${label}${
          date ? ": " + date.toLocaleDateString() : ""
        }`}</span>
        <span className="date-picker-icon">
          <CalenderIcon />
        </span>
      </div>
      <div
        className={`date-picker-selector ${
          isSelectorShowedUp ? `date-picker-selector-showed` : ""
        }`}
      >
        <Calendar
          maxDate={maxDate}
          date={date ? date : new Date()}
          minDate={minDate}
          onChange={onSelect}
        />
      </div>
    </div>
  )
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  date: PropTypes.objectOf(Date),
  onSelect: PropTypes.func.isRequired,
  maxDate: PropTypes.objectOf(Date),
  minDate: PropTypes.objectOf(Date),
}

DatePicker.defaultProps = {
  date: null,
  maxDate: null,
  minDate: null,
}
