import React, {useCallback, useEffect, useState, useMemo, ReactText} from 'react'
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
import {getFilterAcademicPlan} from "../../../Competences/getters";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

interface IndicatorsProps {
  workProgramId?: number;
  practiceId?: number;
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
  epList: any[];
  resultsList: {value: string|number, label: string}[];
  apRequired?: boolean;
}

type Indicator = {
  value: number;
  label: string;
  results: {
    value: number;
    label: string;
  }[];
  knowledge: string;
  skills: string;
  attainments: string;
}

const getIndicatorsForSave = (indicators: Indicator[]) => (
  indicators.map((indicator) => ({
    indicator_in_zun: indicator.value,
    items: indicator.results.map((result) => result.value),
    knowledge: indicator.knowledge,
    skills: indicator.skills,
    attainments: indicator.attainments,
  }))
)

export default ({ apRequired = false, resultsList, epList, isOpen, isEditMode, handleClose, defaultCompetence, defaultIndicator, workProgramId, practiceId }: IndicatorsProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [competence, setCompetence] = useState<{value: number; label: string}>({value: 0, label: ''})
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [plans, setPlans] = useState<Array<{value: number; label: string}>>([])

  const changeZunFields = useCallback((indicatorIndex: number, zunField: 'skills'|'knowledge'|'attainments') => (e: any) => {
    const updatedIndicators = indicators
    updatedIndicators[indicatorIndex][zunField] = e.target.value
    setIndicators(updatedIndicators)
  }, [indicators])

  const [saveForPlans, setSaveForPlans] = useState(false)
  const addIndicator = (value: number, label: string) => {
    if (indicators.find((indicator) => indicator.value === value)) return
    setIndicators([
      ...indicators,
      {
        value,
        label,
        results: [],
        knowledge: '',
        skills: '',
        attainments: ''
      }
    ])
  }

  const addCompetence = (value: number, label: string) => {
    setCompetence({
      value,
      label
    })
  }

  const addResult = useCallback((indicatorIndex: number) => (value: number, label: string) => {
    const currentIndicator = indicators[indicatorIndex]
    const {results} = currentIndicator
    if (results.find(item => item.value === value)) return

    if (value) {
      setIndicators(indicators.map((indicator, index) => {
        if (index === indicatorIndex) {
          return {
            ...indicator,
            results: [
              ...indicator.results,
              {
                value,
                label
              }
            ]
          }
        }
        return indicator
      }))
    }
  }, [indicators])

  const removeResult = useCallback((value: number, indicatorIndex) => {
    if (value) {
      setIndicators(indicators.map((indicator, index) => {
        if (index === indicatorIndex) {
          return {
            ...indicator,
            results: indicator.results.filter((result) => result.value !== value)
          }
        }
        return indicator
      }))
    }  }, [indicators])

  const removeIndicator = useCallback((indicatorIndex) => {
      setIndicators(indicators.filter((indicator, index) => (
        index !== indicatorIndex
      )))
    }, [indicators])

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
      indicators: getIndicatorsForSave(indicators),
      workProgramId,
      practiceId,
      iap_id: plans[0]
    }))
    handleClose()
  }, [indicators, plans, workProgramId, practiceId])

  const saveZunForThisEP = useCallback(() => {
    dispatch(actions.saveZUNforThisEP({
      indicators: getIndicatorsForSave(indicators),
      plans: plans[0].value,
      workProgramId,
      practiceId,
    }))
    handleClose()
  }, [indicators, plans, practiceId])

  const disableButton = useMemo(() => (
      (saveForPlans || apRequired ? plans.length === 0 : false) || indicators.length === 0
  ),[plans, saveForPlans, indicators, apRequired])

  const changeFilterOnlyWithStandard = (e:any) => {
    dispatch(competenceActions.changeFilterOnlyWithStandard(e.target.checked))
    dispatch(competenceActions.getCompetences())
  }
  const changeSaveForPlans = (e:any) => {
    setSaveForPlans(e.target.checked)
  }

  const filterAcademicPlan = useSelector((state: rootState) => getFilterAcademicPlan(state))

  const changeFilterAcademicPlan = (planId: ReactText) => {
    dispatch(competenceActions.changeFilterAcademicPlan(planId === filterAcademicPlan ? undefined : planId))
    dispatch(competenceActions.getCompetences())
  }

  const epForSelect = epList && epList.reduce((fullPlans: any, currentPlan: any) => {
    const plans = currentPlan?.discipline_block_module?.descipline_block?.reduce((plans: any, item: any) => {
      const academicPlan = item?.academic_plan;
      return ([
        ...plans,
        {
          value: academicPlan?.academic_plan_in_field_of_study[0]?.id,
          label: `Направление: ${academicPlan?.academic_plan_in_field_of_study[0]?.field_of_study[0]?.title}
                  / ОП: ${academicPlan?.academic_plan_in_field_of_study[0]?.title} 
                  (${academicPlan?.academic_plan_in_field_of_study[0]?.year})
                 `,
        }
      ])
    }, [])

    return [
      ...fullPlans,
      ...plans,
    ]
  }, [])

  useEffect(() => {
    if (defaultCompetence){
      setCompetence(defaultCompetence)
    }
  }, [defaultCompetence])

  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="sm"
      classes={{
        paper: classes.dialog
      }}
    >
      <DialogTitle className={classes.title}> {isEditMode ? 'Редактирование' : 'Добавление'} компетенций и индикаторов</DialogTitle>
      <FormGroup className={classes.switcher}>
        <FormControlLabel onChange={changeFilterOnlyWithStandard} control={<Switch />} label="Вывести только компетенции, входящие в образовательные стандарт" />
      </FormGroup>
      <SimpleSelector label="Вывести компетенции, связанные только с указанной ОХ"
                      value={filterAcademicPlan}
                      onChange={changeFilterAcademicPlan}
                      onClickMenuItem={changeFilterAcademicPlan}
                      metaList={epForSelect}
                      wrapClass={classes.selectorWrap}
                      key={filterAcademicPlan}
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
        valueLabel={''}
        label="Индикатор"
        className={indicators.length ? undefined : classes.marginBottom30}
        competenceId={competence.value}
        disabled={competence.value === 0 || Boolean(defaultIndicator)}
        cleanLabelAfterSelect
      />
      {indicators.length ? <Typography fontSize={18} style={{margin: '15px 0px 10px'}}>Индикаторы<br/></Typography> : null}
      {indicators.map((indicator, index) => (
        <React.Fragment key={indicator.value}>
          <Typography style={{marginBottom: 10}}>
            {index + 1}. {indicator.label}
            <DeleteIcon className={classes.deleteIndicatorIcon} onClick={() => removeIndicator(index)} />
          </Typography>
          <ResultsSelector
            label="Результат"
            onChange={addResult(index)}
            valueLabel=""
            value={0}
            cleanLabelAfterSelect
            resultsList={resultsList}
          />
          <div className={classes.chipsList}>
            {indicator.results.map(result => (
              <Chip key={`result-${result.value}`} className={classes.chip} onDelete={() => removeResult(result.value, index)} label={result.label} />
            ))}
          </div>

          <TextField
            label="Знания"
            onChange={changeZunFields(index, 'knowledge')}
            variant="outlined"
            className={classes.marginBottom30}
          />
          <TextField
            label="Умения"
            onChange={changeZunFields(index, 'skills')}
            variant="outlined"
            className={classes.marginBottom30}
          />
          <TextField
            label="Навыки"
            onChange={changeZunFields(index, 'attainments')}
            variant="outlined"
            className={indicators.length === index + 1 ? undefined : classes.marginBottom30}
          />
        </React.Fragment>
      ))}

      {apRequired ? null : (
        <>
          <Typography className={classes.indicatorDialiogInfoMassage}>
            Если хотите выбрать ОП для которой сохраняете компетенции и индикаторы, переключите бегунок ниже и выберите нужные. Если компетенции и индикаторы для всех ОП, просто нажмите сохранить.
          </Typography>
          <FormGroup className={saveForPlans ? classes.switcher : undefined}>
            <FormControlLabel onChange={changeSaveForPlans} control={<Switch />} label="Сохранить для конкретного УП" />
          </FormGroup>
        </>
      )}
      {saveForPlans || apRequired ? (
          <div style={{marginTop: apRequired && indicators.length ? 30 : 0}}>
            <SimpleSelector label="Учебный план и образовательная программа"
                            value={plans[0]?.value}
                            onChange={addPlan}
                            metaList={epForSelect}
                            wrapClass={classes.planSelectorWrap}
            />

            {/*<PlanSelector*/}
            {/*    label="Учебный план и образовательная программа"*/}
            {/*    onChange={addPlan}*/}
            {/*    valueLabel={plans[0]?.label}*/}
            {/*    value={plans[0]?.value}*/}
            {/*    workProgramId={workProgramId}*/}
            {/*/>*/}
            {/*<div className={classes.chipsList}>*/}
            {/*  {plans.map(plan => (*/}
            {/*      <Chip key={`result-${plan.value}`} className={classes.chip} onDelete={() => removePlan(plan.value)} label={plan.label} />*/}
            {/*  ))}*/}
            {/*</div>*/}
          </div>
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
          <Button onClick={saveForPlans || apRequired ? saveZunForThisEP : saveZun}
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
