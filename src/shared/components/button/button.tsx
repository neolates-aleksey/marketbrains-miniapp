import React from "react";
import cn from "classnames";
import "./button.scss";

interface ButtonProps {
  label?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "primary-white" | "secondary" | "secondary-white" | "tertiary" | "actions";
  size?: "m" | "l" | "xl";
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  variant = "primary",
  size = "l",
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  onClick,
  className = "",
}) => {
  const buttonClasses = [
    "ui-button",
    `_${variant}`,
    `_size-${size}`,
    disabled ? "_disabled" : "",
    loading ? "_loading" : "",
    iconLeft ? "_icon-left" : "",
    iconRight ? "_icon-right" : "",
    iconRight || (iconLeft && !label) ? "_icon-solo" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={buttonClasses} disabled={disabled || loading} onClick={onClick}>
      {iconLeft && <span className={cn("ui-button__icon", { "ui-button__icon_left": label, "ui-button__icon_alone": !label })}>{iconLeft}</span>}

      {label && <span className="ui-button__label">{label}</span>}

      {iconRight && <span className={cn("ui-button__icon", { "ui-button__icon_right": label, "ui-button__icon_alone": !label })}>{iconRight}</span>}

      {loading && (
        <div className="ui-button__loader">
          <div className="ui-button__loader-spinner"></div>
        </div>
      )}
    </button>
  );
};

export default Button;
