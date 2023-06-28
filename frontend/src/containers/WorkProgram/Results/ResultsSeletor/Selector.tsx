import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import SearchSelector from '../../../../components/SearchSelector'
import { rootState } from '../../../../store/reducers'

import { SelectorProps } from './types'
import {getResultsForSelect} from "../../getters";

export default ({onChange, value, isReset, label, className, disabled, valueLabel, cleanLabelAfterSelect}: SelectorProps) => {
  const list = useSelector((state: rootState) => getResultsForSelect(state))

  return (
    <SearchSelector
      label={label}
      changeSearchText={() => {}}
      list={list}
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