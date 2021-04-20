import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useStyles } from './Filters.styles'
import cn from 'classnames';

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SearchSelector from '../../../../components/SearchSelector'

import {languageArray, specialization} from '../../../WorkProgram/constants';
import { rootState } from '../../../../store/reducers'

import actions from '../actions'
import {filterFields} from "../../../WorkProgramList/enum";

export const Filters: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isReset, setIsReset] = useState<boolean>(false)
  const filters: any = {}
  // const filters: any = useSelector((state: rootState) => getFilters(state))
  const lists = {
    langs: languageArray,
    specialization: specialization,
  }
  const handleFilter = (field: string, value: string): void => {
    isReset && setIsReset(false)
    dispatch(actions.changeFiltering({[field]: value}))
  }

  const resetFilters = (): void => {
    setIsReset(true)
    dispatch(actions.changeFiltering({
      [filterFields.LANGUAGE]: '',
      [filterFields.NUMBER_OP]: '',
      [filterFields.NAME_OP]: '',
      [filterFields.SPECIALIZATION]: '',
    }))
    dispatch(actions.getTrainingModulesList())
  }

  return (
    <div className={classes.root}>
      <div className={classes.fieldsWrapper}>
        <SearchSelector
            label='Уровень образовательной программы'
            changeSearchText={() => {}}
            list={lists.specialization}
            changeItem={(value: string) => handleFilter(filterFields.SPECIALIZATION, value)}
            value={filters[filterFields.SPECIALIZATION]}
            valueLabel={''}
            className={classes.field}
            isReset={isReset}
        />
        <SearchSelector
          label='Структурное подразделение'
          changeSearchText={() => {}}
          list={[]}
          changeItem={(value: string) => {}}
          value={''}
          valueLabel={''}
          className={classes.field}
          isReset={isReset}
        />
        <SearchSelector
            label='Пререквизиты'
            changeSearchText={() => {}}
            list={[]}
            changeItem={(value: string) => {}}
            value={''}
            valueLabel={''}
            className={classes.field}
            isReset={isReset}
        />
        <SearchSelector
            label='Результаты'
            changeSearchText={() => {}}
            list={[]}
            changeItem={(value: string) => {}}
            value={''}
            valueLabel={''}
            className={classes.field}
            isReset={isReset}
        />
      </div>
      <div className={classes.btnsWrapper}>
        <Button
          color="primary"
          variant="outlined"
          className={cn(classes.btn, classes.resetBtn)}
          onClick={resetFilters}
        >
          Сбросить
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={cn(classes.btn, classes.filterBtn)}
          onClick={() => dispatch(actions.getTrainingModulesList())}
        >
          Отфильтровать
        </Button>
      </div>
    </div>
  )
}