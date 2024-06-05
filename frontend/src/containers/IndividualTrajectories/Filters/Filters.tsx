import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useStyles } from './Filters.styles'
import cn from 'classnames';

import { getFilters } from '../getters'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SearchSelector from '../../../components/SearchSelector'

import {languageArray, specialization} from '../../WorkProgram/constants';
import { rootState } from '../../../store/reducers'

import actions from '../actions'
import {filterFields} from "../enum";

const Filters: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isReset, setIsReset] = useState<boolean>(false)
  const filters: any = useSelector((state: rootState) => getFilters(state))
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
    dispatch(actions.getIndividualTrajectories())
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
            label='Образовательная программа'
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
        <TextField label='Номер направления подготовки'
                   onChange={(e: any) => handleFilter(filterFields.NUMBER_OP, e.target.value)}
                   variant="outlined"
                   className={classes.field}
                   value={filters[filterFields.NUMBER_OP]}
                   InputLabelProps={{
                     shrink: true,
                   }}
        />
        <TextField label='Название направления подготовки'
                   onChange={(e: any) => handleFilter(filterFields.NAME_OP, e.target.value)}
                   variant="outlined"
                   className={classes.field}
                   value={filters[filterFields.NAME_OP]}
                   InputLabelProps={{
                     shrink: true,
                   }}
        />

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
            onClick={() => dispatch(actions.getIndividualTrajectories())}
        >
          Отфильтровать
        </Button>
      </div>
    </div>
  )
}

export default Filters
