import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'


import { SelectorProps } from './types'
import SearchSelector from "../../../../../components/SearchSelector";
import {rootState} from "../../../../../store/reducers";
import actions from "../../../actions";
import {getDependentDirections} from "../../../getters";
import get from "lodash/get";

export default ({onChange, value, isReset, label, className, disabled, valueLabel, practiceId}: SelectorProps) => {
  const dispatch = useDispatch();

  const list = useSelector((state: rootState) => getDependentDirections(state));

  useEffect(() => {
    dispatch(actions.getCompetencesDependedOnPractice(practiceId))
  }, []);

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
