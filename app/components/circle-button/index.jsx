import PropTypes from "prop-types"
import { default as Button, types, sizes } from "../button"
import { variants } from "~/utils/check-variant"

export default function CircleButton({
  children,
  variant,
  size,
  buttonType,
  onClick,
  className,
  ...props
}) {
  return (
    <Button
      rounded={true}
      size={size}
      buttonType={buttonType}
      onClick={onClick}
      className={`circle-button circle-button-variant-${variant} ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

CircleButton.propTypes = {
  buttonType: PropTypes.oneOf(types),
  size: PropTypes.oneOf(sizes),
  variant: PropTypes.oneOf(variants.push(...["dark", "light"])),
  children: PropTypes.any,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

CircleButton.defaultProps = {
  buttonType: "normal",
  size: "large",
  variant: variants[0],
  onClick: null,
  className: "",
  children: "",
}
