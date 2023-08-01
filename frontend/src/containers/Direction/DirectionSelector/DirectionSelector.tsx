import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import SearchSelector from '../../../components/SearchSelector'
import { rootState } from '../../../store/reducers'

import { getDirectionsForSelector } from '../getters'
import actions from '../actions'

interface SelectorProps {
  onChange: (value: number, label: string) => void;
  value: number;
  isReset?: boolean;
  className?: any;
  disabled?: boolean;
  valueLabel?: string;
}

export const DirectionSelector = ({onChange, value, isReset, className, disabled, valueLabel}: SelectorProps) => {
  const dispatch = useDispatch()

  const list = useSelector((state: rootState) => getDirectionsForSelector(state))

  useEffect(() => {
    dispatch(actions.getDirections())
  }, [])

  const handleChangeSearch = (searchText: string) => {
    dispatch(actions.changeSearchQuery(searchText))
    dispatch(actions.getDirections())
  }

  return (
    <SearchSelector
      label="Направление *"
      changeSearchText={handleChangeSearch}
      list={list}
      changeItem={(value: number, label: string) => onChange(value, label)}
      value={value}
      valueLabel={valueLabel || ''}
      isReset={isReset}
      className={classNames({[className]: className})}
      disabled={disabled}
    />
  )
}
