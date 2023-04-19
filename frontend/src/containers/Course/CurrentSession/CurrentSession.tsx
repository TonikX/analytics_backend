import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'

import { useStyles } from './CurrentSession.styles'

import { rootState } from '../../../store/reducers'
import { fields } from '../enum'
import { getCourse } from '../getters'

export const CurrentSession: React.FC = () => {
  const classes = useStyles()
  const course = useSelector((state: rootState) => getCourse(state))

  return (
    <div>
      <Typography className={classes.title}>Текущая сессия</Typography>
      {course[fields.VISITORS_NUMBER] && 
        <Typography className={classes.textItem}>
          <b>Количество записей на текущую сессию:</b>{` ${course[fields.VISITORS_NUMBER]}`}
        </Typography>}
      {course[fields.STARTED_AT] && 
        <Typography className={classes.textItem}>
          <b>Дата ближайшего запуска онлайн-курса:</b>{` ${course[fields.STARTED_AT]}`}
        </Typography>}
      {course[fields.RECORD_END_AT] && 
        <Typography className={classes.textItem}>
          <b>Дата окончания записи на онлайн-курс:</b>{` ${course[fields.RECORD_END_AT]}`}
        </Typography>}
      {course[fields.FINISHED_AT] && 
        <Typography className={classes.textItem}>
          <b>Дата окончания онлайн-курса:</b>{` ${course[fields.FINISHED_AT]}`}
        </Typography>}
    </div>
  )
}