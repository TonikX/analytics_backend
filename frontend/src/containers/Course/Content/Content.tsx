import React from 'react'
import { useSelector } from 'react-redux'

import { useStyles } from './Content.styles'
import Typography from '@material-ui/core/Typography'

import { getCourse } from '../getters'

import { rootState } from '../../../store/reducers'
import { fields } from '../enum'

export const Content: React.FC = () => {
  const course = useSelector((state: rootState) => getCourse(state))
  const classes = useStyles()
  return (
    <div>
      <Typography className={classes.title}>Содержание</Typography>
      {course[fields.CONTENT] &&
        <Typography className={classes.content}>
          {course[fields.CONTENT]}
        </Typography>}
      {course[fields.LECTURES_NUMBER] && <Typography><b>Количество лекций:</b> {course[fields.LECTURES_NUMBER]}</Typography>}
    </div>
  )
}