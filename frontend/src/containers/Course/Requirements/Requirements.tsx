import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'

import { useStyles } from './Requirements.styles'

import { getRequirements } from '../getters'
import { rootState } from '../../../store/reducers'

export const Requirements: React.FC = () => {
  const classes = useStyles()
  const reqs = useSelector((state: rootState) => getRequirements(state))

  return (
    <div>
      <Typography className={classes.title}>Требования</Typography>
      {reqs && <Typography  dangerouslySetInnerHTML={{ __html: reqs }}></Typography>}
    </div>
  )
}
