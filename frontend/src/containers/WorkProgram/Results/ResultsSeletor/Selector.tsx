import React from 'react'
import classNames from 'classnames'
import SearchSelector from '../../../../components/SearchSelector'

import { SelectorProps } from './types'

export default ({resultsList, onChange, value, isReset, label, className, disabled, valueLabel, cleanLabelAfterSelect}: SelectorProps) => {
  return (
    <SearchSelector
      label={label}
      changeSearchText={() => {}}
      list={resultsList}
      changeItem={(value: number, label: string) => onChange(value, label)}
      value={value}
      valueLabel={valueLabel || ''}
      isReset={isReset}
      className={classNames({[className]: className})}
      disabled={disabled}
      cleanLabelAfterSelect={cleanLabelAfterSelect}
    />
  )
}