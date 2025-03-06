import React, { useState, useRef } from "react";
import "./input.scss";

interface WBInputProps {
  id?: string;
  type?: string;
  value?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  isReadonly?: boolean;
  placeholder?: string;
  icon?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input: React.FC<WBInputProps> = ({
  id,
  type = "text",
  value = "",
  label = "",
  error = "",
  disabled = false,
  isReadonly = false,
  placeholder = "",
  icon,
  required = false,
  onChange,
  onFocus,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const isPasswordType = type === "password";
  const inputType = isPasswordType ? (isPasswordVisible ? "text" : "password") : type;

  const classList = {
    _active: isFocused,
    _filled: value,
    _disabled: disabled,
    _error: error.length > 0,
    _readonly: isReadonly,
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    onChange?.(target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div
      className={`input ${Object.entries(classList)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(" ")}`}
    >
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      <div className="input__wrapper">
        <input
          id={inputId}
          ref={inputRef}
          aria-label={label}
          className="input__native"
          tabIndex={0}
          type={inputType}
          placeholder={placeholder}
          value={value}
          readOnly={isReadonly}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleInput}
          disabled={disabled}
        />
        {isPasswordType && !isReadonly && (
          <button type="button" className="input__password-toggle" onClick={togglePasswordVisibility} tabIndex={-1}>
            {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
          </button>
        )}
        {icon && <span className="input__icon">{icon}</span>}
        {error && <span className="input__error-icon">⚠️</span>}
      </div>
      {error.length > 0 && <span className="input__message">{error}</span>}
    </div>
  );
};

export default Input;
