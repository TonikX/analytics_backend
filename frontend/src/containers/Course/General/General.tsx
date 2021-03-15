import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Scrollbars } from 'react-custom-scrollbars'

import { useStyles } from './General.styles'
import { rootState } from '../../../store/reducers'
import { getCourse } from '../getters'
import { fields } from '../enum'
import { languageObject } from '../../WorkProgram/constants'

export const General: React.FC = () => {
  const classes = useStyles()
  const course = useSelector((state: rootState) => getCourse(state))
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

  // const getInstitutionName = (institutionId: number): string => {
  //   if (institutions.length) {
  //     return institutions.filter((institution: InstitutionType) => institution[InstitutionFields.ID] ===  institutionId)[0][InstitutionFields.TITLE]
  //   } else return ''
  // }
  // const getPlatformName = (platformId: number): string => {
  //   if (platforms.length) {
  //     return platforms.filter((platform: PlatformType) => platform[PlatformFields.ID] ===  platformId)[0][PlatformFields.TITLE]
  //   } else return ''
  // } 
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Описание онлайн-курса <span className={classes.courseName}>{`"${course[fields.TITLE]}"`}</span>
      </Typography>
      <div className={classes.content}>
        <div className={classes.main}>
          <Scrollbars style={{height: 'calc(100vh - 290px)'}}>
            <Typography className={classes.textItem}><b>Правообладатель:</b> {data.owner}</Typography>
            <Typography className={classes.textItem}><b>Платформа:</b> {data.platform}</Typography>
            {course[fields.LANGUAGE] && <Typography className={classes.textItem}><b>Язык:</b> {languageObject[course[fields.LANGUAGE]]}</Typography>}
            {course[fields.DESCRIPTION] && <Typography className={classes.textItem}><b>Описание:</b>{` ${course[fields.DESCRIPTION]}`}</Typography>}
            <Typography className={classes.textItem}><b>Возможность получить сертификат:</b>{course[fields.HAS_CERTIFICATE] ? ' есть' : ' нет'}</Typography>
           {course[fields.CREDITS] && <Typography className={classes.textItem}><b>Трудоемкость курса в з.е.:</b> {course[fields.CREDITS]}</Typography>}
            {course[fields.TOTAL_VISITORS_NUMBER] && <Typography className={classes.textItem}><b>Количество записей за все время:</b> {course[fields.TOTAL_VISITORS_NUMBER]}</Typography>}
            {course[fields.CREATED_AT] && <Typography className={classes.textItem}><b>Дата создания онлайн-курса:</b> {course[fields.CREATED_AT]}</Typography>}
            {course[fields.DURATION] && <Typography className={classes.textItem}><b>Длительность онлайн-курса, недель:</b> {course[fields.DURATION]}</Typography>}
            {course[fields.VOLUME] && <Typography className={classes.textItem}><b>Объем онлайн-курса, часов:</b> {course[fields.VOLUME]}</Typography>}
            {course[fields.INTENSITY_PER_WEEK] && <Typography className={classes.textItem}><b>Требуемое время для изучения онлайн-курса, часов в неделю:</b> {course[fields.INTENSITY_PER_WEEK]}</Typography>}
          </Scrollbars>
        </div>
        <div className={classes.options}>
          <Button className={classes.btn} color='primary' variant='contained'>Перейти к курсу на платформе</Button>
          <Button className={classes.btn} onClick={() => {window.location.href= course[fields.COURSE_URL]}} color='primary' variant='contained'>Перейти к курсу в РОК</Button>
          <Typography><b>Рейтинг по оценкам пользователей:</b>{` ${data.usersRating}`}</Typography>
          <Typography><b>Рейтинг по оценкам экспертов:</b>{` ${data.expertRating}`}</Typography>
        </div>
      </div>
    </div>
  )
}