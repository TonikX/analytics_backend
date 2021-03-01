import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import get from 'lodash/get';

import {useStyles} from './EducationalProgramsTable.style'

import actions from '../actions'

import {getEducationPlanInDirectionFullName as getEduPlan} from '../../EduationPlanInDirection/getters'
import {getUserFullName} from "../../../common/utils";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import SortingButton from "../../../components/SortingButton";

import {EducationalProgramsTableProps} from './types'
import {SortingType, Types as sortFields} from '../../../components/SortingButton/types'
import {EducationalProgramType} from '../../EducationalProgram/types'
import {EducationProgramFields} from '../../EducationalProgram/enum'
import {specializationObject} from "../../WorkProgram/constants";

export const EducationalProgramsTable: React.FC<EducationalProgramsTableProps> = ({educationalPrograms}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [sortMode, setSortMode] = useState<string>('')
  const [sortingField, setSortingField] = useState<string>('')
  const [sortedPrograms, setSortedPrograms] = useState<Array<EducationalProgramType>>(educationalPrograms)
  useEffect(() => {
    setSortedPrograms(sortPrograms(sortingField, sortMode))
    // eslint-disable-next-line
  }, [sortMode, sortingField])

  useEffect(() => {
    return () => dispatch(actions.setEducationalPrograms([]))
    // eslint-disable-next-line
  }, [])
  const sortPrograms = (sortingField: string, sortMode: string): Array<EducationalProgramType> => {
    if (sortMode === sortFields.ASC) {
      if (sortingField === EducationProgramFields.ACADEMIC_PLAN_FOR_EP) {
        return [...educationalPrograms].sort((a, b) => 
          (getEduPlan(a[EducationProgramFields.ACADEMIC_PLAN_FOR_EP]) 
          < getEduPlan(b[EducationProgramFields.ACADEMIC_PLAN_FOR_EP]) ? -1 : 1))
      } else if (sortingField === EducationProgramFields.MANAGER) {
        return [...educationalPrograms].sort((a, b) => 
          (getUserFullName(a[EducationProgramFields.MANAGER]) 
          < getUserFullName(b[EducationProgramFields.MANAGER]) ? -1 : 1 )
        )
      } else if (sortingField === EducationProgramFields.QUALIFICATION) {
        return [...educationalPrograms].sort((a, b) => 
          (get(specializationObject, a[sortingField], '')
          < get(specializationObject, b[sortingField], '') ? -1 : 1 )
        )
      } else {
        return [...educationalPrograms].sort((a, b) => a[sortingField] < b[sortingField] ? -1 : 1)
      }
    } else if (sortMode === sortFields.DESC) {
      if (sortingField === EducationProgramFields.ACADEMIC_PLAN_FOR_EP) {
        return [...educationalPrograms].sort((a, b) => 
          (getEduPlan(a[EducationProgramFields.ACADEMIC_PLAN_FOR_EP]) 
          < getEduPlan(b[EducationProgramFields.ACADEMIC_PLAN_FOR_EP]) ? 1 : -1))
      } else if (sortingField === EducationProgramFields.MANAGER) {
        return [...educationalPrograms].sort((a, b) => 
          (getUserFullName(a[EducationProgramFields.MANAGER]) 
          < getUserFullName(b[EducationProgramFields.MANAGER]) ? 1 : -1 )
        )
      } else if (sortingField === EducationProgramFields.QUALIFICATION) {
        return [...educationalPrograms].sort((a, b) => 
          (get(specializationObject, a[sortingField], '')
          < get(specializationObject, b[sortingField], '') ? 1 : -1 )
        )
      } else {
        return [...educationalPrograms].sort((a, b) => a[sortingField] < b[sortingField] ? 1 : -1)
      }
    } else {
      return educationalPrograms
    }
  }

  const rows = sortedPrograms.map((p: EducationalProgramType) => (
    <TableRow key={p[EducationProgramFields.ID]}>
      <TableCell>
        {getEduPlan(p[EducationProgramFields.ACADEMIC_PLAN_FOR_EP])}
      </TableCell>
      <TableCell>
        {get(specializationObject, p[EducationProgramFields.QUALIFICATION], '')}
      </TableCell>
      <TableCell>
        {p[EducationProgramFields.YEAR]}
      </TableCell>
      <TableCell>
        {getUserFullName(p[EducationProgramFields.MANAGER])}
      </TableCell>
    </TableRow>
  ))

  const changeSorting = (field: string) => (mode: SortingType): void => {
    setSortMode(mode)
    setSortingField(field)  
  }

  return (
    <div className={classes.tableWrap}>
      <Table stickyHeader size='small'>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>
              Учебный план
              <SortingButton 
                changeMode={changeSorting(EducationProgramFields.ACADEMIC_PLAN_FOR_EP)}
                mode={sortingField === EducationProgramFields.ACADEMIC_PLAN_FOR_EP ? sortMode : ''}
              />
            </TableCell>
            <TableCell>
              Квалификация
              <SortingButton 
                changeMode={changeSorting(EducationProgramFields.QUALIFICATION)}
                mode={sortingField === EducationProgramFields.QUALIFICATION ? sortMode : ''}
              />
            </TableCell>
            <TableCell>
              Год начала
              <SortingButton 
                changeMode={changeSorting(EducationProgramFields.YEAR)}
                mode={sortingField === EducationProgramFields.YEAR ? sortMode : ''}
              />
            </TableCell>
            <TableCell>
              Руководитель
              <SortingButton 
                changeMode={changeSorting(EducationProgramFields.MANAGER)}
                mode={sortingField === EducationProgramFields.MANAGER ? sortMode : ''}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </div>
  )
}
