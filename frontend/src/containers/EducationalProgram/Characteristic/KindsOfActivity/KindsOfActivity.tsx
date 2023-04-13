import React, { useState, useCallback } from 'react'
import {useDispatch, useSelector} from "react-redux";

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
import Tooltip from "@material-ui/core/Tooltip";
import QuestionIcon from "@material-ui/icons/HelpOutline";
import {getEducationalProgramCharacteristicCanEdit} from "../../getters";

export default ({ characteristic }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [selectedObject, setSelectedObject] = useState()
  const [newObject, setNewObject] = useState()
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
          interactive
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
        <Typography className={classes.marginBottom30}>
          Выберите существующий сферу профессиональной деятельности или введите название нового
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
