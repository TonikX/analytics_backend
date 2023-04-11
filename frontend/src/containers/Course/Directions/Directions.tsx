import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import Scrollbars from 'react-custom-scrollbars-2'

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