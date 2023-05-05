import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import get from 'lodash/get'

import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add'
import EditIcon from "@mui/icons-material/EditOutlined";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import { rootState } from '../../../store/reducers'

import actions from '../actions'
import {getApWithCompetencesAndIndicatorsToWp, getAllCompetencesAndIndicatorsForWp, getWorkProgramId} from '../getters'

import IndicatorsDialog from './IndicatorDialog'
import {UpdateZunDialog} from './UpdateZunDialog'

import { useStyles } from './Competences.styles'

export default React.memo(() => {
  const dispatch = useDispatch()
  const [isOpenIndicatorDialog, setIsOpenIndicatorDialog] = useState(false)
  const [isOpenUpdateZunDialog, setIsOpenUpdateZunDialog] = useState<any>(false)
  const [tab, setTab] = useState('1')
  const [dialogCompetence, setDialogCompetence] = useState<{value: number; label: string} | undefined>(undefined)

  const competencesList1 = useSelector((state: rootState) => getApWithCompetencesAndIndicatorsToWp(state))
  const competencesList2 = useSelector((state: rootState) => getAllCompetencesAndIndicatorsForWp(state))
  const workProgramId = useSelector((state: rootState) => getWorkProgramId(state))
  const classes = useStyles()

  const handleCloseDialog = () => {
    setDialogCompetence(undefined)
    setIsOpenIndicatorDialog(false)
  }

  const handleCreateZUN = () => {
    setIsOpenIndicatorDialog(true)
  }

  useEffect(() => {
    if (workProgramId) {
      dispatch(actions.getApWithCompetencesAndIndicatorsToWp())
      dispatch(actions.getAllCompetencesAndIndicatorsForWp())
    }
  }, [workProgramId]);

  const deleteZun = (zunId: number) => {
    dispatch(actions.deleteZUN(zunId))
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box 
            sx={{ borderBottom: 1, borderColor: 'divider' }} 
            className={classes.workProgramButtonPanel}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Вариант 1" value="1" />
            <Tab label="Вариант 2" value="2" />
          </TabList>
          <Button
              onClick={handleCreateZUN}
              variant="outlined"
              className={classes.addZUNButton}
              color="secondary"
            >
              Добавить ЗУН
          </Button>
        </Box>
        <TabPanel className={classes.workProgramTabPanel} value="1">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.header}>
                  Компетенция
                </TableCell>
                <TableCell className={classes.header}>
                  Индикатор
                </TableCell>
                <TableCell className={classes.header}>
                  Результаты
                </TableCell>
                <TableCell className={classes.header}>
                  Учебный план
                </TableCell>
                <TableCell className={classes.header}>
                  ЗУН
                </TableCell>
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
                              {get(fieldOfStudy, 'number', '')} {get(fieldOfStudy, 'title', '')}
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
                  </TableRow>
                ))
              })}
            </TableBody>
          </Table>

        </TabPanel>

        <TabPanel value="2" className={classes.workProgramTabPanel}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.header}>
                  Учебный план
                </TableCell>
                <TableCell className={classes.header}>
                  Компетенция
                </TableCell>
                <TableCell className={classes.header}>
                  Индикатор
                </TableCell>
                <TableCell className={classes.header}>
                  Результаты
                </TableCell>
                <TableCell className={classes.header}>
                  ЗУН
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {competencesList1.map((syllabus: any) => {
                return syllabus.competences.map((competence: any, index: number) => {
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
                        <TableCell className={classes.cell}>
                          {syllabus?.field_of_study[0]?.number} {syllabus?.field_of_study[0]?.title}
                        </TableCell>
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
                      {index === 0 ?
                        <>
                          <TableCell rowSpan={zuns.length} className={classes.cell}>
                            {syllabus?.field_of_study[0]?.number} {syllabus?.field_of_study[0]?.title}
                          </TableCell>
                          <TableCell rowSpan={zuns.length} className={classes.cell}>
                            {competence?.number} {competence?.name}
                            {addIndicatorButton}
                          </TableCell>
                        </>
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
                        {zun.items?.[0]?.name}
                      </TableCell>
                      <TableCell>
                        {[zun?.knowledge, zun?.skills, zun?.attainments].filter(item => Boolean(item)).join(' / ')}
                        <IconButton onClick={() => setIsOpenUpdateZunDialog(zun)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                })
              })}
            </TableBody>
          </Table>

        </TabPanel>
      </TabContext>
    </Box>
    <IndicatorsDialog
      isOpen={isOpenIndicatorDialog}
      handleClose={handleCloseDialog}
      defaultCompetence={dialogCompetence}
      workProgramId={workProgramId}
    />
    {isOpenUpdateZunDialog ?
      <UpdateZunDialog
        isOpen
        handleClose={() => setIsOpenUpdateZunDialog(false)}
        zunId={isOpenUpdateZunDialog.id}
        defaultAttainments={isOpenUpdateZunDialog?.attainments}
        defaultSkills={isOpenUpdateZunDialog?.skills}
        defaultKnowledge={isOpenUpdateZunDialog?.knowledge}
      /> : null
    }
  </>)
})
