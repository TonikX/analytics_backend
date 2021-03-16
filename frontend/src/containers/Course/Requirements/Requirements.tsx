import React from 'react'
import { useSelector } from 'react-redux'

import Scrollbars from 'react-custom-scrollbars'
import Typography from '@material-ui/core/Typography'

import { useStyles } from './Requirements.styles'

import { getRequirements } from '../getters'
import { reqFields } from '../enum'
import { reqType } from '../types'
import { rootState } from '../../../store/reducers'

export const Requirements: React.FC = () => {
  const classes = useStyles()
  const reqs = useSelector((state: rootState) => getRequirements(state))
  return (
    <div>
      <Typography className={classes.title}>Требования</Typography>
      <Scrollbars style={{height: 'calc(100vh - 300px)'}}>
        {reqs.length === 0 && <Typography><b>Нет информации!</b></Typography>}
        {reqs.map((req: reqType) => (
          <div className={classes.item}>
            <Typography>{req[reqFields.ITEM]}</Typography>
          </div>
        ))}
      </Scrollbars>
    </div>
  )
}