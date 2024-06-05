import React, {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import SearchSelector from '../../../components/SearchSelector'
import { rootState } from '../../../store/reducers'

import actions from '../actions'
import { SelectorProps } from './types'
import {getProfStandardsForSelector} from "../getters";

export default ({onChange, value, isReset, label, className, disabled, valueLabel}: SelectorProps) => {
  const dispatch = useDispatch()
  const list = useSelector((state: rootState) => getProfStandardsForSelector(state))

  const handleChangeSearchQuery = useCallback((searchQuery) => {
    dispatch(actions.changeSearchQuery(searchQuery))
    dispatch(actions.getProfessionalStandards())
  }, [])

  const resetMenu = () => {
    dispatch(actions.setProfessionalStandards([]))
  }

  useEffect(() => {
    dispatch(actions.getProfessionalStandards())
  }, [])

  useEffect(() => {
    return resetMenu
  }, [])

  useEffect(() => {
    return () => {
      dispatch(actions.changeSearchQuery(''))
    }
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
