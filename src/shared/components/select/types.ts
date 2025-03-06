export interface UiSelectOptionProps {
  label: string;
  value: string;
  isActive?: boolean;
  isSelected?: boolean;
  onSelect?: (value: string) => void;
}

export interface UiSelectProps {
  modelValue?: UiSelectValue | UiSelectValue[];
  options: UiSelectOptionProps[];
  placeholder?: string;
  label?: string;
  dynamicPlaceholder?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  closeAfterSelect?: boolean;
  theme?: "primary" | "secondary";
  name?: string;
  required?: boolean;
}

export type UiSelectValue = number | string | boolean | null | [];
