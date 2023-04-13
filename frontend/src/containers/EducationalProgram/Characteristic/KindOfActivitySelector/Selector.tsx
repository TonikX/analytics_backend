import React, {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import SearchSelector from '../../../../components/SearchSelector'
import { rootState } from '../../../../store/reducers'

import actions from '../../actions'
import { SelectorProps } from './types'
import { getKindsOfActivitiesForSelector } from "../../getters";

export default ({onChange, value, isReset, label, className, disabled, valueLabel}: SelectorProps) => {
  const dispatch = useDispatch()
  const list = useSelector((state: rootState) => getKindsOfActivitiesForSelector(state))

  const handleChangeSearchQuery = useCallback((searchQuery) => {
    dispatch(actions.getKindsOfActivity(searchQuery))
  }, [])

  const resetMenu = () => {
    dispatch(actions.setKindsOfActivity([]))
  }

  useEffect(() => {
    dispatch(actions.getKindsOfActivity(''))
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