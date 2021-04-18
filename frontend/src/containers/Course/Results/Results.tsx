import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import { useStyles } from './Results.styles'

import { getOutcomes } from '../getters'
import { rootState } from '../../../store/reducers'
import { outcomeFields } from '../enum'
import { outcomeType } from '../types'

export const Results:React.FC = () => {
  const classes = useStyles()
  const outcomes = useSelector((state: rootState) => getOutcomes(state))
  return (
    <div>
      <Typography className={classes.title}>Результаты</Typography>
      <Typography>{outcomes}</Typography>
    </div>
  )
}