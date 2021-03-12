import React from 'react'

import Scrollbars from 'react-custom-scrollbars'
import Typography from '@material-ui/core/Typography'

import { useStyles } from './Competences.styles'

export const Competences: React.FC = () => {
  const classes = useStyles()
  const competences = ['Способность выбирать и оценивать способ реализации     информационных систем и устройств (программно-, аппаратно- или программно-аппаратно-) для решения поставленной задачи (ОПК-6).', 
    'Способность применять основные приемы и законы создания и чтения чертежей и документации по аппаратным и программным компонентам информационных систем (ОПК-3).',
    'Способность проводить сборку информационной системы из готовых компонентов (ПК-29).',
    'Способность использовать технологии разработки объектов профессиональной деятельности в областях: машиностроение, приборостроение, техника и т.д. (ПК-17).', 
    'Владение широкой общей подготовкой (базовыми знаниями) для решения практических задач в области информационных систем и технологий (ОПК-1).']
  return (
    <div>
      <Typography className={classes.title}>Формируемые компетенции</Typography>
      <Scrollbars style={{height: 'calc(100vh - 300px)'}}>
        {competences.map((competence) => (
          <div className={classes.item}>
            <Typography style={{width: '80%'}}>{competence}</Typography>
          </div>
        ))}
      </Scrollbars>
    </div>
  )
}