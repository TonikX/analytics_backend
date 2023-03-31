import React from 'react'
import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux'

import { useStyles } from './CoursesTable.styles'

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Scrollbars from "react-custom-scrollbars";
import SortingButton from "../../../components/SortingButton";

import actions from '../actions'

import {SortingType} from "../../../components/SortingButton/types";
import {CourseFields, InstitutionFields, PlatformFields, CourseSortingFields} from '../enum';
import { CoursesTableProps } from './types'
import { languageObject } from '../../WorkProgram/constants'
import get from 'lodash/get'

export const CoursesTable: React.FC<CoursesTableProps> = ({ courses, sortingField, sortingMode }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const changeSorting = (field: string) => (mode: SortingType)=> {
    dispatch(actions.changeSorting({field: mode === '' ? '' : field, mode}));
    dispatch(actions.getCourses());
  }

  return (
    <Scrollbars>
      <div className={classes.tableWrap}>
        <Table stickyHeader>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell>
                <Typography component='div'>
                  Название курса
                  <SortingButton changeMode={changeSorting(CourseSortingFields.TITLE)}
                                  mode={sortingField === CourseSortingFields.TITLE ? sortingMode : ''}
                  />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component='div'>
                  Правообладатель
                  <SortingButton changeMode={changeSorting(CourseSortingFields.INSTITUTION_TITLE)}
                                  mode={sortingField === CourseSortingFields.INSTITUTION_TITLE ? sortingMode : ''}
                  />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component='div'>
                  Платформа
                  <SortingButton changeMode={changeSorting(CourseSortingFields.PLATFORM_TITLE)}
                                  mode={sortingField === CourseSortingFields.PLATFORM_TITLE ? sortingMode : ''}
                  />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component='div'>
                  Язык
                  <SortingButton changeMode={changeSorting(CourseSortingFields.LANGUAGE)}
                                  mode={sortingField === CourseSortingFields.LANGUAGE ? sortingMode : ''}
                  />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  component='div' 
                  style={{whiteSpace: 'normal', display: 'flex', alignItems: 'center', width: '185px'}}
                >
                  Дата ближайшего запуска
                  <SortingButton changeMode={changeSorting(CourseFields.STARTED_AT)}
                                  mode={sortingField === CourseFields.STARTED_AT ? sortingMode : ''}
                  />
                </Typography> 
              </TableCell>
              <TableCell>
                <Typography 
                  component='div'
                  style={{whiteSpace: 'normal', display: 'flex', alignItems: 'center', width: '100px'}}
                >
                  Общий рейтинг
                  <SortingButton changeMode={changeSorting(CourseFields.RATING)}
                                  mode={sortingField === CourseFields.RATING ? sortingMode : ''}
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
                  {get(course, `${CourseFields.INSTITUTION}.${InstitutionFields.TITLE}`, '')}
                </TableCell>
                <TableCell>
                  {get(course, `${CourseFields.PLATFORM}.${PlatformFields.TITLE}`, '')}
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