import React from "react";
import { UiSelectOptionProps } from "./types";
import "./select.scss";

const UiSelectOption: React.FC<UiSelectOptionProps> = ({ label, value, isActive = false, isSelected = false, onSelect }) => {
  const classes = `ui-select-option ${isActive ? "_active" : ""} ${isSelected ? "_selected" : ""}`;

  const handleClick = () => {
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div className={classes} onClick={handleClick}>
      {label}
    </div>
  );
};

export default UiSelectOption;
