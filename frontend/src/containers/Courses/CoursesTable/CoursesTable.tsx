import React from 'react'
import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux'

import { useStyles } from './CoursesTable.styles'

import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Scrollbars from "react-custom-scrollbars";
import SortingButton from "../../../components/SortingButton";

import {SortingType} from "../../../components/SortingButton/types";
import {CourseFields, InstitutionFields, PlatformFields} from '../enum';
import actions from '../actions'
import { CoursesTableProps } from './types'
import { InstitutionType, PlatformType } from '../types'
import { languageObject } from '../../WorkProgram/constants'

export const CoursesTable: React.FC<CoursesTableProps> = ({ courses, sortingField, sortingMode, institutions, platforms }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const changeSorting = (field: string) => (mode: SortingType)=> {
    dispatch(actions.changeSorting({field: mode === '' ? '' : field, mode}));
    dispatch(actions.getCourses());
  }
  const getInstitutionName = (institutionId: number): string => {
    if (institutions.length) {
      return institutions.filter((institution: InstitutionType) => institution[InstitutionFields.ID] ===  institutionId)[0][InstitutionFields.TITLE]
    } else return ''
  }
  const getPlatformName = (platformId: number): string => {
    if (platforms.length) {
      return platforms.filter((platform: PlatformType) => platform[PlatformFields.ID] ===  platformId)[0][PlatformFields.TITLE]
    } else return ''
  } 
  return (
    <Scrollbars>
      <div className={classes.tableWrap}>
        <Table stickyHeader>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell className={classes.stickyHeader}>
                <Typography component='div'>
                  Название курса
                  <SortingButton changeMode={changeSorting(CourseFields.TITLE)}
                                  mode={sortingField === CourseFields.TITLE ? sortingMode : ''}
                  />
                </Typography>
              </TableCell>
              <TableCell className={classes.stickyHeader}>
                <Typography component='div'>
                  Правообладатель
                  <SortingButton changeMode={() => {}}
                                  mode={''}
                  />
                </Typography>
              </TableCell>
              <TableCell className={classes.stickyHeader}>
                <Typography component='div'>
                  Платформа
                  <SortingButton changeMode={() => {}}
                                  mode={''}
                  />
                </Typography>
              </TableCell>
              <TableCell className={classes.stickyHeader}>
                <Typography component='div'>
                  Язык
                  <SortingButton changeMode={() => {}}
                                  mode={''}
                  />
                </Typography>
              </TableCell>
              <TableCell className={classes.stickyHeader}>
                <Typography 
                  component='div' 
                  style={{whiteSpace: 'normal', display: 'flex', alignItems: 'center', width: '185px'}}
                >
                  Дата ближайшего запуска
                  <SortingButton changeMode={() => {}}
                                  mode={''}
                  />
                </Typography> 
              </TableCell>
              <TableCell className={classes.stickyHeader}>
                <Typography 
                  component='div'
                  style={{whiteSpace: 'normal', display: 'flex', alignItems: 'center', width: '100px'}}
                >
                  Общий рейтинг
                  <SortingButton changeMode={() => {}}
                                  mode={''}
                  />
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map(course =>
              <TableRow key={course[CourseFields.ID]}>
                <TableCell className={classes.link}>
                  <Link target='_blank' to={`/course/${course[CourseFields.ID]}`}>
                    {course[CourseFields.TITLE]}
                  </Link>
                </TableCell>
                <TableCell>
                  {getInstitutionName(course[CourseFields.INSTITUTION_ID])}
                </TableCell>
                <TableCell>
                  {getPlatformName(course[CourseFields.PLATFORM_ID])}
                </TableCell>
                <TableCell>
                  {languageObject[course[CourseFields.LANGUAGE]]}
                </TableCell>
                <TableCell align="left">
                  {course[CourseFields.STARTED_AT]}
                </TableCell>
                <TableCell align="left">
                  {course[CourseFields.RATING]}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Scrollbars>
  )
}