import React from 'react'
import { useStyles } from './Filters.styles'
import cn from 'classnames';

import Button from '@material-ui/core/Button'
import SeacrhSelector from '../../../components/SearchSelector'

export const Filters: React.FC = () => {
  const classes = useStyles()
  const mockLists = {
    langs: [
      { label: 'Русский', value: 'Русский' },
      { label: 'Английский', value: 'Английский' },
    ],
    prepDirections: [
      { label: '45.03.04', value: 'Русский' },
      { label: '09.03.04', value: 'Английский' },
    ],
    authors: [
      { label: 'НИУ ИТМО', value: 'НИУ ИТМО' },
      { label: 'НИУ ВШЭ', value: 'НИУ ВШЭ' },
    ],
    platforms: [
      { label: 'Открытая платформа', value: 'Открытая платформа' },
      { label: 'Stepik', value: 'Stepik' },
    ]
  }
  return (
    <div className={classes.root}>
      <div className={classes.fieldsWrapper}>
        <SeacrhSelector 
          label='Язык курса' 
          changeSearchText={() => {}}
          list={mockLists.langs}
          changeItem={() => {}}
          value={'value'}
          valueLabel={''}
          className={classes.field}
        />
        <SeacrhSelector
          label='Платформа' 
          changeSearchText={() => {}}
          list={mockLists.platforms}
          changeItem={() => {}}
          value={'value'}
          valueLabel={''}
          className={classes.field}
        />
        <SeacrhSelector 
          label='Направление подготовки' 
          changeSearchText={() => {}}
          list={mockLists.prepDirections}
          changeItem={() => {}}
          value={'value'}
          valueLabel={''}
          className={classes.field}
        />
        <SeacrhSelector 
          label='Автор курса (правообл.)' 
          changeSearchText={() => {}}
          list={mockLists.authors}
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