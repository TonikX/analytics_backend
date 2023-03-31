import React from 'react'

import { Scrollbars } from 'react-custom-scrollbars'
import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";

import { useStyles } from './SecondStep.styles'

import { SecondStepProps } from './types'

export const SecondStep: React.FC<SecondStepProps> = ({ course, saveField }) => {
  const classes = useStyles()
  return (
    
    <DialogContent style={{ overflow: 'hidden'}}>
     <Scrollbars style={{height: 'calc(100vh - 200px)'}}>
      <TextField 
        label="Длительность онлайн-курса в неделях *"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        style={{ marginTop: '10px'}}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Возможность получить сертификат *"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Сессия курса *"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Направления *"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Описание онлайн-курса *"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Дата ближайшего запуска"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Дата окончания записи"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Дата окончания курса"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Содержание курса"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Количество лекций"
        // onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Количество записей на сессию "
        //onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Требования"
        //onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Компетенции"
        //onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Результаты обучения"
        //onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Объем онлайн курса, часов"
        //onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Требуемое время для изучения онлайн курса, часов в неделю"
        //onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <TextField 
        label="Трудоемкость курса в з.е."
        //onChange={saveField(CourseFields.TITLE)}
        variant="outlined"
        className={classes.input}
        fullWidth
        //value={course[CourseFields.TITLE]}
        InputLabelProps={{
            shrink: true,
        }}
      />
     </Scrollbars>
    </DialogContent>
  )
}