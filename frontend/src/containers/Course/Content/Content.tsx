import React from 'react'

import { useStyles } from './Content.styles'
import Typography from '@material-ui/core/Typography'

export const Content: React.FC = () => {
  const classes = useStyles()
  const topics = ['Начало работы', 'Создание простых объектов', 'Сплайны', 
    'Введение в полигональное моделирование', 'Полигональное моделирование', 'Симуляции', 'Плагины']
  return (
    <div>
      <Typography className={classes.title}>Содержание</Typography>
      <Typography>В курсе рассматриваются следующие темы:</Typography>
      <Typography component='div'>
        <ol className={classes.list}>
          {topics.map((topic) =>  <li>{topic}</li>)}
        </ol>
      </Typography>
      <Typography><b>Количество лекций:</b> 16</Typography>
    </div>
  )
}