import React from "react";
import "./button.scss";

interface ButtonProps {
  label?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "primary-white" | "secondary" | "secondary-white" | "tertiary" | "actions";
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
    disabled ? "_disabled" : "",
    loading ? "_loading" : "",
    iconLeft ? "_icon-left" : "",
    iconRight ? "_icon-right" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={buttonClasses} disabled={disabled || loading} onClick={onClick}>
      {iconLeft && <span className="ui-button__icon _left">{iconLeft}</span>}

      {label && <span className="ui-button__label">{label}</span>}

      {iconRight && <span className="ui-button__icon _right">{iconRight}</span>}

      {loading && (
        <div className="ui-button__loader">
          <div className="ui-button__loader-spinner"></div>
        </div>
      )}
    </button>
  );
};

export default Button;
