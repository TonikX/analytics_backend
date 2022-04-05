import React, { useState } from 'react'

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import KindOfActivitySelector from "../KindOfActivitySelector/Selector";
import useStyles from "./AddKindsOfActivityModal.styles";

export default ({
  isOpen, closeDialog, saveDialog
}: any) => {
  const [selectedObject, setSelectedObject] = useState()
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