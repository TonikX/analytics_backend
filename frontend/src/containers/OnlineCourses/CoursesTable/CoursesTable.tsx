import React from 'react'
import {Link} from "react-router-dom";

import { useStyles } from './CoursesTable.styles'

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Scrollbars from "react-custom-scrollbars";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";

import SortingButton from "../../../components/SortingButton";

import {SortingType} from "../../../components/SortingButton/types";
import {CourseFields} from '../enum';
import actions from '../actions'
import { CoursesTableProps } from './types'
import { useDispatch } from 'react-redux'

export const CoursesTable: React.FC<CoursesTableProps> = ({ courses, sortingField, sortingMode, handleClickDelete, handleClickEdit }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const changeSorting = (field: string) => (mode: SortingType)=> {
    dispatch(actions.changeSorting({field: mode === '' ? '' : field, mode}));
    dispatch(actions.getCourses());
  }

  return (
    <Scrollbars>
      <div className={classes.tableWrap}>
        <Table stickyHeader size='small'>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell>
                Название курса
                <SortingButton changeMode={changeSorting(CourseFields.TITLE)}
                                mode={sortingField === CourseFields.TITLE ? sortingMode : ''}
                />
              </TableCell>
              <TableCell>
                Ссылка на курс
                <SortingButton changeMode={changeSorting(CourseFields.COURSE_URL)}
                                mode={sortingField === CourseFields.COURSE_URL ? sortingMode : ''}
                />
              </TableCell>
              <TableCell>
                Платформа
                <SortingButton changeMode={changeSorting(CourseFields.PLATFORM)}
                                mode={sortingField === CourseFields.PLATFORM ? sortingMode : ''}
                />
              </TableCell>
              <TableCell>
                Описание
                <SortingButton changeMode={changeSorting(CourseFields.DESCRIPTION)}
                                mode={sortingField === CourseFields.DESCRIPTION ? sortingMode : ''}
                />
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map(course =>
              <TableRow key={course[CourseFields.ID]}>
                <TableCell> {course[CourseFields.TITLE]} </TableCell>
                <TableCell>
                  <Link to={course[CourseFields.COURSE_URL]} className={classes.link}>
                      {course[CourseFields.COURSE_URL]}
                  </Link>
                </TableCell>
                <TableCell>
                  {course[CourseFields.PLATFORM]}
                </TableCell>
                <TableCell>
                  {course[CourseFields.DESCRIPTION].length > 50 ?
                      course[CourseFields.DESCRIPTION].slice(0, 50) + '...'
                      :
                      course[CourseFields.DESCRIPTION]
                  }
                </TableCell>

                <TableCell>
                  <div className={classes.actions}>
                    <IconButton onClick={() => handleClickDelete(course[CourseFields.ID])}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleClickEdit(course)}>
                      <EditIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Scrollbars>
  )
}