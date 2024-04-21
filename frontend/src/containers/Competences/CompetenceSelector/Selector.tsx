import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import SearchSelector from '../../../components/SearchSelector'
import { rootState } from '../../../store/reducers'

import actions from '../actions'
import { getCompetencesForSelector } from '../getters'
import { SelectorProps } from './types'

export default ({onChange, value, isReset, label, className, valueLabel, disabled}: SelectorProps) => {
  const dispatch = useDispatch()
  const list = useSelector((state: rootState) => getCompetencesForSelector(state))

  useEffect(() => {
    dispatch(actions.getCompetences())
  }, [])

  const handleChangeSearchQuery = (query: string) => {
    dispatch(actions.changeSearchQuery(query))
    dispatch(actions.getCompetences())
  }

  const resetMenu = () => {
    dispatch(actions.changeSearchQuery(''))
    dispatch(actions.setCompetences([]))
  }

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
