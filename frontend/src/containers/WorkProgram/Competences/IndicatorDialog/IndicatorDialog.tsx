import React, {useCallback, useEffect, useState, useMemo} from 'react'
import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InfoIcon from "@mui/icons-material/InfoOutlined";
import CompetenceSelector from '../../../Competences/CompetenceSelector'
import IndicatorSelector from '../../../Competences/Indicators/IndicatorSelector'
import ResultsSelector from '../../Results/ResultsSeletor'
import PlanSelector from '../../../EducationalPlan/WorkProgramPlansSelector'
import { useStyles } from './IndicatorDialog.styles'
import actions from '../../actions'
import competenceActions from '../../../Competences/actions'
import {useDispatch, useSelector} from 'react-redux'
import Tooltip from "@mui/material/Tooltip/Tooltip";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SimpleSelector from "../../../../components/SimpleSelector/SimpleSelector";
import {rootState} from "../../../../store/reducers";
import {getWorkProgramField} from "../../getters";
import {getFilterAcademicPlan} from "../../../Competences/getters";
import Typography from "@mui/material/Typography";

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
  const [knowledge, changeKnowledge] = useState('')
  const [skills, changeSkills] = useState('')
  const [attainments, changeAttainments] = useState('')

  const [saveForPlans, setSaveForPlans] = useState(false)
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
    if (value) {
      setResults([
        ...results,
        {
          value,
          label
        }
      ])
    }
  }, [results])

  const removeResult = useCallback((value: number) => {
    setResults(results.filter(result => result.value !== value))
  }, [results])

  const addPlan = useCallback((value: number, label: string) => {
    setPlans([{
      value, label
    }])
    // if (plans.find(item => item.value === value)) return
    // if (value) {
    //   setPlans([
    //     ...plans,
    //     {
    //       value,
    //       label
    //     }
    //   ])
    // }
  }, [plans])

  const removePlan = useCallback((value: number) => {
    setPlans(plans.filter(plan => plan.value !== value))
  }, [plans])

  const saveZun = useCallback(() => {
    dispatch(actions.saveZUN({
      indicator: indicator.value,
      results: results.map(item => item.value),
      plans: plans.map(item => item.value),
      knowledge,
      skills,
      attainments,
    }))
    handleClose()
  }, [indicator, competence, results, plans, knowledge, skills, attainments])

  const saveZunForThisEP = useCallback(() => {
    dispatch(actions.saveZUNforThisEP({
      indicator: indicator.value,
      results: results.map(item => item.value),
      plans: plans[0].value,
      knowledge,
      skills,
      attainments,
    }))
    handleClose()
  }, [indicator, competence, results, plans, knowledge, skills, attainments])

  const disableButton = useMemo(() => (
      (saveForPlans ? plans.length === 0 : false) || indicator.value === 0 || competence.value === 0
  ),[plans, saveForPlans, indicator, competence])

  const changeFilterOnlyWithStandard = (e:any) => {
    dispatch(competenceActions.changeFilterOnlyWithStandard(e.target.checked))
    dispatch(competenceActions.getCompetences())
  }
  const changeSaveForPlans = (e:any) => {
    setSaveForPlans(e.target.checked)
  }

  const filterAcademicPlan = useSelector((state: rootState) => getFilterAcademicPlan(state))

  const changeFilterAcademicPlan = (planId: number) => {
    dispatch(competenceActions.changeFilterAcademicPlan(planId))
    dispatch(competenceActions.getCompetences())
  }

  const epList = useSelector((state: rootState) => getWorkProgramField(state, 'work_program_in_change_block'))

  const epForSelect = epList && epList.reduce((plans:any, currentPlan:any) => {
    const academicPlan = currentPlan?.discipline_block_module?.descipline_block[0]?.academic_plan;
    if (academicPlan === undefined) {
      return plans;
    }

    return ([
          ...plans,
        {
          value: academicPlan?.id,
          label: `Направление: ${academicPlan?.academic_plan_in_field_of_study[0]?.field_of_study[0]?.title}
                  / ОП: ${academicPlan?.academic_plan_in_field_of_study[0]?.title} 
                  (${academicPlan?.academic_plan_in_field_of_study[0]?.year})
                 `,
        }
      ])
  }, [])

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
      <DialogTitle className={classes.title}> {isEditMode ? 'Редактирование' : 'Добавление'} индикатора ко всем связным ОХ</DialogTitle>
      <FormGroup className={classes.switcher}>
        <FormControlLabel onChange={changeFilterOnlyWithStandard} control={<Switch />} label="Вывести только компетенции, входящие в образовательные стандарт" />
      </FormGroup>
      <SimpleSelector label="Вывести только компетенции, связанные с общей характеристикой указанной ОХ"
                      value={filterAcademicPlan}
                      onChange={changeFilterAcademicPlan}
                      metaList={epForSelect}
                      wrapClass={classes.selectorWrap}
      />
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

      <TextField
        label="Знания"
        onChange={(e) => changeKnowledge(e.currentTarget.value)}
        variant="outlined"
        className={classes.marginBottom30}
      />
      <TextField
        label="Умения"
        onChange={(e) => changeSkills(e.currentTarget.value)}
        variant="outlined"
        className={classes.marginBottom30}
      />
      <TextField
        label="Навыки"
        onChange={(e) => changeAttainments(e.currentTarget.value)}
        variant="outlined"
      />

      <Typography className={classes.indicatorDialiogInfoMassage}>
        Нажимая кнопку "Сохранить", Вы сохраняете ЗУН в рпд с привязкой к каждому УП, с которым связана РПД (Если ЗУН пустой или имеет такое же содержание, как данный). Если Вы не хотите добавлять ЗУН для всех связных УП, Вам необходимо нажать селектор "Сохранить для конкретного УП" и выбрать нужную УП.
      </Typography>

      <FormGroup className={saveForPlans ? classes.switcher : undefined}>
        <FormControlLabel onChange={changeSaveForPlans} control={<Switch />} label="Сохранить для конкретного УП" />
      </FormGroup>
      {saveForPlans ? (
          <>
            <PlanSelector
                label="Учебный план и образовательная программа"
                onChange={addPlan}
                valueLabel={plans[0]?.label}
                value={plans[0]?.value}
                workProgramId={workProgramId}
            />
            {/*<div className={classes.chipsList}>*/}
            {/*  {plans.map(plan => (*/}
            {/*      <Chip key={`result-${plan.value}`} className={classes.chip} onDelete={() => removePlan(plan.value)} label={plan.label} />*/}
            {/*  ))}*/}
            {/*</div>*/}
          </>
      ) : null}
      <div className={classes.footer}>
        <Tooltip title="При выборе результатов и учебного плана с ОП можно выбрать несколько объектов, выбирая их по очереди">
          <InfoIcon className={classes.info}/>
        </Tooltip>
        <DialogActions className={classes.actions}>
          <Button onClick={handleClose}
                  variant="text">
            Отмена
          </Button>
          <Button onClick={saveForPlans ? saveZunForThisEP : saveZun}
                  variant="contained"
                  disabled={disableButton}
                  color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}
