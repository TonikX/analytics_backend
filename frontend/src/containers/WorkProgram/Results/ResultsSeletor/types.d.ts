export interface SelectorProps {
  onChange: (value: number, label: string) => void;
  value: number;
  label: string;
  isReset?: boolean;
  className?: any;
  disabled?: boolean;
  valueLabel?: string;
  cleanLabelAfterSelect?: boolean;
  resultsList: {value: string|number, label: string}[]
}