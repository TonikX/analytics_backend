import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import SearchSelector from '../../../components/SearchSelector'
import { rootState } from '../../../store/reducers'

import { SelectorProps } from './types'
import { getDirectionsDependedOnWorkProgramForSelector } from '../getters'
import actions from '../actions'

export default ({onChange, value, isReset, label, className, disabled, valueLabel, workProgramId}: SelectorProps) => {
  const dispatch = useDispatch()

  const list = useSelector((state: rootState) => getDirectionsDependedOnWorkProgramForSelector(state))

  useEffect(() => {
    dispatch(actions.getCompetenceDirectionsDependedOnWorkProgram(workProgramId))
  }, [])

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
    />
  )
}