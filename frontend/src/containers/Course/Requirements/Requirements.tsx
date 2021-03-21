import React from 'react'

import Scrollbars from 'react-custom-scrollbars'
import Typography from '@material-ui/core/Typography'

import { useStyles } from './Requirements.styles'

export const Requirements: React.FC = () => {
  const classes = useStyles()
  const requirements = [
    'Стековая машина', 
    'Дискретная математика', 
    'Архитектура современных микропроцессоров',
    'Интерактивные среды разработки', 
    'Введение в безопасность', 
    'Матрицы',
  ]
  return (
    <div>
      <Typography className={classes.title}>Требования</Typography>
      <Scrollbars style={{height: 'calc(100vh - 300px)'}}>
        {requirements.map((requirement) => (
          <div className={classes.item}>
            <Typography>{requirement}</Typography>
          </div>
        ))}
      </Scrollbars>
    </div>
  )
}