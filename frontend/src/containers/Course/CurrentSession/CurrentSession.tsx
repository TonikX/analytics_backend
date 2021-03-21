import React from 'react'

import Typography from '@material-ui/core/Typography'

import { useStyles } from './CurrentSession.styles'

export const CurrentSession: React.FC = () => {
  const classes = useStyles()
  const data = {
    countTickets: 346,
    startDate: '14.03.2021',
    endDate: '17.03.2021',
    endCourseDate: '30.05.2021',
  }

  return (
    <div>
      <Typography className={classes.title}>Текущая сессия</Typography>
      <Typography className={classes.textItem}><b>Количество записей на текущую сессию:</b>{` ${data.countTickets}`}</Typography>
      <Typography className={classes.textItem}><b>Дата ближайшего запуска онлайн-курса:</b>{` ${data.startDate}`}</Typography>
      <Typography className={classes.textItem}><b>Дата окончания записи на онлайн-курс:</b>{` ${data.endDate}`}</Typography>
      <Typography className={classes.textItem}><b>Дата окончания онлайн-курса:</b>{` ${data.endCourseDate}`}</Typography>
    </div>
  )
}