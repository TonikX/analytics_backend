import React, { useState, useCallback } from 'react'
import {useDispatch} from "react-redux";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";

import KindOfActivitySelector from '../KindOfActivitySelector'

import actions from '../../actions';
import {EducationProgramCharacteristicFields} from "../../enum";

import useStyles from './KindsOfActivity.styles'

export default ({ characteristic }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [selectedObject, setSelectedObject] = useState()
  const [newObject, setNewObject] = useState()

  const handleSave = useCallback(() => {
    const allActivities = characteristic[EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES].map((item: any) => item.id)
    if (newObject?.length) {
      dispatch(actions.createKindOfActivity(newObject))
    } else {
      dispatch(actions.changeEducationalProgramCharacteristic({
        payload: {
          [EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES]: [
            ...allActivities,
            selectedObject,
          ]
        }
      }))
    }
    setOpenModal(false)
    setNewObject(undefined)
    setSelectedObject(undefined)
  }, [selectedObject, characteristic, newObject])

  const handleRemoveItem = useCallback((id: any) => {
    dispatch(actions.changeEducationalProgramCharacteristic({
      id: characteristic.id,
      payload: {
        [EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES]:
          characteristic?.[EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES]
            .map((item: any) => item.id)
            .filter((item: any) => item !== id)
      }
    }))
  }, [characteristic])

  return (
    <>
      <Typography className={classes.label}>Объекты профессиональной деятельности</Typography>
      <Table stickyHeader size='small'>
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell>
              Название
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {characteristic?.[EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES]?.map((item: any, index: number) => (
            <TableRow>
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell className={classes.deleteButtonWrap}>
                <IconButton onClick={() => handleRemoveItem(item?.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{display: 'flex'}}>
        <Button
          variant="outlined"
          style={{marginLeft: 'auto', marginTop: '20px'}}
          onClick={() => setOpenModal(true)}
        >
          Добавить
        </Button>
      </div>
      <Dialog
        open={openModal}
        fullWidth
        maxWidth="sm"
        classes={{
          paper: classes.dialog
        }}
      >
        <DialogTitle className={classes.title}>Добавить объект профессиональной деятельности</DialogTitle>
        <Typography className={classes.marginBottom30}>
          Выберите существующий объект профессиональной деятельности или введите название нового
        </Typography>
        <KindOfActivitySelector
          onChange={setSelectedObject}
          label="Выберите объект профессиональной деятельности"
          value={selectedObject}
          className={classes.marginBottom30}
        />
        <TextField
          value={newObject}
          onChange={(e) => setNewObject(e.target.value)}
          label="Новый объект профессиональной деятельности"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          fullWidth
        />
        <DialogActions className={classes.actions}>
          <Button onClick={() => setOpenModal(false)}
                  variant="text">
            Отмена
          </Button>
          <Button onClick={handleSave}
                  variant="contained"
                  disabled={!selectedObject && !newObject?.length}
                  color="primary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
