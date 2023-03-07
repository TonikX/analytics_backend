import React, { useState } from 'react'

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

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
      <DialogContent>
        <TextField
          label="Наименование организации"
          onChange={setOrganization}
          defaultValue={organization}
        />
        <TextField
          label="Позиция работодателя"
          onChange={setPosition}
          defaultValue={position}
        />
        <TextField
          label="ФИО представителя"
          onChange={setFio}
          defaultValue={fio}
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