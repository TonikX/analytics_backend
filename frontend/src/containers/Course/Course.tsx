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
import { Directions } from './Directions/Directions'
import { Requirements } from './Requirements/Requirements'
import { Competences } from './Competences/Competences'
import { Results } from './Results/Results'

import { steps } from './enum'

import { useStyles } from './Course.styles'

export const Course: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  // eslint-disable-next-line
  const params = useParams()
  const classes = useStyles()

  const showActiveStep = (step: number): React.ReactNode => {
    switch (step) {
      case 0:
        return <General />
      case 1:
        return <Content />
      case 2:
        return <CurrentSession />
      case 3:
        return <Directions />
      case 4:
        return <Requirements />
      case 5:
        return <Competences />
      case 6:
        return <Results />
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
          {activeStep !== 0 && (
            <Typography className={classes.title}>
              Описание онлайн-курса <span className={classes.courseName}>"Трехмерное моделирование"</span>
            </Typography>
          )}
          {showActiveStep(activeStep)}
        </div>
      </Paper>
    </div>
  )
}