import React, { useState } from 'react'

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

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