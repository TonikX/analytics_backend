import React, { useState } from 'react'

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import KindOfActivitySelector from "../KindOfActivitySelector/Selector";
import useStyles from "./AddKindsOfActivityModal.styles";

export default ({
  isOpen, closeDialog, saveDialog
}: any) => {
  const [selectedObject, setSelectedObject] = useState<number|undefined>()
  const classes = useStyles();

  const handleSave = () => {
    saveDialog(selectedObject)
    closeDialog()
    setSelectedObject(undefined)
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
      <DialogTitle>Добавить объект профессиональной деятельности</DialogTitle>
      <DialogContent>
        <KindOfActivitySelector
          onChange={setSelectedObject}
          label="Объект профессиональной деятельности"
          value={selectedObject}
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
                disabled={!selectedObject}
                color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}