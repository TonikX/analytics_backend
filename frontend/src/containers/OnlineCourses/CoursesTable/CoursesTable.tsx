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
import {CourseFields} from '../enum';
import actions from '../actions'
import { CoursesTableProps } from './types'

export const CoursesTable: React.FC<CoursesTableProps> = ({ courses, sortingField, sortingMode, handleClickDelete }) => {
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
                  <SortingButton changeMode={changeSorting(CourseFields.TITLE)}
                                  mode={sortingField === CourseFields.TITLE ? sortingMode : ''}
                  />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component='div'>
                  Правообладатель
                  <SortingButton changeMode={changeSorting(CourseFields.COURSE_URL)}
                                  mode={sortingField === CourseFields.COURSE_URL ? sortingMode : ''}
                  />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component='div'>
                  Платформа
                  <SortingButton changeMode={changeSorting(CourseFields.PLATFORM)}
                                  mode={sortingField === CourseFields.PLATFORM ? sortingMode : ''}
                  />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component='div'>
                  Язык
                  <SortingButton changeMode={() => {}}
                                  mode={''}
                  />
                </Typography>
              </TableCell>
              <TableCell>
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
              <TableCell>
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
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map(course =>
              <TableRow key={course[CourseFields.ID]}>
                <TableCell>
                  <Link to={course[CourseFields.COURSE_URL]} className={classes.link}>
                    {course[CourseFields.TITLE]}
                  </Link>
                </TableCell>
                <TableCell>
                  Университет ИТМО
                </TableCell>
                <TableCell>
                  {course[CourseFields.PLATFORM]}
                </TableCell>
                <TableCell>
                  Русский
                </TableCell>
                <TableCell align="left">
                  16.02.2021
                </TableCell>
                <TableCell align="left">
                  10.0
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Scrollbars>
  )
}