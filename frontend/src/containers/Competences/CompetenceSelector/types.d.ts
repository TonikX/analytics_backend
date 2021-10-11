export interface SelectorProps {
  onChange: (value: number, label: string) => void,
  value: number,
  label: string,
  isReset?: boolean,
  className?: any,
  valueLabel?: string,
  disabled?: boolean,
}