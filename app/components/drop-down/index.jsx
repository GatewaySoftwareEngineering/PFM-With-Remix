import PropTypes from "prop-types"
import { useCallback, useRef, useState } from "react"
import useOnClickOutside from "~/hooks/useOnClickOutside"
import { Checked, Arrow } from "~/shared/assets/svg-components"

export default function DropDown({ name, options, selected, toggleOption }) {
  const [isListShowedUp, setIsListShowedUp] = useState(false)

  const ref = useRef(null)

  const listToggleHandler = useCallback(() => {
    setIsListShowedUp((isListShowedUp) => !isListShowedUp)
  }, [])

  useOnClickOutside(ref, () => {
    setIsListShowedUp(false)
  })

  return (
    <div className="dropdown" ref={ref}>
      <input
        type={"hidden"}
        name={name}
        value={JSON.stringify({
          selected: selected.map((index) => options[index].name),
        })}
      />
      <div className="dropdown-select" onClick={listToggleHandler}>
        <span className="dropdown-select-title">
          {selected.length !== 0
            ? selected.reduce(
                (generatedText, currentIndex) =>
                  `${generatedText}${generatedText ? ", " : ""}${
                    options[currentIndex].name
                  }`,
                ""
              )
            : "select something"}
        </span>
        <Arrow height={14} width={14} />
      </div>
      <ul
        className={`dropdown-list ${
          isListShowedUp ? "dropdown-list-showed" : ""
        } `}
        role={"listbox"}
      >
        {options.map((item, index) => {
          const isSelected = selected.includes(index)
          const isDisabled = item.disabled
          return (
            <li
              className="dropdown-option"
              onClick={isDisabled ? null : () => toggleOption(index)}
              data-disabled={isDisabled}
              key={index}
            >
              <div className="option-check-box">
                {isSelected ? <Checked /> : <></>}
              </div>
              <div className="option-title">{item.name}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleOption: PropTypes.func.isRequired,
}
