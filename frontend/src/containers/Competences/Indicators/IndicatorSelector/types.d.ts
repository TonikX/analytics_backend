export interface SelectorProps {
  onChange: (value: number, label: string) => void;
  competenceId: number;
  value: number;
  label: string;
  isReset?: boolean;
  className?: any;
  disabled?: boolean;
  valueLabel?: string;
  cleanLabelAfterSelect?: boolean;
}