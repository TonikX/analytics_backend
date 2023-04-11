import React, {useCallback, useState} from 'react'
import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useStyles } from './UpdateZunDialog.styles'
import actions from '../../actions'
import {useDispatch} from 'react-redux'

interface Props {
  zunId: number;
  isOpen: boolean;
  defaultAttainments?: '';
  defaultKnowledge?: '';
  defaultSkills?: '';
  isEditMode?: boolean;
  handleClose: () => void;
}

export const UpdateZunDialog = ({ isOpen, defaultKnowledge = '', handleClose, defaultSkills = '', defaultAttainments = '', zunId }: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [knowledge, changeKnowledge] = useState<string>(defaultKnowledge)
  const [skills, changeSkills] = useState<string>(defaultSkills)
  const [attainments, changeAttainments] = useState<string>(defaultAttainments)

  const saveZun = useCallback(() => {
    dispatch(actions.updateZUN({
      knowledge,
      skills,
      attainments,
      zunId,
    }))
    handleClose()
  }, [knowledge, skills, attainments])

  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="sm"
      classes={{
        paper: classes.dialog
      }}
    >
      <DialogTitle className={classes.title}> Редактирование ЗУНа</DialogTitle>
      <TextField
        label="Знания"
        onChange={(e) => changeKnowledge(e.currentTarget.value)}
        variant="outlined"
        className={classes.marginBottom30}
        value={knowledge}
      />
      <TextField
        label="Умения"
        onChange={(e) => changeSkills(e.currentTarget.value)}
        variant="outlined"
        className={classes.marginBottom30}
        value={skills}
      />
      <TextField
        label="Навыки"
        onChange={(e) => changeAttainments(e.currentTarget.value)}
        variant="outlined"
        value={attainments}
      />
      <div className={classes.footer}>
        <DialogActions className={classes.actions}>
          <Button onClick={handleClose}
                  variant="text">
            Отмена
          </Button>
          <Button onClick={saveZun}
                  variant="contained"
                  color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}
