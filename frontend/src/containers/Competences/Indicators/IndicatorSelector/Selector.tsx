import React, {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import SearchSelector from '../../../../components/SearchSelector'
import { rootState } from '../../../../store/reducers'

import actions from '../../actions'
import { SelectorProps } from './types'
import {getIndicatorsForSelector} from "../../getters";

export default ({onChange, value, isReset, label, className, competenceId, disabled, valueLabel, cleanLabelAfterSelect}: SelectorProps) => {
  const dispatch = useDispatch()
  const list = useSelector((state: rootState) => getIndicatorsForSelector(state))

  const handleChangeSearchQuery = useCallback(() => {
    dispatch(actions.getIndicators(competenceId))
  }, [competenceId])

  const resetMenu = () => {
    dispatch(actions.setIndicators([]))
  }

  useEffect(() => {
    dispatch(actions.getIndicators(competenceId))
  }, [competenceId])

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
      cleanLabelAfterSelect={cleanLabelAfterSelect}
    />
  )
}