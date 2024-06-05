import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useStyles } from './Filters.styles'
import cn from 'classnames';

import { getPlatforms, getIntitutions, getFilters, getFieldsOfStudyTitles, getFieldsOfStudyNumbers } from '../getters'

import Button from '@mui/material/Button'
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
  const fieldsOfStudyTitles: Array<FieldOfStudyType> = useSelector((state: rootState) => getFieldsOfStudyTitles(state))
  const fieldsOfStudyNumbers: Array<FieldOfStudyType> = useSelector((state: rootState) => getFieldsOfStudyNumbers(state))
  const filters: filteringType = useSelector((state: rootState) => getFilters(state))
  const lists = {
    langs: languageArray,
    prepDirectionsNumbers: fieldsOfStudyNumbers.map((fieldOfStudy: FieldOfStudyType) =>
      ({
          label: fieldOfStudy[FieldOfStudyFields.NUMBER],
          value: fieldOfStudy[FieldOfStudyFields.NUMBER]
      })),
    prepDirectionsTitles: fieldsOfStudyTitles.map((fieldOfStudy: FieldOfStudyType) =>
      ({
          label: fieldOfStudy[FieldOfStudyFields.TITLE],
          value: fieldOfStudy[FieldOfStudyFields.TITLE],
      })),
    authors: institutions.map((institution: InstitutionType) => ({ label: institution[InstitutionFields.TITLE], value: institution[InstitutionFields.TITLE] })),
    platforms: platforms.map((platform: PlatformType) => ({ label: platform[PlatformFields.TITLE], value: platform[PlatformFields.TITLE] }))
  }

  const handleFilter = (field: string, value: string): void => {
    isReset && setIsReset(false)
    dispatch(actions.changeFiltering({
      platform: field === filterFields.FILTERING_PLATFORM ? value : filters[filterFields.FILTERING_PLATFORM],
      institution: field === filterFields.FILTERING_INSTITUTION ? value : filters[filterFields.FILTERING_INSTITUTION],
      language: field === filterFields.FILTERING_LANGUAGE ? value : filters[filterFields.FILTERING_LANGUAGE],
      fieldOfStudyNumber: field === filterFields.FILTERING_FIELD_OF_STUDY_NUMBER ? value : filters[filterFields.FILTERING_FIELD_OF_STUDY_NUMBER],
      fieldOfStudyTitle: field === filterFields.FILTERING_FIELD_OF_STUDY_TITLE ? value : filters[filterFields.FILTERING_FIELD_OF_STUDY_TITLE],
    }))
  }

  const resetFilters = (): void => {
    setIsReset(true)
    dispatch(actions.changeFiltering({
      platform: '',
      institution: '',
      language: '',
      fieldOfStudyNumber: '',
      fieldOfStudyTitle: '',
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

  const handleChangeFieldOfStudyNumberSearchText = (query:string): void => {
    dispatch(actions.changeFilterSearchQuery(query))
    dispatch(actions.getFieldOfStudyNumbers())
  }

  const handleChangeFieldOfStudyTitleSearchText = (query:string): void => {
    dispatch(actions.changeFilterSearchQuery(query))
    dispatch(actions.getFieldOfStudyTitles())
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
          isReset={isReset}
        />
        <SearchSelector
          label='Платформа'
          changeSearchText={handleChangePlatformsSearchText}
          list={lists.platforms}
          changeItem={(value: string) => handleFilter(filterFields.FILTERING_PLATFORM, value)}
          value={filters[filterFields.FILTERING_PLATFORM]}
          valueLabel={''}
          isReset={isReset}
        />

        <SearchSelector
          label='Автор курса (правообл.)'
          changeSearchText={handleChangeInstitutionsSearchText}
          list={lists.authors}
          changeItem={(value: string) => handleFilter(filterFields.FILTERING_INSTITUTION, value)}
          value={filters[filterFields.FILTERING_INSTITUTION]}
          valueLabel={''}
          isReset={isReset}
        />
        <SearchSelector
          label='Номер направления'
          changeSearchText={handleChangeFieldOfStudyNumberSearchText}
          list={lists.prepDirectionsNumbers}
          changeItem={(value: string) => handleFilter(filterFields.FILTERING_FIELD_OF_STUDY_NUMBER, value)}
          value={filters[filterFields.FILTERING_FIELD_OF_STUDY_NUMBER]}
          valueLabel={''}
          isReset={isReset}
        />
        <SearchSelector
          label='Направление'
          changeSearchText={handleChangeFieldOfStudyTitleSearchText}
          list={lists.prepDirectionsTitles}
          changeItem={(value: string) => handleFilter(filterFields.FILTERING_FIELD_OF_STUDY_TITLE, value)}
          value={filters[filterFields.FILTERING_FIELD_OF_STUDY_TITLE]}
          valueLabel={''}
          isReset={isReset}
        />
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

    </div>
  )
}
