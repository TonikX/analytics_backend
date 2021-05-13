import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import { getCompetences } from '../getters'
import { rootState } from '../../../store/reducers'

import { useStyles } from './Competences.styles'

export const Competences: React.FC = () => {
  const classes = useStyles()
  const competences = useSelector((state: rootState) => getCompetences(state))
  return (
    <div>
      <Typography className={classes.title}>Формируемые компетенции</Typography>
      {competences && <Typography dangerouslySetInnerHTML={{ __html: competences }}></Typography>}
    </div>
  )
}