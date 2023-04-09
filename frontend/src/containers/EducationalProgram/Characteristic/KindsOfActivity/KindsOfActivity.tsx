import React, { useState, useCallback } from 'react'
import {useDispatch, useSelector} from "react-redux";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";

import KindOfActivitySelector from '../KindOfActivitySelector'

import actions from '../../actions';
import {EducationProgramCharacteristicFields} from "../../enum";

import useStyles from './KindsOfActivity.styles'
import Tooltip from "@mui/material/Tooltip";
import QuestionIcon from "@mui/icons-material/HelpOutline";
import {getEducationalProgramCharacteristicCanEdit} from "../../getters";

export default ({ characteristic }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [selectedObject, setSelectedObject] = useState<number|undefined>()
  const [newObject, setNewObject] = useState<string|undefined>()
  const canEdit = useSelector((state: any) => getEducationalProgramCharacteristicCanEdit(state))

  const handleSave = useCallback(() => {
    const allActivities = characteristic[EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES].map((item: any) => item.id)
    if (newObject?.length) {
      dispatch(actions.createKindOfActivity(newObject))
    } else {
      dispatch(actions.changeEducationalProgramCharacteristic({
        id: characteristic.id,
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
  }, [selectedObject, characteristic, newObject, characteristic])

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
      <Typography className={classes.label}>
        Сферы профессиональной деятельности
        <Tooltip title={(
          <div className={classes.tooltip}>
            Необходимо указать не менее чем одну область и сферу профессиональной деятельности, в которых выпускники, освоившие программу бакалавриата, могут осуществлять профессиональную деятельность ( в соответствии с реестром областей и перечнем видов профессиональной деятельности Министерства труда и социальной защиты Российской Федерации <a href="https://profstandart.rosmintrud.ru/"  className={classes.link} target="_blank">https://profstandart.rosmintrud.ru/</a>, приоритетами научно-технологического развития РФ и программой развития Университета ИТМО)
            <br/><br/>
            В системе имеется общий словарь сфер деятельности. Пользователь может выбрать из существующих или создать свою.
          </div>
        )}
          leaveDelay={1000}
        >
          <QuestionIcon color="primary"/>
        </Tooltip>
      </Typography>
      <Table stickyHeader size='small'>
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell>
              Название
            </TableCell>
            {canEdit ? <TableCell /> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {characteristic?.[EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES]?.map((item: any, index: number) => (
            <TableRow>
              <TableCell>
                {item.name}
              </TableCell>
              {canEdit ? (
                <TableCell className={classes.deleteButtonWrap}>
                  <IconButton onClick={() => handleRemoveItem(item?.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {canEdit ? (
        <div style={{display: 'flex'}}>
          <Button
            variant="outlined"
            style={{marginLeft: 'auto', marginTop: '20px'}}
            onClick={() => setOpenModal(true)}
          >
            Добавить
          </Button>
        </div>
      ) : null}
      <Dialog
        open={openModal}
        fullWidth
        maxWidth="sm"
        classes={{
          paper: classes.dialog
        }}
      >
        <DialogTitle className={classes.title}>Добавить сферу профессиональной деятельности</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography className={classes.marginBottom30}>
            Выберите существующую сферу профессиональной деятельности или введите название новой
          </Typography>
          <KindOfActivitySelector
            onChange={setSelectedObject}
            label="Выберите сферу профессиональной деятельности"
            value={selectedObject}
            className={classes.marginBottom30}
          />
          <TextField
            value={newObject}
            onChange={(e) => setNewObject(e.target.value)}
            label="Новая сфера профессиональной деятельности"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
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
