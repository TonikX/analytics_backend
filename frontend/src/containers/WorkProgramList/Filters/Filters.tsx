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
import StructuralUnitsSelector from "../../StructuralUnits/StructuralUnitsSelector";
import EducationPlanInDirectionSelectorByName from '../../EduationPlanInDirection/EducationPlanInDirectionSelector/ByName/EducationPlanInDirectionSelectorByName'
import TrainingEntitiesSelector from '../../TrainingEntities/TrainingEntitiesSelector/TrainingEntitiesSelector'

const Filters: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isReset, setIsReset] = useState<boolean>(false)
  const filters: any = useSelector((state: rootState) => getFilters(state))
  const lists = {
    langs: languageArray,
    specialization: specialization,
  }
  const handleFilter = (field: string, value: string|number): void => {
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
      [filterFields.STRUCTURAL_UNIT]: '',
      [filterFields.EDU_PROGRAM]: '',
      [filterFields.PREREQUISITE]: '',
      [filterFields.OUTCOMES]: '',
    }))
    dispatch(actions.getWorkProgramList())
  }

  return (
    <div className={classes.root}>
      <div className={classes.fieldsWrapper}>
        <SearchSelector 
          label='Язык рабочей программы'
          changeSearchText={() => {}}
          list={lists.langs}
          changeItem={(value: string) => handleFilter(filterFields.LANGUAGE, value)}
          value={filters[filterFields.LANGUAGE]}
          valueLabel={''}
          className={classes.field}
          isReset={isReset}
        />
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
        <StructuralUnitsSelector value={filters[filterFields.STRUCTURAL_UNIT]}
                                 onChange={(value: number) => handleFilter(filterFields.STRUCTURAL_UNIT, value)}
                                 isReset={isReset}
        />
        <EducationPlanInDirectionSelectorByName 
          noMargin handleChange={(value: string) => handleFilter(filterFields.EDU_PROGRAM, value)} 
          className={classes.field} 
          isReset={isReset}
          value={filters[filterFields.EDU_PROGRAM]}
        />
        <TrainingEntitiesSelector
          label='Пререквизиты'
          onChange={(value: number) => handleFilter(filterFields.PREREQUISITE, value)}
          value={filters[filterFields.PREREQUISITE]}
          className={classes.field}
          isReset={isReset}
        />
        <TrainingEntitiesSelector
          label='Результаты'
          onChange={(value: number) => handleFilter(filterFields.OUTCOMES, value)}
          value={filters[filterFields.OUTCOMES]}
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
          onClick={() => dispatch(actions.getWorkProgramList())}
        >
          Отфильтровать
        </Button>
      </div>
    </div>
  )
}

export default Filters;