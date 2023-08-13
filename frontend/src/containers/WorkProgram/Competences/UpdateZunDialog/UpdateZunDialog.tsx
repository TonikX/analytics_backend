import React, {useCallback, useState} from 'react'
import { Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useStyles } from './UpdateZunDialog.styles'
import actions from '../../actions'
import {useDispatch} from 'react-redux'
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ResultsSelector from "../../Results/ResultsSeletor/Selector";
import Chip from "@mui/material/Chip";

type Result = {
  id: number,
  name: string;
}

interface Props {
  zunId: number;
  isOpen: boolean;
  defaultAttainments?: '';
  defaultKnowledge?: '';
  defaultSkills?: '';
  isEditMode?: boolean;
  handleClose: () => void;
  indicator: {
    name: string;
    number: string;
  }
  results: Result[]
  resultsList: {value: string|number, label: string}[]
}

export const UpdateZunDialog = ({
  indicator,
  isOpen,
  defaultKnowledge = '',
  handleClose,
  defaultSkills = '',
  defaultAttainments = '',
  zunId,
  results: defaultResults,
  resultsList,
}: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [knowledge, changeKnowledge] = useState<string>(defaultKnowledge)
  const [skills, changeSkills] = useState<string>(defaultSkills)
  const [attainments, changeAttainments] = useState<string>(defaultAttainments)
  const [updateAllZuns, changeUpdateAllZuns] = useState(false)
  const [results, changeResults] = useState(defaultResults?.map((result) => ({
    value: result.id,
    label: result.name,
  })))

  const saveZun = useCallback(() => {
    dispatch(actions.updateZUN({
      knowledge,
      skills,
      attainments,
      zunId,
      updateAllZuns,
      items: results.map((result) => result.value)
    }))
    handleClose()
  }, [knowledge, skills, attainments, updateAllZuns, results])

  const removeResult = useCallback((resultId: number) => {
    changeResults(results.filter((result) => result.value !== resultId))
  }, [results])

  const addResult = useCallback((value: any, label: string) => {
    if (typeof value === 'string' && !value?.length || results.find(result => result.value === value)) return
    changeResults([
      ...results,
      {value, label}
    ])
  }, [results])

  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="sm"
      classes={{
        paper: classes.dialog
      }}
    >
      <DialogTitle className={classes.title}>Редактирование ЗУНа</DialogTitle>
      <Typography>
        <b>Индикатор:</b> {indicator.number} {indicator.name}
      </Typography>
      <br/>
      <ResultsSelector
        label="Результаты"
        onChange={addResult}
        valueLabel=""
        value={0}
        cleanLabelAfterSelect
        resultsList={resultsList}
      />
      <div className={classes.chipsList}>
        {results.map(result => (
          <Chip key={`result-${result.value}`} className={classes.chip} onDelete={() => removeResult(result.value)} label={result.label} />
        ))}
      </div>
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
        style={{marginBottom: 10,}}
      />
      <Typography>
        Если хотите сохранить или отредактировать эти ЗУН для всех индикаторов, поставьте галочку.
        Без галочки изменения сохранятся только для выбранного индикатора.
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox onChange={(event, checked) => changeUpdateAllZuns(checked)} />}
          label="Отредактировать все аналогичные ЗУНы"
        />
      </FormGroup>
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
