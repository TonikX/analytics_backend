import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'

import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import AddIcon from '@material-ui/icons/Add'

import { rootState } from '../../../store/reducers'
import { getWorkProgramCompetences } from '../getters'

import IndicatorsDialog from './IndicatorDialog'
import { useStyles } from './Competences.styles'
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

export default () => {
  const [isOpenCompetencesDialog, setIsOpenCompetencesDialog] = useState(false)
  const [isOpenIndicatorDialog, setIsOpenIndicatorDialog] = useState(false)

  const competences = useSelector((state: rootState) => getWorkProgramCompetences(state))
  const classes = useStyles()

  return (
    <div>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>
              Компетенция
            </TableCell>
            <TableCell className={classes.cell}>
              Индикатор
            </TableCell>
            <TableCell className={classes.cell}>
              Результаты
            </TableCell>
            <TableCell className={classes.cell}>
              Учебный план
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {competences.map((competence: any) => {
            const zuns = get(competence, 'zuns', [])
            const addIndicatorButton = (
              <div className={classes.smallButton}
                   onClick={() => setIsOpenIndicatorDialog(true)}
              >
                <AddIcon/> Добавить индикатор
              </div>
            )
            if (zuns.length === 0){
              return (
                <TableRow>
                  <TableCell className={classes.cell}>
                    {competence.number} {competence.name}
                    <DeleteIcon className={classes.deleteIcon}
                                onClick={() => {}}
                    />
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
                    {/*<DeleteIcon className={classes.deleteIcon}*/}
                    {/*            onClick={() => {}}*/}
                    {/*/>*/}
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
                <TableCell className={classes.cell}>
                  {get(zun, 'educational_program', []).map((educationalProgram: any) =>
                      get(educationalProgram, 'field_of_study', []).map((fieldOfStudy: any) => (
                        <div key={fieldOfStudy.id}>
                          {get(fieldOfStudy, 'number', '')} {get(fieldOfStudy, 'title', '')}
                        </div>
                      ))
                  )}
                </TableCell>
              </TableRow>
            ))
          })}
        </TableBody>
      </Table>

      <IndicatorsDialog
        isOpen={isOpenIndicatorDialog}
        handleClose={() => setIsOpenIndicatorDialog(false)}
      />
    </div>
  )
}