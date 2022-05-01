import React, { useMemo } from 'react'
import cn from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import {EvaluationCertificationTotalListProps} from "./types"

import connect from './EvaluationCertificationTotalList.connect'
import styles from './EvaluationCertificationTotalList.styles'
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Table from "@material-ui/core/Table"
import {getEvaluationToolsMaxSum} from "../utils"
import {EvaluationToolFields} from "../enum"

const EvaluationCertificationTotalList = ({
  semesterCount, intermediateCertificationList, evaluationToolsList, classes,
}: EvaluationCertificationTotalListProps) => {

  const columns = useMemo(() => new Array(semesterCount).fill(0), [semesterCount])

  return (
    <div>
      <Table className={classes.tableWrap}>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell />
            {columns.map((sem, index) => (
              <TableCell key={`cell-header-${index}`}>
                Семестр {index + 1}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              Оценочные средства
            </TableCell>
            {columns.map((sem, index) => {
              const sum = getEvaluationToolsMaxSum(evaluationToolsList.filter(((item: any) => item[EvaluationToolFields.SEMESTER] === index + 1)))
              return (
                <TableCell className={cn({[classes.error]: sum !== 80})}>
                  {sum}
                </TableCell>
              )
            })}
          </TableRow>
          <TableRow>
            <TableCell>
              Аттестационные оценочные средства
            </TableCell>

            {columns.map((sem, index) => {
              const sum = getEvaluationToolsMaxSum(intermediateCertificationList.filter(((item: any) => item[EvaluationToolFields.SEMESTER] === index + 1)))
              return (
                // <TableCell className={cn({[classes.error]: sum !== 20})}>
                <TableCell>
                  {sum}
                </TableCell>
              )
            })}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default connect(withStyles(styles)(EvaluationCertificationTotalList))
