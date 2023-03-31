import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Scrollbars } from 'react-custom-scrollbars'
import { useStyles } from './General.styles'

import { getCourse } from '../getters'
import { fields } from '../enum'
import { languageObject } from '../../WorkProgram/constants'
import { InstitutionFields, PlatformFields } from '../../Courses/enum'
import { rootState } from '../../../store/reducers'

export const General: React.FC = () => {
  const classes = useStyles()
  const course = useSelector((state: rootState) => getCourse(state))

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Описание онлайн-курса <span className={classes.courseName}>{`"${course[fields.TITLE]}"`}</span>
      </Typography>
      <div className={classes.content}>
        <div className={classes.main}>
          <Scrollbars style={{height: 'calc(100vh - 290px)'}}>
            <Typography className={classes.textItem}>
              <b>Правообладатель:</b> {course[fields.INSTITUTION][InstitutionFields.TITLE]}
            </Typography>
            <Typography className={classes.textItem}>
              <b>Платформа:</b> {course[fields.PLATFORM][PlatformFields.TITLE]}
            </Typography>
            {course[fields.LANGUAGE] && 
              <Typography className={classes.textItem}>
                <b>Язык:</b> {languageObject[course[fields.LANGUAGE]]}
              </Typography>}
            {course[fields.DESCRIPTION] && 
              <Typography className={classes.description} dangerouslySetInnerHTML={{__html: `<b>Описание: </b>${course[fields.DESCRIPTION]}`}}>
              </Typography>}
            <Typography className={classes.textItem}>
              <b>Возможность получить сертификат:</b>{course[fields.HAS_CERTIFICATE] ? ' есть' : ' нет'}
            </Typography>
            {course[fields.CREDITS] && 
              <Typography className={classes.textItem}>
                <b>Трудоемкость курса в з.е.:</b> {course[fields.CREDITS]}
              </Typography>}
            {course[fields.TOTAL_VISITORS_NUMBER] && 
              <Typography className={classes.textItem}>
                <b>Количество записей за все время:</b> {course[fields.TOTAL_VISITORS_NUMBER]}
              </Typography>}
            {course[fields.CREATED_AT] && 
              <Typography className={classes.textItem}>
                <b>Дата создания онлайн-курса:</b> {course[fields.CREATED_AT]}
              </Typography>}
            {course[fields.DURATION] !== null && course[fields.DURATION] !== 0 && 
              <Typography className={classes.textItem}>
                <b>Длительность онлайн-курса, недель:</b> {course[fields.DURATION]}
              </Typography>}
            {course[fields.VOLUME] && 
              <Typography className={classes.textItem}>
                <b>Объем онлайн-курса, часов:</b> {course[fields.VOLUME]}
              </Typography>}
            {course[fields.INTENSITY_PER_WEEK] && 
              <Typography className={classes.textItem}>
                <b>Требуемое время для изучения онлайн-курса, часов в неделю:</b> {course[fields.INTENSITY_PER_WEEK]}
              </Typography>}
          </Scrollbars>
        </div>
        <div className={classes.options}>
          
          <a className={classes.link} href={course[fields.COURSE_URL]} target='_blank' rel="noopener noreferrer">
            <Button className={classes.btnLink} color='primary' variant='contained'>
              Перейти к курсу на платформе
            </Button>
          </a>
          {/* <Button className={classes.btn} color='primary' variant='contained'>Перейти к курсу в РОК</Button> */}
          {course[fields.RATING] && 
            <Typography><b>Рейтинг по оценкам пользователей:</b>{` ${course[fields.RATING]}`}</Typography>}
          {course[fields.EXPERTS_RATING] && 
            <Typography><b>Рейтинг по оценкам экспертов:</b>{` ${course[fields.EXPERTS_RATING]}`}</Typography>}
        </div>
      </div>
    </div>
  )
}