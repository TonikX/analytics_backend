import React, { useEffect, useState, useMemo } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'

import actions from '../actions'
import { getEducationalStandard } from '../getters'

import useStyles from './EducationalStandard.styles'
import Typography from "@material-ui/core/Typography";
import {CompetenceTable} from "./CompetencesTable/CompetenceTable";
import TasksTable from "./TasksTable";
import {CompetenceTableType, EducationalStandardFields} from "../enum";

export const steps = [
  'Ключевые компетенции', // group_of_key_competences
  'Надпрофессиональные компетенции', // group_of_over_prof_competences
  'Общепрофессиональные компетенции', // group_of_general_prof_competences
  'Типы профессиональных задач', // group_of_general_prof_competences
];

export default () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id } = useParams()
  const educationalStandard = useSelector((state: any) => getEducationalStandard(state))

  const [activeStep, setActiveStep] = useState(0)
  
  useEffect(() => {
    dispatch(actions.getEducationalStandard(id))
  }, [])

  const content = useMemo(() => {
    switch (activeStep) {
      case 0:
        return (
          <CompetenceTable
            competenceTableType={CompetenceTableType.KEY_COMPETENCES}
            tableData={educationalStandard?.[EducationalStandardFields.KEY_COMPETENCES]}
          />
        )
      case 1:
        return (
          <CompetenceTable
            competenceTableType={CompetenceTableType.SUPRA_PROFESSIONAL_COMPETENCES}
            tableData={educationalStandard?.[EducationalStandardFields.SUPRA_PROFESSIONAL_COMPETENCES]}
          />
        )
      case 2:
        return (
          <CompetenceTable
            competenceTableType={CompetenceTableType.GENERAL_PROFESSIONAL_COMPETENCES}
            tableData={educationalStandard?.[EducationalStandardFields.GENERAL_PROFESSIONAL_COMPETENCES]}
          />
        )
      case 3:
        return (
          <TasksTable
            tableData={educationalStandard?.[EducationalStandardFields.TASKS]}
          />
        )
    }
  }, [activeStep, educationalStandard])

  return (
    <Paper className={classes.root}>
      <Stepper activeStep={activeStep}
               orientation="vertical"
               nonLinear
               className={classes.stepper}
      >
        {steps.map((value, index) => (
          <Step key={index}>
            <StepButton onClick={() => setActiveStep(index)}
                        completed={false}
                        style={{textAlign: 'left'}}
            >
              {value}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div className={classes.content}>
        <div className={classes.content}>
          <Typography className={classes.title}>
            <div>Образовательный стандарт <b>"{educationalStandard[EducationalStandardFields.TITLE]}"</b> </div>
          </Typography>

          {content}
        </div>
      </div>
    </Paper>
  )
}
