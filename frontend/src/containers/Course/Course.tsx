import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Typography from '@material-ui/core/Typography'
import LikeButton from "../../components/LikeButton"
import { General } from './General/General'
import { Content } from './Content/Content'
import { CurrentSession } from './CurrentSession/CurrentSession'

import { steps } from './enum'

import { useStyles } from './Course.styles'

export const Course: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const params = useParams()
  const classes = useStyles()
  console.log('params', params)

  const showActiveStep = (step: number): React.ReactNode => {
    switch (step) {
      case 0:
        return <General />
      case 1:
        return (
          <>
            <Typography className={classes.title}>
              Описание онлайн-курса <span className={classes.courseName}>"Трехмерное моделирование"</span>
            </Typography>
            <Content />
          </>
        )
      case 2:
        return (
          <>
            <Typography className={classes.title}>
              Описание онлайн-курса <span className={classes.courseName}>"Трехмерное моделирование"</span>
            </Typography>
            <CurrentSession />
          </>
        )
      case 3:
        return (
          <>
            <Typography className={classes.title}>
              Описание онлайн-курса <span className={classes.courseName}>"Трехмерное моделирование"</span>
            </Typography>
            3
          </>
        )
      case 4:
        return (
          <>
            <Typography className={classes.title}>
              Описание онлайн-курса <span className={classes.courseName}>"Трехмерное моделирование"</span>
            </Typography>
            4
          </>
        )
      case 5:
        return (
          <>
            <Typography className={classes.title}>
              Описание онлайн-курса <span className={classes.courseName}>"Трехмерное моделирование"</span>
            </Typography>
            5
          </>
        )
      case 6:
        return (
          <>
            <Typography className={classes.title}>
              Описание онлайн-курса <span className={classes.courseName}>"Трехмерное моделирование"</span>
            </Typography>
            6
          </>
        )
    }
  }
  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <LikeButton onClick={() => {}} isLiked={false} />
      </div>
      <Paper className={classes.root}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          nonLinear
          className={classes.stepper}
        >
          <Step>
            <StepButton
              onClick={() => setActiveStep(0)}
              completed={false} 
              style={{textAlign: 'left'}}
            >
              {steps.GENERAL}
            </StepButton>
          </Step>
          <Step>
            <StepButton 
              onClick={() => setActiveStep(1)}
              completed={false} 
              style={{textAlign: 'left'}}
            >
              {steps.CONTENT}
            </StepButton>
          </Step>
          <Step>
            <StepButton 
              onClick={() => setActiveStep(2)}
              completed={false} 
              style={{textAlign: 'left'}}
            >
              {steps.CURRENT_SESSION}
            </StepButton>
          </Step>
          <Step>
            <StepButton 
              onClick={() => setActiveStep(3)}
              completed={false} 
              style={{textAlign: 'left'}}
            >
              {steps.PREP_DIRECTION}
            </StepButton>
          </Step>
          <Step>
            <StepButton 
              onClick={() => setActiveStep(4)}
              completed={false} 
              style={{textAlign: 'left'}}
            >
              {steps.REQUIREMENTS}
            </StepButton>
          </Step>
          <Step>
            <StepButton 
              onClick={() => setActiveStep(5)}
              completed={false} 
              style={{textAlign: 'left'}}
            >
              {steps.COMPETENCES}
            </StepButton>
          </Step>
          <Step>
            <StepButton 
              onClick={() => setActiveStep(6)}
              completed={false} 
              style={{textAlign: 'left'}}
            >
              {steps.RESULTS}
            </StepButton>
          </Step>
        </Stepper>
        <div className={classes.content}>
          {showActiveStep(activeStep)}
        </div>
      </Paper>
    </div>
  )
}