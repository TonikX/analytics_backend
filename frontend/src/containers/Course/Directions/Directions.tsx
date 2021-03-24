import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Scrollbars from 'react-custom-scrollbars'

import { useStyles } from './Directions.styles'

import { getFieldsOfStudy } from '../getters'
import { rootState } from '../../../store/reducers'
import { fieldsOfStudyFields } from '../enum'
import { fieldOfStudyType } from '../types'

export const Directions: React.FC = () => {
  const classes = useStyles()
  const fieldsOfStudy = useSelector((state: rootState) => getFieldsOfStudy(state))

  return (
    <div>
      <Typography className={classes.title}>Направления подготовки</Typography>
      <Typography><b>Направления</b></Typography>
      <Scrollbars style={{height: 'calc(100vh - 365px)'}}>
        <div className={classes.tableWrap}>
          <Table stickyHeader size='small'>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>
                  Название
                </TableCell>
                <TableCell>
                  Номер
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldsOfStudy.map((fieldOfStudy: fieldOfStudyType) => (
                <TableRow key={fieldOfStudy[fieldsOfStudyFields.ID]}>
                  <TableCell>{fieldOfStudy[fieldsOfStudyFields.FIELD_OF_STUDY][fieldsOfStudyFields.TITLE]}</TableCell>
                  <TableCell>{fieldOfStudy[fieldsOfStudyFields.FIELD_OF_STUDY][fieldsOfStudyFields.NUMBER]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Scrollbars>
    </div>
  )
}