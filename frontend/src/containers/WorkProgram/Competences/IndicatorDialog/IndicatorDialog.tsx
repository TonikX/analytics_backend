import React, {useCallback, useEffect, useState, useMemo} from 'react'
import { Dialog } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Chip from '@material-ui/core/Chip'
import CompetenceSelector from '../../../Competences/CompetenceSelector'
import IndicatorSelector from '../../../Competences/Indicators/IndicatorSelector'
import ResultsSelector from '../../Results/ResultsSeletor'
import PlanSelector from '../../../EducationalPlan/WorkProgramPlansSelector'
import { useStyles } from './IndicatorDialog.styles'
import actions from '../../actions'
import {useDispatch} from 'react-redux'

interface IndicatorsProps {
  workProgramId: number;
  isOpen: boolean;
  defaultCompetence?: {
    value: number;
    label: string;
  };
  defaultIndicator?: {
    value: number;
    label: string;
  };
  isEditMode?: boolean;
  handleClose: () => void;
}

export default ({ isOpen, isEditMode, handleClose, defaultCompetence, defaultIndicator, workProgramId }: IndicatorsProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [competence, setCompetence] = useState<{value: number; label: string}>({value: 0, label: ''})
  const [indicator, setIndicator] = useState<{value: number; label: string}>({value: 0, label: ''})
  const [results, setResults] = useState<Array<{value: number; label: string}>>([])
  const [plans, setPlans] = useState<Array<{value: number; label: string}>>([])

  const addIndicator = (value: number, label: string) => {
    setIndicator({
      value,
      label
    })
  }

  const addCompetence = (value: number, label: string) => {
    setCompetence({
      value,
      label
    })
  }

  const addResult = useCallback((value: number, label: string) => {
    if (results.find(item => item.value === value)) return

    setResults([
      ...results,
      {
        value,
        label
      }
    ])
  }, [results])

  const removeResult = useCallback((value: number) => {
    setResults(results.filter(result => result.value !== value))
  }, [results])

  const addPlan = useCallback((value: number, label: string) => {
    if (plans.find(item => item.value === value)) return

    setPlans([
      ...plans,
      {
        value,
        label
      }
    ])
  }, [plans])

  const removePlan = useCallback((value: number) => {
    setPlans(plans.filter(plan => plan.value !== value))
  }, [plans])

  const saveZun = useCallback(() => {
    dispatch(actions.saveZUN({
      indicator: indicator.value,
      results: results.map(item => item.value),
      plans: plans.map(item => item.value),
    }))
    handleClose()
  }, [indicator, competence, results, plans])

  const disableButton = useMemo(() => (indicator.value === 0 || competence.value === 0 || results.length === 0 || plans.length === 0),
    [indicator, competence, results, plans]
  )

  useEffect(() => {
    setIndicator({value: 0, label: ''})
  }, [competence])

  useEffect(() => {
    if (defaultCompetence){
      setCompetence(defaultCompetence)
    }
  }, [defaultCompetence])

  useEffect(() => {
    if (defaultIndicator){
      setIndicator(defaultIndicator)
    }
  }, [defaultIndicator])

  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="sm"
      classes={{
        paper: classes.dialog
      }}
    >
      <DialogTitle className={classes.title}> {isEditMode ? 'Редактировать' : 'Добавить'} индикатор</DialogTitle>
      <CompetenceSelector
        onChange={addCompetence}
        value={competence.value}
        valueLabel={competence.label}
        label="Компетенция"
        className={classes.marginBottom30}
        disabled={Boolean(defaultCompetence)}
      />
      <IndicatorSelector
        onChange={addIndicator}
        value={0}
        label="Индикатор"
        className={classes.marginBottom30}
        competenceId={competence.value}
        disabled={competence.value === 0 || Boolean(defaultIndicator)}
      />
      <ResultsSelector
        label="Результат"
        onChange={addResult}
        valueLabel=""
        value={0}
      />
      <div className={classes.chipsList}>
        {results.map(result => (
          <Chip key={`result-${result.value}`} className={classes.chip} onDelete={() => removeResult(result.value)} label={result.label} />
        ))}
      </div>
      <PlanSelector
        label="Рабочие планы"
        onChange={addPlan}
        valueLabel=""
        value={0}
        workProgramId={workProgramId}
      />
      <div className={classes.chipsList}>
        {plans.map(plan => (
          <Chip key={`result-${plan.value}`} className={classes.chip} onDelete={() => removePlan(plan.value)} label={plan.label} />
        ))}
      </div>
      <DialogActions className={classes.actions}>
        <Button onClick={handleClose}
                variant="text">
          Отмена
        </Button>
        <Button onClick={saveZun}
                variant="contained"
                disabled={disableButton}
                color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}