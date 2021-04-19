import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useStyles } from './Filters.styles'
import cn from 'classnames';

import { getPlatforms, getIntitutions, getFilters, getFieldsOfStudy } from '../getters'

import Button from '@material-ui/core/Button'
import SearchSelector from '../../../components/SearchSelector'

import { filterFields, InstitutionFields, PlatformFields, FieldOfStudyFields } from '../enum'
import { PlatformType, InstitutionType, filteringType, FieldOfStudyType } from '../types'
import { languageArray } from '../../WorkProgram/constants';
import { rootState } from '../../../store/reducers'

import actions from '../actions'

export const Filters: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isReset, setIsReset] = useState<boolean>(false)
  const platforms: Array<PlatformType> = useSelector((state: rootState) => getPlatforms(state))
  const institutions: Array<InstitutionType> = useSelector((state: rootState) => getIntitutions(state))
  const fieldsOfStudy: Array<FieldOfStudyType> = useSelector((state: rootState) => getFieldsOfStudy(state))
  const filters: filteringType = useSelector((state: rootState) => getFilters(state))
  const lists = {
    langs: languageArray,
    // prepDirections: [
    //   { label: '01.03.02 Прикладная математика и информатика', value: '01.03.02' },
    //   { label: '01.04.02 Прикладная математика и информатика', value: '01.04.02' },
    //   { label: '45.03.04 нтеллектуальные системы в гуманитарной сфере', value: '45.03.04' },
    // ],
    prepDirections: fieldsOfStudy.map((fieldOfStudy: FieldOfStudyType) => 
      ({ 
          label: `${fieldOfStudy[FieldOfStudyFields.NUMBER]} ${fieldOfStudy[FieldOfStudyFields.TITLE]}`, 
          value: fieldOfStudy[FieldOfStudyFields.NUMBER] 
      })),
    authors: institutions.map((institution: InstitutionType) => ({ label: institution[InstitutionFields.TITLE], value: institution[InstitutionFields.TITLE] })),
    platforms: platforms.map((platform: PlatformType) => ({ label: platform[PlatformFields.TITLE], value: platform[PlatformFields.TITLE] }))
  }
  
  const handleFilter = (field: string, value: string): void => {
    isReset && setIsReset(false)
    dispatch(actions.changeFiltering({
      platform: field === filterFields.FILTERING_PLATFORM ? value : filters[filterFields.FILTERING_PLATFORM],
      institution: field === filterFields.FILTERING_INSTITUTION ? value : filters[filterFields.FILTERING_INSTITUTION],
      language: field === filterFields.FILTERING_LANGUAGE ? value : filters[filterFields.FILTERING_LANGUAGE]
    }))
  }

  const resetFilters = (): void => {
    setIsReset(true)
    dispatch(actions.changeFiltering({
      platform: '',
      institution: '',
      language: '',
    }))
    dispatch(actions.getCourses())
  }

  const handleChangePlatformsSearchText = (query:string): void => {
    dispatch(actions.changeFilterSearchQuery(query))
    dispatch(actions.getPlatforms())
  }

  const handleChangeInstitutionsSearchText = (query:string): void => {
    dispatch(actions.changeFilterSearchQuery(query))
    dispatch(actions.getInstitutions())
  }
  return (
    <div className={classes.root}>
      <div className={classes.fieldsWrapper}>
        <SearchSelector 
          label='Язык курса' 
          changeSearchText={() => {}}
          list={lists.langs}
          changeItem={(value: string) => handleFilter(filterFields.FILTERING_LANGUAGE, value)}
          value={filters[filterFields.FILTERING_LANGUAGE]}
          valueLabel={''}
          className={classes.field}
          isReset={isReset}
        />
        <SearchSelector
          label='Платформа' 
          changeSearchText={handleChangePlatformsSearchText}
          list={lists.platforms}
          changeItem={(value: string) => handleFilter(filterFields.FILTERING_PLATFORM, value)}
          value={filters[filterFields.FILTERING_PLATFORM]}
          valueLabel={''}
          className={classes.field}
          isReset={isReset}
        />
        <SearchSelector 
          label='Направление подготовки' 
          changeSearchText={() => {}}
          list={lists.prepDirections}
          changeItem={() => {}}
          value={'value'}
          valueLabel={''}
          className={classes.field}
        />
        <SearchSelector 
          label='Автор курса (правообл.)' 
          changeSearchText={handleChangeInstitutionsSearchText}
          list={lists.authors}
          changeItem={(value: string) => handleFilter(filterFields.FILTERING_INSTITUTION, value)}
          value={filters[filterFields.FILTERING_INSTITUTION]}
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
          onClick={() => dispatch(actions.getCourses())}
        >
          Отфильтровать
        </Button>
      </div>
    </div>
  )
}