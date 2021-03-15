import React from 'react'
import { useSelector } from 'react-redux'
import { useStyles } from './Filters.styles'
import cn from 'classnames';
import { PlatformType, InstitutionType } from '../types'
import { getPlatforms, getIntitutions } from '../getters'

import Button from '@material-ui/core/Button'
import SeacrhSelector from '../../../components/SearchSelector'
import { rootState } from '../../../store/reducers'

export const Filters: React.FC = () => {
  const classes = useStyles()
  const platforms: Array<PlatformType> = useSelector((state: rootState) => getPlatforms(state))
  const institutions: Array<InstitutionType> = useSelector((state: rootState) => getIntitutions(state))
  const lists = {
    langs: [
      { label: 'Русский', value: 'ru' },
      { label: 'Английский', value: 'en' },
      { label: 'Русский/Английский', value: 'ru/en' },
    ],
    prepDirections: [
      // { label: '45.03.04', value: 'Русский' },
      // { label: '09.03.04', value: 'Английский' },
    ],
    authors: institutions.map((institution: InstitutionType) => ({ label: institution.title, value: institution.id })),
    platforms: platforms.map((platform: PlatformType) => ({ label: platform.title, value: platform.id }))
  }
  return (
    <div className={classes.root}>
      <div className={classes.fieldsWrapper}>
        <SeacrhSelector 
          label='Язык курса' 
          changeSearchText={() => {}}
          list={lists.langs}
          changeItem={() => {}}
          value={'value'}
          valueLabel={''}
          className={classes.field}
        />
        <SeacrhSelector
          label='Платформа' 
          changeSearchText={() => {}}
          list={lists.platforms}
          changeItem={() => {}}
          value={'value'}
          valueLabel={''}
          className={classes.field}
        />
        <SeacrhSelector 
          label='Направление подготовки' 
          changeSearchText={() => {}}
          list={lists.prepDirections}
          changeItem={() => {}}
          value={'value'}
          valueLabel={''}
          className={classes.field}
        />
        <SeacrhSelector 
          label='Автор курса (правообл.)' 
          changeSearchText={() => {}}
          list={lists.authors}
          changeItem={() => {}}
          value={'value'}
          valueLabel={''}
          className={classes.field}
        />
      </div>
      <div className={classes.btnsWrapper}>
        <Button
          color="primary"
          variant="contained" 
          className={cn(classes.btn, classes.filterBtn)} 
        >
          Отфильтровать
        </Button>
        <Button
          color="primary"
          variant="outlined" 
          className={cn(classes.btn, classes.resetBtn)} 
        >
          Сбросить
        </Button>
      </div>
    </div>
  )
}