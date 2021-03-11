import React from 'react'

import Scrollbars from 'react-custom-scrollbars'
import Typography from '@material-ui/core/Typography'

import { useStyles } from './Requirements.styles'

export const Requirements: React.FC = () => {
  const classes = useStyles()
  const requirements = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 
    'Quasi ut quae libero aspernatur, quia earum expedita.', 
    'Itaque, numquam aspernatur quisquam repudiandae fugit incidunt non tempore cum voluptates accusamus totam dolorem.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 
    'Quasi ut quae libero aspernatur, quia earum expedita.', 
    'Itaque, numquam aspernatur quisquam repudiandae fugit incidunt non tempore cum voluptates accusamus totam dolorem.',
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