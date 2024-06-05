import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'
import Scrollbars from 'react-custom-scrollbars-2'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"

import { useStyles } from './Results.styles'

import { getOutcomes, getOutcomesList } from '../getters'
import { rootState } from '../../../store/reducers'
import { outcomeFields } from '../enum'
import { outcomeType } from '../types'

export const Results:React.FC = () => {
  const classes = useStyles()
  const outcomes = useSelector((state: rootState) => getOutcomes(state))
  const outcomesList = useSelector((state: rootState) => getOutcomesList(state))
  return (
    <div>
      <Typography className={classes.title}>Результаты</Typography>
      <Typography className={classes.description}>{outcomes}</Typography>
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
              {outcomesList.map((outcome: outcomeType) => (
                <TableRow key={outcome[outcomeFields.ID]}>
                  <TableCell>{outcome[outcomeFields.NAME]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Scrollbars>
    </div>
  )
}
