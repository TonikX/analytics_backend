import React, {useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import get from 'lodash/get'
import {Link} from 'react-router-dom'
import classNames from "classnames";

import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Button from '@mui/material/Button'
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add'
import EditIcon from "@mui/icons-material/EditOutlined";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Typography from "@mui/material/Typography";

import { rootState } from '../../../store/reducers'
import {appRouter} from "../../../service/router-service";

import actions from '../actions'
import {
  getApWithCompetencesAndIndicatorsToWp,
  getAllCompetencesAndIndicatorsForWp,
  getWorkProgramId,
  getWorkProgramField,
  getWorkProgramCompetenceFiltersImp,
  getWorkProgramCompetenceFiltersAP,
  getWorkProgramCompetenceFiltersYear,
  getResultsForSelect,
} from '../getters'

import IndicatorsDialog from './IndicatorDialog'
import {UpdateZunDialog} from './UpdateZunDialog'

import SimpleSelector from '../../../components/SimpleSelector';
import DatePickerComponent from '../../../components/DatePicker';

import { useStyles } from './Competences.styles'
import {YEAR_DATE_FORMAT} from "../../../common/utils";
import Checkbox from "@mui/material/Checkbox";

export default React.memo(() => {
  const dispatch = useDispatch()
  const isFirstEnterSecondTab = useRef(true)
  const [isOpenIndicatorDialog, setIsOpenIndicatorDialog] = useState(false)
  const [isOpenUpdateZunDialog, setIsOpenUpdateZunDialog] = useState<any>(false)
  const [tab, setTab] = useState('1')
  const [dialogCompetence, setDialogCompetence] = useState<{value: number; label: string} | undefined>(undefined)
  const [checkedIndicators, setCheckedIndicators] = useState<number[]>([])

  const competencesList1 = useSelector((state: rootState) => getApWithCompetencesAndIndicatorsToWp(state))
  const competencesList2 = useSelector((state: rootState) => getAllCompetencesAndIndicatorsForWp(state))
  const workProgramId = useSelector((state: rootState) => getWorkProgramId(state))
  const classes = useStyles()

  const handleCloseDialog = () => {
    setDialogCompetence(undefined)
    setIsOpenIndicatorDialog(false)
  }

  const selectIndicator = (id: number, e: any) => {
    if (e.target.checked) {
      setCheckedIndicators([...checkedIndicators, id])
    } else {
      setCheckedIndicators(checkedIndicators.filter(checkedId => checkedId !== id))
    }
  }

  const handleCreateZUN = () => {
    setIsOpenIndicatorDialog(true)
  }

  const deleteZun = (zunId: number) => {
    dispatch(actions.deleteZUN(zunId))
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (isFirstEnterSecondTab.current) {
      dispatch(actions.getAllCompetencesAndIndicatorsForWp())
      isFirstEnterSecondTab.current = false
    }
    setTab(newValue);
  };

  const filterImp = useSelector((state: rootState) => getWorkProgramCompetenceFiltersImp(state))
  const filterAp = useSelector((state: rootState) => getWorkProgramCompetenceFiltersAP(state))
  const filterYear = useSelector((state: rootState) => getWorkProgramCompetenceFiltersYear(state))

  const filterMessage = !filterAp ? (
    <Typography className={classes.filterMessage}>
      Выберите учебный план, чтобы увидеть результаты
    </Typography>
  ) : null;

  const epList = useSelector((state: rootState) => getWorkProgramField(state, 'work_program_in_change_block'))
  const resultsList = useSelector((state: rootState) => getResultsForSelect(state))

  const impList = epList && epList.reduce((plans:any, currentPlan:any) => {
    const academicPlan = currentPlan?.discipline_block_module?.descipline_block[0]?.academic_plan;
    const desciplineBlock = currentPlan?.discipline_block_module?.descipline_block[0];
    if (academicPlan === undefined) {
      return plans;
    }

    return ([
      ...plans,
      {
        value: desciplineBlock?.id,
        label: `Направление: ${academicPlan?.academic_plan_in_field_of_study[0]?.field_of_study[0]?.title}
                  / ОП: ${academicPlan?.academic_plan_in_field_of_study[0]?.title} 
                  (${academicPlan?.academic_plan_in_field_of_study[0]?.year})
                 `,
      }
    ])
  }, [])

  const apList = epList && epList.reduce((fullPlans: any, currentPlan: any) => {
    const plans = currentPlan?.discipline_block_module?.descipline_block?.reduce((plans: any, item: any) => {
      const academicPlan = item?.academic_plan;

      if (academicPlan === undefined || filterYear && +filterYear !== academicPlan?.academic_plan_in_field_of_study[0]?.year) {
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

    return [
      ...fullPlans,
      ...plans,
    ]
  }, [])

  const onChangeFilterYear = (value:any) => {
    dispatch(actions.updateCompetenceFilterYear(value ? value.format(YEAR_DATE_FORMAT) : ''))
    dispatch(actions.updateCompetenceFilterAP(null))
    if (filterImp || filterAp) {
      dispatch(actions.getApWithCompetencesAndIndicatorsToWp())
    }
  }

  const onChangeFilterIMP = (value:any) => {
    dispatch(actions.updateCompetenceFilterIMP(value))
    dispatch(actions.getApWithCompetencesAndIndicatorsToWp())
  }

  const onChangeFilterAP = (value:any) => {
    dispatch(actions.updateCompetenceFilterAP(value))
    dispatch(actions.getApWithCompetencesAndIndicatorsToWp())
  }

  const onDeleteIndicators = () => {
    dispatch(actions.deleteIndicators(checkedIndicators))
  }

  return (
    <>
    <Box className={classes.competencesBlock} sx={{ width: '100%', typography: 'body1' }}>
      <Typography>
        Вариант 1 - отображение компетенций и их индикаторов <b>по выбранному учебному плану</b> <br/>
        Вариант 2 - отображение всех компетенций их индикаторов и связанных с ними учебных планов <br/>
      </Typography>
      <TabContext value={tab}>
        <Box
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            className={classes.workProgramButtonPanel}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Вариант 1" value="1" />
            <Tab label="Вариант 2" value="2" />
          </TabList>
          <div className={classes.buttonZun}>
            {checkedIndicators.length > 0 && (
              <Button
                onClick={onDeleteIndicators}
                variant="outlined"
                className={classes.addZUNButton}
                color="secondary"
              >
                Удалить выбранные индикаторы
              </Button>
            )}
            <Button
              onClick={handleCreateZUN}
              variant="outlined"
              className={classes.addZUNButton}
              color="secondary"
            >
              Добавить
            </Button>
          </div>
        </Box>

        <TabPanel className={classes.workProgramTabPanel} value="2">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.header}>
                  Компетенция
                </TableCell>
                <TableCell className={classNames(classes.header, classes.bigCell)}>
                  Индикатор
                </TableCell>
                <TableCell className={classes.header}>
                  Результаты
                </TableCell>
                <TableCell className={classes.header}>
                  Образовательная программа / Направление подготовки
                </TableCell>
                <TableCell className={classNames(classes.header, classes.bigCell)}>
                  ЗУН
                </TableCell>
                <TableCell className={classNames(classes.header, classes.bigCell)} />
              </TableRow>
            </TableHead>
            <TableBody>
              {competencesList2.map((competence: any) => {
                const zuns = competence?.zuns ?? []
                const addIndicatorButton = (
                  <div className={classes.smallButton}
                      onClick={() => {
                        setIsOpenIndicatorDialog(true)
                        setDialogCompetence({
                          label: competence.name,
                          value: competence.id,
                        })
                      }}
                  >
                    <AddIcon/> Добавить индикатор
                  </div>
                )
                if (zuns.length === 0){
                  return (
                    <TableRow>
                      <TableCell className={classes.cell}>
                        {competence.number} {competence.name}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {addIndicatorButton}
                      </TableCell>
                    </TableRow>
                  )
                }

                return zuns.map((zun: any, index: number) => (
                  <TableRow key={competence.number + 'zun' + index}>
                    {index === 0 ?
                      <TableCell rowSpan={zuns.length} className={classes.cell}>
                        {competence.number} {competence.name}
                        {addIndicatorButton}
                      </TableCell>
                      : <></>
                    }
                    <TableCell>
                      {zun?.indicator?.number} {zun?.indicator?.name}
                      <div className={classes.smallButton}
                          onClick={() => deleteZun(zun.id)}
                      >
                        Удалить индикатор
                      </div>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {get(zun, 'items', []).map((item: any) => (
                        <div key={competence.number + 'zun' + index + item.id}>
                          {item.name}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {get(zun, 'educational_program', []).map((educationalProgram: any) =>
                          get(educationalProgram, 'field_of_study', []).map((fieldOfStudy: any) => (
                            <div key={fieldOfStudy.id}>
                              <Link to={appRouter.getPlanDetailLink(educationalProgram.academic_plan.id)} target="_blank">
                                {get(fieldOfStudy, 'number', '')} {get(fieldOfStudy, 'title', '')}
                                /
                                {educationalProgram.title} ({educationalProgram?.year})</Link>
                            </div>
                          ))
                      )}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {[zun?.knowledge, zun?.skills, zun?.attainments].filter(item => Boolean(item)).join(' / ')}
                      <IconButton onClick={() => setIsOpenUpdateZunDialog(zun)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Checkbox checked={checkedIndicators.includes(zun.id)} onChange={(e) => selectIndicator(zun.id, e)}/>
                    </TableCell>
                  </TableRow>
                ))
              })}
            </TableBody>
          </Table>

        </TabPanel>

        <TabPanel value="1" className={classes.workProgramTabPanel}>

          <div className={classes.competenceFilter}>
            <div className={classes.competenceFilterDate}>
              <DatePickerComponent
                  label="Год"
                  views={["year"]}
                  onChange={onChangeFilterYear}
                  format={YEAR_DATE_FORMAT}
                  minDate={'2017'}
                  maxDate={((new Date()).getFullYear() + 3).toString()}
                  noMargin
                  value={filterYear.toString()}
              />
            </div>

            {/*<div className={classes.competenceFilterSelect}>*/}
            {/*  <SimpleSelector*/}
            {/*      label="Имплементация УП"*/}
            {/*      metaList={impList || []}*/}
            {/*      onChange={onChangeFilterIMP}*/}
            {/*      wrapClass={classes.selectorWrap}*/}
            {/*      noMargin*/}
            {/*  />*/}
            {/*</div>*/}

            <div className={classes.competenceFilterSelect}>
              <SimpleSelector
                  label="Учебный план"
                  metaList={apList || []}
                  onChange={onChangeFilterAP}
                  wrapClass={classes.selectorWrap}
                  noMargin
                  value={filterAp ? filterAp : undefined}
                  key={filterAp}
              />
            </div>
          </div>

          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.header}>
                  Образовательная программа / Направление подготовки
                </TableCell>
                <TableCell className={classes.header}>
                  Компетенция
                </TableCell>
                <TableCell className={classNames(classes.header, classes.bigCell)}>
                  Индикатор
                </TableCell>
                <TableCell className={classes.header}>
                  Результаты
                </TableCell>
                <TableCell className={classNames(classes.header, classes.bigCell)}>
                  ЗУН
                </TableCell>
                <TableCell className={classes.header} />
              </TableRow>
            </TableHead>

            <TableBody>
              {competencesList1.map((syllabus: any) => {
                const allZunsIntoSyllabusCount = syllabus.competences.reduce((count: number, competence: any) => {
                  return count + competence.zuns.length || 0
                }, 0)

                return syllabus.competences.map((competence: any, competenceIndex: number) => {
                  const addIndicatorButton = (
                    <div className={classes.smallButton}
                        onClick={() => {
                          setIsOpenIndicatorDialog(true)
                          setDialogCompetence({
                            label: competence.name,
                            value: competence.id,
                          })
                        }}
                    >
                      <AddIcon/> Добавить индикатор
                    </div>
                  )
                  const zuns = competence.zuns

                  if (zuns.length === 0) {
                    return (
                      <TableRow>
                        {competenceIndex === 0 ? (
                          <TableCell className={classes.cell} rowSpan={allZunsIntoSyllabusCount}>
                            <Link to={appRouter.getPlanDetailLink(syllabus?.academic_plan?.id)} target="_blank">
                              {syllabus?.field_of_study[0]?.number} {syllabus?.field_of_study[0]?.title}
                              /
                              {syllabus?.title}
                            </Link>
                          </TableCell>
                        ) : null }

                        <TableCell className={classes.cell}>
                          {competence?.number} {competence?.name}
                          {addIndicatorButton}
                        </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                      </TableRow>
                    )
                  }

                  return zuns.map((zun: any, index: number) => (
                    <TableRow>
                      {competenceIndex === 0 && index === 0 ? (
                        <TableCell rowSpan={allZunsIntoSyllabusCount} className={classes.cell}>
                          <Link to={appRouter.getPlanDetailLink(syllabus?.academic_plan?.id)} target="_blank">
                            {syllabus?.field_of_study[0]?.number} {syllabus?.field_of_study[0]?.title}
                            /
                            {syllabus?.title} ({syllabus?.year})
                          </Link>
                        </TableCell>
                      ) : null}
                      {index === 0 ?
                        <TableCell rowSpan={zuns.length} className={classes.cell}>
                          {competence?.number} {competence?.name}
                          {addIndicatorButton}
                        </TableCell>
                        : null
                      }
                      <TableCell className={classes.cell}>
                        {zun.indicator.number} {zun.indicator.name}
                        <div className={classes.smallButton}
                             onClick={() => deleteZun(zun.id)}
                        >
                          Удалить индикатор
                        </div>
                      </TableCell>
                      <TableCell>
                        {zun.items?.map((item: any) => item.name).join(', ')}
                      </TableCell>
                      <TableCell>
                        {[zun?.knowledge, zun?.skills, zun?.attainments].filter(item => Boolean(item)).join(' / ')}
                        <IconButton onClick={() => setIsOpenUpdateZunDialog(zun)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Checkbox checked={checkedIndicators.includes(zun.id)} onChange={(e) => selectIndicator(zun.id, e)}/>
                      </TableCell>
                    </TableRow>
                  ))
                })
              })}
            </TableBody>
          </Table>
          {filterMessage}
        </TabPanel>
      </TabContext>
    </Box>
    {isOpenIndicatorDialog ?
      <IndicatorsDialog
        isOpen={isOpenIndicatorDialog}
        handleClose={handleCloseDialog}
        defaultCompetence={dialogCompetence}
        workProgramId={workProgramId}
        epList={epList}
        resultsList={resultsList}
      />
      : null
    }
    {isOpenUpdateZunDialog ?
      <UpdateZunDialog
        isOpen
        handleClose={() => setIsOpenUpdateZunDialog(false)}
        results={isOpenUpdateZunDialog.items}
        zunId={isOpenUpdateZunDialog.id}
        indicator={isOpenUpdateZunDialog.indicator}
        defaultAttainments={isOpenUpdateZunDialog?.attainments}
        defaultSkills={isOpenUpdateZunDialog?.skills}
        defaultKnowledge={isOpenUpdateZunDialog?.knowledge}
        resultsList={resultsList}
      /> : null
    }
  </>)
})
