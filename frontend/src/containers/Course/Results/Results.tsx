import React from 'react'
import { useSelector } from 'react-redux'

import Scrollbars from 'react-custom-scrollbars'
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
      <Scrollbars style={{height: 'calc(100vh - 300px)'}}>
        {outcomes.length === 0 && <Typography><b>Нет информации!</b></Typography>}
        {outcomes.map((outcome: outcomeType) => (
        <div className={classes.item}>
          <Typography style={{width: '80%'}}>{outcome[outcomeFields.LEARNING_OUTCOME]}</Typography>
        </div>
        ))}
      </Scrollbars>
    </div>
  )
}