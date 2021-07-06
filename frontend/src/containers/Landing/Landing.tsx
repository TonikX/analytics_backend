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
// @ts-ignore
import op from './img/op.PNG'
// @ts-ignore
import onlineCourse from './img/online-course.PNG'
import studentImage from './img/student.svg'
import teacherImage from './img/teacher.svg'
import administrationImage from './img/administration.svg'
import arrowImage from './img/right-arrow.svg'
import mailImage from './img/envelope.svg'
import logo from './img/logo.svg'
import {appRouter} from '../../service/router-service'
import developersList from "./developersList";
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'

export default () => {
  const classes = useStyles();
  const [showAllTeam, setShowAllTeam] = useState(false)

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.header}>
        <div className={classes.headerWrap}>

          <Typography className={classes.headerLeft}>
            <Typography className={classes.logo}> <img src={logo} width={70} /> </Typography>
            <AnchorLink offset='100' href='#systems' className={classes.link} style={{marginRight: '25px'}}>Внешние системы</AnchorLink>
            <AnchorLink offset='100' href='#processes' className={classes.link} style={{marginRight: '25px'}}>Связанные процессы</AnchorLink>
            <AnchorLink offset='100' href='#users' className={classes.link} style={{marginRight: '25px'}}>Категории пользователей</AnchorLink>
            <AnchorLink offset='100' href='#developers' className={classes.link} style={{marginRight: '25px'}}>Команда</AnchorLink>
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
        <Typography variant="h1" className={classes.h1}>Конструктор Образовательных Программ</Typography>
        <Typography className={classes.subTitle}>Удобный конструктор для быстрого создания образовательных программ, отличный инструмент <br/> для сопровождения и планирования учебного процесса<br/></Typography>
        <div className={classes.mainScreenButtons}>
          <Button className={classes.mainButton}>
            <Link to={appRouter.getSignInRoute()}>
              Войти в систему
            </Link>
          </Button>
          <Button className={classes.secondaryButton}>
            <Link to={appRouter.getSignUpRoute()}>
              Зарегистрироваться
            </Link>
          </Button>
        </div>
      </div>

      <div className={classes.screenshot} style={{backgroundImage: `url(${screenshotImage}`}} />

      <section className={classes.section} id="systems">
        <Typography className={classes.sectionTitle}>Внешние системы</Typography>
        <div className={classes.partnersList}>
          <Typography>ИСУ</Typography>
          <Typography>ЦДО</Typography>
          <Typography>БАРС 2.0</Typography>
          <Typography>УЧЕБНАЯ АНАЛИТИКА</Typography>
        </div>
      </section>

      <section className={classes.section} id="processes">
        <Typography className={classes.sectionTitle}> Связанные с РПД процессы </Typography>

        <div className={classes.processesListItem}>
          <div className={classes.processesListContent}>
            <Typography className={classes.processesListContentTitle}>
              Рабочая программа
            </Typography>
            <Typography className={classes.processesListContentText}>
              Сервис предоставляет интерфейсы для заполнения всех элементов РПД, таких, как: разделы, темы, оценочные средства, таблица БАРС и т.д. Настроены различные проверки, помогающие преподавателю быстро и правильно заполнять РПД. Реализованы процессы экспертизы для включения РПД в учебные планы.
            </Typography>
          </div>
          <div className={classes.processesListContentImage}>
            <div className={classes.videoWrapper}>
              <iframe width="560"
                      height="315"
                      src="https://www.youtube.com/embed/3lK4kItzYTk?&showinfo=0"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className={classes.processesListItem}>
          <div className={classes.processesListContentImage}  style={{marginRight: '50px'}}>
            <div className={classes.videoWrapper}>
              <iframe width="560"
                      height="315"
                      src="https://www.youtube.com/embed/Elf9hFjFiK8"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
              />
            </div>
          </div>
          <div className={classes.processesListContent}>
            <Typography className={classes.processesListContentTitle}>
              Учебные планы
            </Typography>
            <Typography className={classes.processesListContentText}>
              Добавлены функционал работы с учебными планами, блоками, модулями. Учтены все особенности работы над учебными планами в университете ИТМО. Для РПД, включаемой в учебный план возможно настроить тип выборности, компетенции, индикаторы, результаты обучения и другие параметры
            </Typography>
          </div>
        </div>

        <div className={classes.processesListItem}>
          <div className={classes.processesListContent}>
            <Typography className={classes.processesListContentTitle}>
              Образовательные программы
            </Typography>
            <Typography className={classes.processesListContentText}>
              Реализуются новые интерфейсы для работы с направлениями, учебными планами, общими характеристиками образовательных программ. Реализованы удобные интерфейсы поиска и навигации. Формат документов соответствует образовательному стандарту Университета ИТМО
            </Typography>
          </div>
          <div className={classes.processesListContentImage} style={{backgroundImage: `url(${op}`}} />
        </div>

        <div className={classes.processesListItem}>
          <div className={classes.processesListContentImage} style={{marginRight: '50px', backgroundImage: `url(${onlineCourse}`}} />
          <div className={classes.processesListContent}>
            <Typography className={classes.processesListContentTitle}>
              Онлайн курсы
            </Typography>
            <Typography className={classes.processesListContentText}>
              В сервисе реализован удобный навигатор по онлайн курсам и возможность их добавления в РПД. Онлайн курсы соответствуют Реестр онлайн-курсов современной цифровой образовательной среды в РФ (<a style={{color: '#fff'}} href={"https://online.edu.ru/"}>https://online.edu.ru/</a>)
            </Typography>
          </div>
        </div>
      </section>

      <section className={classes.section} id="users">
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
      </section>

      <section className={classes.section} id="developers">
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
      </section>
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