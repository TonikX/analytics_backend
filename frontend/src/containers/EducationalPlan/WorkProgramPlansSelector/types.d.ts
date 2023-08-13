export interface SelectorProps {
  onChange: (value: number, label: string) => void;
  value: number;
  label: string;
  isReset?: boolean;
  className?: any;
  disabled?: boolean;
  valueLabel?: string;
  workProgramId?: number;
  practiceId?: number;
}