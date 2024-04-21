import React, { useState } from 'react'

import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useStyles } from './FirstStep.styles'

import { checkUrl } from '../../../../common/utils';

import { CourseFields } from '../../enum'
import { FirstStepProps } from './types'

export const FirstStep: React.FC<FirstStepProps> = ({ saveField, course }) => {
  const classes = useStyles()
  const [urlIsFocused, setUrlIsFocused] = useState(false)

  const checkCourseUrl = urlIsFocused || course[CourseFields.COURSE_URL].length === 0 || checkUrl(course[CourseFields.COURSE_URL]);
 
  const courseUrlFieldFocus = () => {
    setUrlIsFocused(true)
  };

  const courseUrlFieldBlur = () => {
    setUrlIsFocused(false)
  };
  return (
    <DialogContent style={{overflow: 'hidden'}}>
      <TextField 
        label="Название курса *"
        onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Ссылка на онлайн-курс на сайте Платформы *"
        onChange={saveField(CourseFields.COURSE_URL)}
        variant="outlined"
        className={classes.input}
        fullWidth
        value={course[CourseFields.COURSE_URL]}
        InputLabelProps={{
            shrink: true,
        }}
        error={!checkCourseUrl}
        onFocus={courseUrlFieldFocus}
        onBlur={courseUrlFieldBlur}
      />
      <div className={classes.inputAddWrapper}>
        <TextField 
          label="Платформа *"
          //onChange={saveField(CourseFields.PLATFORM)}
          variant="outlined"
          className={classes.input}
          fullWidth
          //value={course[CourseFields.PLATFORM]}
          InputLabelProps={{
              shrink: true,
          }}
        />
        <Fab color="secondary"
          className={classes.addIcon}
          onClick={() => {}}
        >
          <AddIcon/>
        </Fab>
      </div>
      <div className={classes.inputAddWrapper}>
        <TextField 
          label="Правообладатель *"
          //onChange={saveField(CourseFields.PLATFORM)}
          variant="outlined"
          className={classes.input}
          fullWidth
          //value={course[CourseFields.PLATFORM]}
          InputLabelProps={{
              shrink: true,
          }}
        />
        <Fab color="secondary"
          className={classes.addIcon}
          onClick={() => {}}
        >
          <AddIcon/>
        </Fab>
      </div>
      <TextField 
        label="Язык онлайн-курса"
        //onChange={saveField(CourseFields.PLATFORM)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.PLATFORM]}
        InputLabelProps={{
            shrink: true,
        }}
      />
    </DialogContent>
  )
}
