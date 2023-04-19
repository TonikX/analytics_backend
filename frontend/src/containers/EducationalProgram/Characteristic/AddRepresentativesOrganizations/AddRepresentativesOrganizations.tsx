import React, { useState } from 'react'

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import TextField from "../../../../components/TextField";

import useStyles from "./AddRepresentativesOrganizations.styles";

export const AddRepresentativesOrganizations = ({
  isOpen, closeDialog, saveDialog, defaultValues
}: any) => {
  const classes = useStyles();
  const [fio, setFio] = useState(defaultValues?.fio_employer ?? '')
  const [position, setPosition] = useState(defaultValues?.employer_position ?? '')
  const [organization, setOrganization] = useState(defaultValues?.organization_name ?? '')

  const disabled = !fio.length || !position.length || !organization.length

  const handleSave = () => {
    saveDialog({
      organization_name: organization,
      employer_position: position,
      fio_employer: fio,
    })
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
      <DialogTitle>{defaultValues?.id ? 'Изменить' : 'Добавить'} представителя организации</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          label="Наименование организации"
          onChange={setOrganization}
          defaultValue={organization}
        />
        <TextField
          label="Позиция представителя"
          onChange={setPosition}
          defaultValue={position}
        />
        <TextField
          label="ФИО представителя"
          onChange={setFio}
          defaultValue={fio}
          noMargin
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
                disabled={disabled}
                color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}