interface ITextTone {
  label: string;
  value: string;
  isActive: boolean;
  isSelected: boolean;
}

export const tonality: ITextTone[] = [
  {
    label: "нейтральный",
    value: "NEUTRAL",
    isActive: true,
    isSelected: true,
  },
  {
    label: "оптимистичный",
    value: "OPTIMISTIC",
    isActive: false,
    isSelected: false,
  },
  {
    label: "дружелюбный",
    value: "FRIENDLY",
    isActive: false,
    isSelected: false,
  },
  {
    label: "шутливый",
    value: "JOKING",
    isActive: false,
    isSelected: false,
  },
  {
    label: "сочувствующий",
    value: "SYMPATHETIC",
    isActive: false,
    isSelected: false,
  },
  {
    label: "напористый",
    value: "ASSERTIVE",
    isActive: false,
    isSelected: false,
  },
  {
    label: "официальный",
    value: "FORMAL",
    isActive: false,
    isSelected: false,
  },
];
