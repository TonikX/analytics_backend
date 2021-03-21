import React from 'react'

import Scrollbars from 'react-custom-scrollbars'
import Typography from '@material-ui/core/Typography'

import { useStyles } from './Results.styles'

export const Results:React.FC = () => {
  const classes = useStyles()
  const results = ['Свободная ориентация в программном пакете 3ds Max (РО-1).', 'Настройка и создание деталей в 3ds Max (РО-2).']
  return (
    <div>
      <Typography className={classes.title}>Результаты</Typography>
      <Scrollbars style={{height: 'calc(100vh - 300px)'}}>
        {results.map((result) => (
        <div className={classes.item}>
          <Typography style={{width: '80%'}}>{result}</Typography>
        </div>
        ))}
      </Scrollbars>
    </div>
  )
}