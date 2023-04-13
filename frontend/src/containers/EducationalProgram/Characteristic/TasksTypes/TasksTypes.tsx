import React, { useState, useCallback, useMemo } from 'react'
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
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import actions from '../../actions';
import {EducationProgramCharacteristicFields} from "../../enum";

import useStyles from './TasksTypes.styles'
import Tooltip from "@material-ui/core/Tooltip";
import QuestionIcon from "@material-ui/icons/HelpOutline";
import {getEducationalProgramCharacteristicCanEdit} from "../../getters";

export default ({ characteristic }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [selectedObject, setSelectedObject] = useState()
  const canEdit = useSelector((state: any) => getEducationalProgramCharacteristicCanEdit(state))

  const handleSave = useCallback(() => {
    const allActivities = characteristic[EducationProgramCharacteristicFields.TASKS_OF_ACTIVITY].map((item: any) => item.id)
    dispatch(actions.changeEducationalProgramCharacteristic({
      id: characteristic.id,
      payload: {
        [EducationProgramCharacteristicFields.TASKS_OF_ACTIVITY]: [
          ...allActivities,
          selectedObject,
        ]
      }
    }))
    setOpenModal(false)
    setSelectedObject(undefined)
  }, [selectedObject, characteristic, characteristic])

  const handleRemoveItem = useCallback((id: any) => {
    dispatch(actions.changeEducationalProgramCharacteristic({
      id: characteristic.id,
      payload: {
        [EducationProgramCharacteristicFields.TASKS_OF_ACTIVITY]:
          characteristic?.[EducationProgramCharacteristicFields.TASKS_OF_ACTIVITY]
            .map((item: any) => item.id)
            .filter((item: any) => item !== id)
      }
    }))
  }, [characteristic])

  const tasksList = useMemo(() => characteristic?.educational_standard?.tasks_prof_standard.map((item: any) => ({
    value: item.id,
    label: item.name,
  })) || [], [characteristic])

  return (
    <>
      <Typography className={classes.label}>
        Типы профессиональных задач, к которым готовятся выпускники
        <Tooltip title={(
          <div className={classes.tooltip}>
            Использование в конструкторе ОП: В <a href="op.itmo.ru" target="_blank">op.itmo.ru</a> типы профессиональных задач, к которым готовятся выпускники хранятся в описании образовательных стандартов. Их описание доступно тут: <a href="https://op.itmo.ru/educational-standards" target="_blank"> op.itmo.ru/educational-standards </a>
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
          {characteristic?.[EducationProgramCharacteristicFields.TASKS_OF_ACTIVITY]?.map && characteristic?.[EducationProgramCharacteristicFields.TASKS_OF_ACTIVITY]?.map((item: any, index: number) => (
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
        <DialogTitle className={classes.title}>Добавить тип профессиональной задачи</DialogTitle>
        <FormControl className={classes.wrapSelector}>
          <InputLabel shrink id="selected-object">
            Тип профессиональной задачи *
          </InputLabel>
          <Select
            variant="outlined"
            onChange={(e) => setSelectedObject(e.target.value)}
            value={selectedObject}
            fullWidth
            input={
              <OutlinedInput
                notched
                labelWidth={100}
                id="selected-object"
              />
            }
          >
            {tasksList.map((item: any) =>
              <MenuItem value={item.value} key={`type-${item.value}`}>
                {item.label}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <DialogActions className={classes.actions}>
          <Button onClick={() => setOpenModal(false)}
                  variant="text">
            Отмена
          </Button>
          <Button onClick={handleSave}
                  variant="contained"
                  disabled={!selectedObject}
                  color="primary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
