import React, { useState, useRef, useEffect } from "react";
import UiSelectOption from "./select-option";
import IconArrow from "../icons/IconArrow";

import "./select.scss";

interface UiSelectProps {
  label?: string;
  placeholder?: string;
  dynamicPlaceholder?: boolean;
  options: { value: string; label: string }[];
  multiple?: boolean;
  disabled?: boolean;
  closeAfterSelect?: boolean;
  theme?: string;
  required?: boolean;
  modelValue?: string | string[];
  name?: string;
  onUpdateModelValue: (value: string | string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const UiSelect: React.FC<UiSelectProps> = ({
  label,
  placeholder = "",
  dynamicPlaceholder = true,
  options = [],
  multiple = false,
  disabled = false,
  closeAfterSelect = true,
  theme = "primary",
  required = false,
  modelValue,
  name,
  onUpdateModelValue,
  onFocus,
  onBlur,
}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const isDisabled = disabled || options.length === 0;

  const selectedOptions = multiple
    ? options.filter((option) => (modelValue as string[])?.includes(option.value))
    : options.filter((option) => option.value === modelValue);

  const selectedValue = multiple ? selectedOptions.map((option) => option.label).join(", ") : selectedOptions[0]?.label || "";

  const handleClick = () => {
    if (!isDisabled) {
      setHasFocus(!hasFocus);
      if (!hasFocus) {
        onFocus?.();
      } else {
        onBlur?.();
      }
    }
  };

  const handleSelectOption = (value: string) => {
    if (multiple) {
      const currentValue = (modelValue as string[]) || [];
      const newValue = currentValue.includes(value) ? currentValue.filter((v) => v !== value) : [...currentValue, value];
      onUpdateModelValue(newValue);
    } else {
      onUpdateModelValue(value);
    }

    if (closeAfterSelect && !multiple) {
      setHasFocus(false);
    }
  };

  const closeSelectDropdown = () => {
    setHasFocus(false);
    onBlur?.();
  };

  const moveDown = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= options.length - 1 ? -1 : prevIndex + 1));
  };

  const moveUp = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? options.length - 1 : prevIndex - 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasFocus) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveDown();
        break;
      case "ArrowUp":
        e.preventDefault();
        moveUp();
        break;
      case "Enter":
        e.preventDefault();
        if (currentIndex >= 0) {
          const value = options[currentIndex]?.value;
          if (value) {
            handleSelectOption(value);
          }
        }
        break;
      case "Escape":
        e.preventDefault();
        setHasFocus(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fieldRef.current &&
        !fieldRef.current.contains(event.target as Node) &&
        !selectRef.current?.querySelector(".ui-select__dropdown")?.contains(event.target as Node)
      ) {
        closeSelectDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className={`ui-select ${hasFocus ? "ui-select--opened" : ""} ui-select--theme-${theme}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {label && <div className="ui-select__label">{label}</div>}
      <div ref={fieldRef} className="ui-select__field" onClick={handleClick}>
        {!dynamicPlaceholder && placeholder && <div className="ui-select__placeholder">{placeholder}</div>}
        <input
          type="text"
          className="ui-select__input"
          value={selectedValue}
          disabled={isDisabled}
          placeholder={dynamicPlaceholder ? placeholder : ""}
          readOnly
          onClick={handleClick}
        />
        <select
          className="ui-select__native"
          name={name}
          required={required}
          multiple={multiple}
          value={modelValue}
          onChange={(e) => onUpdateModelValue(e.target.value)}
          style={{ opacity: 0, pointerEvents: "none", position: "absolute", top: 0, left: 0 }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="ui-select__arrow">
          <IconArrow className="ui-select__arrow-icon" />
        </div>
      </div>
      {hasFocus && (
        <div className="ui-select__dropdown">
          {/* <VScrollBox className="ui-select__scrollbox" resizable> */}
          <div className="ui-select__list">
            {options.map((option, index) => (
              <UiSelectOption
                key={option.value}
                isActive={index === currentIndex}
                isSelected={modelValue === option.value}
                label={option.label}
                value={option.value}
                onSelect={(value) => handleSelectOption(value)}
              />
            ))}
          </div>
          {/* </VScrollBox> */}
        </div>
      )}
    </div>
  );
};

export default UiSelect;
