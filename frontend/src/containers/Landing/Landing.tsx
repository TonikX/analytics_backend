import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { useStyles } from './Landing.styles'
import IconButton from '@material-ui/core/IconButton'
import TelegramIcon from '@material-ui/icons/Telegram'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
// @ts-ignore
import screenshotImage from './img/screen.PNG'
import studentImage from './img/student.svg'
import teacherImage from './img/teacher.svg'
import administrationImage from './img/administration.svg'
import arrowImage from './img/right-arrow.svg'
import mailImage from './img/envelope.svg'
import {appRouter} from '../../service/router-service'
import developersList from "./developersList";

export default () => {
  const classes = useStyles();
  const [showAllTeam, setShowAllTeam] = useState(false)

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.header}>
        <div className={classes.headerWrap}>

          <Typography className={classes.headerLeft}>
            <Typography className={classes.logo}> LOGO </Typography>
            <Link to='' className={classes.link} style={{marginRight: '25px'}}>Внешние системы</Link>
            <Link to='' className={classes.link} style={{marginRight: '25px'}}>Связанные процессы</Link>
            <Link to='' className={classes.link} style={{marginRight: '25px'}}>Категории пользователей</Link>
            <Link to='' className={classes.link} style={{marginRight: '25px'}}>Команда</Link>
          </Typography>

          <Typography className={classes.headerRight}>
            <Tooltip title="Подписаться на телеграм канал">
              <a href="https://t.me/op_itmo_ru"
                 target="_blank"
                 style={{marginRight: '10px'}}
              >
                <IconButton aria-haspopup="true" className={classes.telegramIcon}>
                  <TelegramIcon />
                </IconButton>
              </a>
            </Tooltip>
            <Link to={appRouter.getSignInRoute()}
                  className={classes.link}
                  style={{marginRight: '30px'}}
            >
              Войти
            </Link>
            <Button className={classes.mainButton}>
              <Link to={appRouter.getSignUpRoute()}>
                Зарегистрироваться
              </Link>
            </Button>
          </Typography>
        </div>
      </AppBar>

      <div className={classes.mainScreen}>
        <Typography variant="h1" className={classes.h1}>Конструктор Рабочих Программ</Typography>
        <Typography className={classes.subTitle}>Удобный конструктор для быстрого создания рабочих программ, отличный инструмент <br/> для сопровождения и планирования учебного процесса<br/></Typography>
        <div className={classes.mainScreenButtons}>
          <Button className={classes.mainButton}>Посмотреть демо</Button>
          <Button className={classes.secondaryButton}>
            <Link to={appRouter.getSignUpRoute()}>
              Зарегистрироваться
            </Link>
          </Button>
        </div>
      </div>

      <div className={classes.screenshot} style={{backgroundImage: `url(${screenshotImage}`}} />

      <div className={classes.section}>
        <Typography className={classes.sectionTitle}>Внешние системы</Typography>
        <div className={classes.partnersList}>
          <Typography>ИСУ</Typography>
          <Typography>ЦДО</Typography>
          <Typography>БАРС 2.0</Typography>
          <Typography>УЧЕБНАЯ АНАЛИТИКА</Typography>
        </div>
      </div>

      <div className={classes.section}>
        <Typography className={classes.sectionTitle}> Связанные с РПД процессы </Typography>

        <div className={classes.processesListItem}>
          <div className={classes.processesListContent}>
            <Typography className={classes.processesListContentTitle}>
              Рабочая программа
            </Typography>
            <Typography className={classes.processesListContentText}>
              Формирование и редактирование РПД, формальная верификация, содержательная экспертиза, внесение таблицы с баллами в ЦДО/БАРС 2.0,
            </Typography>
          </div>
          <div className={classes.processesListContentImage} style={{backgroundImage: `url(${screenshotImage}`}}/>
        </div>

        <div className={classes.processesListItem}>
          <div className={classes.processesListContentImage} style={{marginRight: '50px', backgroundImage: `url(${screenshotImage}`}} />
          <div className={classes.processesListContent}>
            <Typography className={classes.processesListContentTitle}>
              Учебные планы
            </Typography>
            <Typography className={classes.processesListContentText}>
              Cоздание учебного плана, оценка качества учебного плана, проверка наличия рабочих программ по дисциплинам учебного плана, включение РПД в учебный план
            </Typography>
          </div>
        </div>

        <div className={classes.processesListItem}>
          <div className={classes.processesListContent}>
            <Typography className={classes.processesListContentTitle}>
              Образовательная программа
            </Typography>
            <Typography className={classes.processesListContentText}>
              Cоздание учебного плана, оценка качества учебного плана, проверка наличия рабочих программ по дисциплинам учебного плана, включение РПД в учебный план
            </Typography>
          </div>
          <div className={classes.processesListContentImage} style={{backgroundImage: `url(${screenshotImage}`}} />
        </div>
      </div>

      <div className={classes.section}>
        <Typography className={classes.sectionTitle}>
          Категории пользователей
        </Typography>
        <div className={classes.usersList}>
          <div className={classes.usersListItem}>
            <img src={studentImage} className={classes.usersListItemImg} />
            <Typography className={classes.usersListItemTitle}> Обучающиеся </Typography>
          </div>
          <div className={classes.usersListItem}>
            <img src={teacherImage} className={classes.usersListItemImg} />
            <Typography className={classes.usersListItemTitle}> Преподаватели </Typography>
          </div>
          <div className={classes.usersListItem}>
            <img src={administrationImage} className={classes.usersListItemImg} />
            <Typography className={classes.usersListItemTitle}> Административные работники </Typography>
          </div>
        </div>
      </div>

      <div className={classes.section}>
        <Typography className={classes.sectionTitle}>
          Команда проекта
        </Typography>
        {showAllTeam ?
          developersList.map((row: any) =>
            <div className={classes.teamList}>
              {row.map((item: any) => (
                <div className={classes.teamItem}>
                  <div className={classes.teamItemImage} style={{background: `url(${item.image})`}}/>
                  <Typography className={classes.teamItemTitle}> {item.name} </Typography>
                  <Typography className={classes.teamItemRole}> {item.role} </Typography>
                </div>
              ))}
            </div>
          )
          :
          <div className={classes.teamList}>
            {developersList[0].map((item: any) => (
              <div className={classes.teamItem}>
              <div className={classes.teamItemImage} style={{background: `url(${item.image})`}}/>
              <Typography className={classes.teamItemTitle}> {item.name} </Typography>
              <Typography className={classes.teamItemRole}> {item.role} </Typography>
              </div>
              ))}
          </div>
        }
        {!showAllTeam && <Typography className={classes.showAllTeam} onClick={() => setShowAllTeam(true)}>Показать всю команду <img src={arrowImage} className={classes.arrowImage}/></Typography>}
      </div>
      <div className={classes.footer}>
        <div className={classes.footerWrap}>
          <Typography className={classes.footerText}>Разработка © 2021 Факультет ИКТ</Typography>
          <Typography className={classes.mailWrap}>
            <img src={mailImage} className={classes.mailIcon}/>
            <a href='#' className={classes.link}>rpd@gmail.com</a>
          </Typography>
        </div>
      </div>
    </div>
  )
}