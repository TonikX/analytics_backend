import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import get from 'lodash/get'

import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'


import IndicatorsDialog from './IndicatorDialog'
import { useStyles } from './Competences.styles'
import {getId, getCompetences} from "../../getters";
import {rootState} from "../../../../store/reducers";
import actions from "../../actions";

export default React.memo(() => {
  const dispatch = useDispatch()
  const [isOpenIndicatorDialog, setIsOpenIndicatorDialog] = useState(false)
  const [dialogCompetence, setDialogCompetence] = useState<{value: number; label: string} | undefined>(undefined)

  const competences = useSelector((state: rootState) => getCompetences(state))
  const practiceId = useSelector((state: rootState) => getId(state));
  const classes = useStyles()

  const handleCloseDialog = () => {
    setDialogCompetence(undefined);
    setIsOpenIndicatorDialog(false)
  }

  const handleCreateZUN = () => {
    setIsOpenIndicatorDialog(true)
  }

  // useEffect(() => {
  //   if (workProgramId) {
  //     dispatch(actions.getResults(workProgramId))
  //   }
  // }, [workProgramId]);

  const deleteCompetence = (competenceId: number) => {
    dispatch(actions.deleteZUN(competenceId))
  };

  return (
    <>
      <Typography className={classes.subTitle}>
        Компетенции
        <Button
          onClick={handleCreateZUN}
          variant="outlined"
          className={classes.addZUNButton}
          color="secondary"
        >
          Добавить ЗУН
        </Button>
      </Typography>

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
            <TableCell className={classes.header}>
              {' '}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {competences.map((competence: any) => {
            const zuns = get(competence, 'zuns', []);
            console.log(zuns);
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
                  {[get(zun, 'knowledge'), get(zun, 'skills'), get(zun, 'attainments')].filter(item => Boolean(item)).join(' / ')}
                </TableCell>
                <TableCell>
                  <div className={classes.smallButton}
                       onClick={() => deleteCompetence(zun.id)}
                  >
                    Удалить индикатор
                  </div>
                </TableCell>
              </TableRow>
            ))
          })}
        </TableBody>
      </Table>

      <IndicatorsDialog
        isOpen={isOpenIndicatorDialog}
        handleClose={handleCloseDialog}
        defaultCompetence={dialogCompetence}
        practiceId={practiceId}
      />
    </>
  )
})
