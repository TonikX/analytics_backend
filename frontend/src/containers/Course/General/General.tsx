import React from 'react'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Scrollbars } from 'react-custom-scrollbars'

import { useStyles } from './General.styles'

export const General: React.FC = () => {
  const classes = useStyles()
  const data = {
    owner: 'Университет ИТМО',
    platform: 'Открытое образование',
    lang: 'русский',
    desc: 'Учебный курс направлен на изучение системы трехмерного моделирования. Программа курса составлена таким образом, чтобы позволить слушателю, ранее не знакомому с подобного класса системами, без особых трудностей освоить новый, незнакомый материал. Отобранные обучающие примеры и практические задачи позволяют постепенно раскрыть особенности трехмерного моделирования в системе моделирования 3ds Max.',
    certificate: true,
    difficulty: 3,
    countStudents: 14346,
    creationDate: '14.09.2012',
    duration: 14,
    volume: 84,
    weekTime: 6,
    usersRating: '10.0',
    expertRating: '10.0',
  }
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Описание онлайн-курса <span className={classes.courseName}>"Трехмерное моделирование"</span>
      </Typography>
      <div className={classes.content}>
        <div className={classes.main}>
          <Scrollbars style={{height: 'calc(100vh - 290px)'}}>
            <Typography className={classes.textItem}><b>Правообладатель:</b>{` ${data.owner}`}</Typography>
            <Typography className={classes.textItem}><b>Платформа:</b>{` ${data.platform}`}</Typography>
            <Typography className={classes.textItem}><b>Язык:</b>{` ${data.lang}`}</Typography>
            <Typography className={classes.textItem}><b>Описание:</b>{` ${data.desc}`}</Typography>
            <Typography className={classes.textItem}><b>Возможность получить сертификат:</b>{data.certificate ? ' есть' : ' нет'}</Typography>
            <Typography className={classes.textItem}><b>Трудоемкость курса в з.е.:</b>{` ${data.difficulty}`}</Typography>
            <Typography className={classes.textItem}><b>Количество записей за все время:</b>{` ${data.countStudents}`}</Typography>
            <Typography className={classes.textItem}><b>Дата создания онлайн-курса:</b>{` ${data.creationDate}`}</Typography>
            <Typography className={classes.textItem}><b>Длительность онлайн-курса, недель:</b>{` ${data.duration}`}</Typography>
            <Typography className={classes.textItem}><b>Объем онлайн-курса, часов:</b>{` ${data.volume}`}</Typography>
            <Typography className={classes.textItem}><b>Требуемое время для изучения онлайн-курса, часов в неделю:</b>{` ${data.weekTime}`}</Typography>
          </Scrollbars>
        </div>
        <div className={classes.options}>
          <Button className={classes.btn} color='primary' variant='contained'>Перейти к курсу на платформе</Button>
          <Button className={classes.btn} color='primary' variant='contained'>Перейти к курсу в РОК</Button>
          <Typography><b>Рейтинг по оценкам пользователей:</b>{` ${data.usersRating}`}</Typography>
          <Typography><b>Рейтинг по оценкам экспертов:</b>{` ${data.expertRating}`}</Typography>
        </div>
      </div>
    </div>
  )
}