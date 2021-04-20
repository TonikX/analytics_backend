import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Scrollbars from 'react-custom-scrollbars'

import { useStyles } from './WorkPrograms.styles'
import { getWorkPrograms } from '../getters'
import { rootState } from '../../../store/reducers'
import { topicFields, disciplineSectionFields, wpFields } from '../enum'
import { topicType } from '../types'

export const WorkPrograms: React.FC = () => {
  const classes = useStyles()
  const workPrograms = useSelector((state: rootState) => getWorkPrograms(state))

  return (
    <div>
      <Typography className={classes.title}>Связанные с курсом РПД</Typography>
      <Scrollbars style={{height: 'calc(100vh - 365px)'}}>
        <div className={classes.tableWrap}>
          <Table stickyHeader size='small'>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>
                  Название
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workPrograms.map((workProgram: topicType) => (
                <TableRow key={workProgram[topicFields.ID]}>
                  <TableCell>
                    {/* eslint-disable-next-line*/}
                    <a target="_blank" href={`${window.location.origin}/work-program/${workProgram[topicFields.DISCIPLINE_SECTION][disciplineSectionFields.WORK_PROGRAM][wpFields.ID]}`} className={classes.link}>
                      <Typography>{workProgram[topicFields.DISCIPLINE_SECTION][disciplineSectionFields.WORK_PROGRAM][wpFields.TITLE]}</Typography>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Scrollbars>
    </div>
  )
}