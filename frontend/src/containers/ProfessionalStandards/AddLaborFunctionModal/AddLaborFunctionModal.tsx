import React, { useState } from 'react'

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import LaborFunctionSelector from "../LaborFunctionSelector";
import useStyles from "./AddLaborFunctionModal.styles";

export default ({
  isOpen, closeDialog, saveDialog
}: any) => {
  const [laborFunction, setLaborFunction] = useState()
  const classes = useStyles();

  const handleSave = () => {
    saveDialog(laborFunction)
    closeDialog()
    setLaborFunction(undefined)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      classes={{
        //@ts-ignore
        paper: classes.dialog,
        //@ts-ignore
        root: classes.root,
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Добавить трудовую функцию</DialogTitle>
      <DialogContent>
        <LaborFunctionSelector
          onChange={setLaborFunction}
          label="Трудовая функция"
          value={laborFunction}
        />
      </DialogContent>
      <DialogActions
        //@ts-ignore
        className={classes.actions}
      >
        <Button onClick={closeDialog}
                variant="text">
          Отмена
        </Button>
        <Button onClick={handleSave}
                variant="contained"
                disabled={!laborFunction}
                color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}