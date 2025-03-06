import React, { useState } from "react";
import IconTrash from "../icons/IconTrash";

import "./textarea-field.scss";

interface FormTextareaFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

const TextareaField: React.FC<FormTextareaFieldProps> = ({ label, placeholder, value, onChange, onClear }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <div className="form-textarea-field">
      <div className={`form-textarea-field__wrapper${isFocused ? "_focused" : ""}`}>
        <p className="form-textarea-field__label">{label}</p>
        {onClear && (
          <div className="form-textarea-field__controls">
            <button type="button" className="form-textarea-field__controls-icon" onClick={handleClear}>
              <IconTrash />
            </button>
          </div>
        )}

        <textarea
          value={value}
          onChange={handleTextareaChange}
          placeholder={placeholder}
          className="form-textarea-field__textarea"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default TextareaField;
