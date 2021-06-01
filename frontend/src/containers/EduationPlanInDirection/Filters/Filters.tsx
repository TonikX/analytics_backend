import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useStyles } from './Filters.styles'
import cn from 'classnames';

import { getFilters } from '../getters'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SearchSelector from '../../../components/SearchSelector'
import StructuralUnitsSelector from "../../StructuralUnits/StructuralUnitsSelector";
import TrainingEntitiesSelector from '../../TrainingEntities/TrainingEntitiesSelector/TrainingEntitiesSelector'

import { specialization} from '../../WorkProgram/constants';
import { rootState } from '../../../store/reducers'

import actions from '../actions'
import {filterFields} from "../enum";

const Filters: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isReset, setIsReset] = useState<boolean>(false)
  const filters: any = useSelector((state: rootState) => getFilters(state))
  const lists = {
    specialization: specialization,
  }
  const handleFilter = (field: string, value: string | number): void => {
    isReset && setIsReset(false)
    dispatch(actions.changeFiltering({[field]: value}))
  }

  const resetFilters = (): void => {
    setIsReset(true)
    dispatch(actions.changeFiltering({
      [filterFields.NUMBER_DP]: '',
      [filterFields.NAME_DP]: '',
      [filterFields.SPECIALIZATION]: '',
      [filterFields.STRUCTURAL_UNIT]: '',
      [filterFields.PREREQUISITE]: '',
      [filterFields.OUTCOMES]: '',
    }))
    dispatch(actions.getEducationalPlansInDirection())
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
            isReset={isReset}
        />
         <StructuralUnitsSelector value={filters[filterFields.STRUCTURAL_UNIT]}
                                 onChange={(value: number) => {handleFilter(filterFields.STRUCTURAL_UNIT, value)}}
                                 isReset={isReset}
        />
        <TrainingEntitiesSelector
          label='Пререквизиты'
          onChange={(value: number) => handleFilter(filterFields.PREREQUISITE, value)}
          value={filters[filterFields.PREREQUISITE]}
          isReset={isReset}
        />
        <TrainingEntitiesSelector
          label='Результаты'
          onChange={(value: number) => handleFilter(filterFields.OUTCOMES, value)}
          value={filters[filterFields.OUTCOMES]}
          isReset={isReset}
        />
        <TextField label='Номер направления подготовки'
                   onChange={(e: any) => handleFilter(filterFields.NUMBER_DP, e.target.value)}
                   variant="outlined"
                   value={filters[filterFields.NUMBER_DP]}
                   InputLabelProps={{
                     shrink: true,
                   }}
        />
        <TextField label='Название направления подготовки'
                   onChange={(e: any) => handleFilter(filterFields.NAME_DP, e.target.value)}
                   variant="outlined"
                   value={filters[filterFields.NAME_DP]}
                   InputLabelProps={{
                     shrink: true,
                   }}
        />
      </div>
      <div style={{display: 'flex'}}>
          <Button
              color="primary"
              variant="outlined"
              className={cn(classes.btn, classes.resetBtn)}
              onClick={resetFilters}
              style={{marginRight: '10px'}}
          >
            Сбросить
          </Button>
          <Button
              color="primary"
              variant="contained"
              className={cn(classes.btn, classes.filterBtn)}
              onClick={() => dispatch(actions.getEducationalPlansInDirection())}
          >
            Отфильтровать
          </Button>
        </div>
    </div>
  )
}

export default Filters