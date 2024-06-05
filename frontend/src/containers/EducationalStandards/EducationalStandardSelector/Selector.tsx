import React, {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import SearchSelector from '../../../components/SearchSelector'
import { rootState } from '../../../store/reducers'

import actions from '../actions'
import { SelectorProps } from './types'
import {getEducationalStandardsForSelector} from "../getters";

export default ({onChange, value, isReset, label, className, disabled, valueLabel}: SelectorProps) => {
  const dispatch = useDispatch()
  const list = useSelector((state: rootState) => getEducationalStandardsForSelector(state))

  const handleChangeSearchQuery = useCallback(() => {
    dispatch(actions.getEducationalStandards())
  }, [])

  const resetMenu = () => {
    // @ts-ignore
    dispatch(actions.setEducationalStandards([]))
  }

  useEffect(() => {
    dispatch(actions.getEducationalStandards())
  }, [])

  useEffect(() => {
    return resetMenu
  }, [])

  return (
    <SearchSelector
      label={label}
      changeSearchText={handleChangeSearchQuery}
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
