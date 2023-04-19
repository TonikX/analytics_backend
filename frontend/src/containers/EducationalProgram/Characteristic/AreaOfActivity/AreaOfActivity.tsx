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
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";

import ProfessionalStandardSelector from '../../../ProfessionalStandards/ProfessionalStandardSelector'

import actions from '../../actions';
import {EducationProgramCharacteristicFields} from "../../enum";

import useStyles from './AreaOfActivity.styles'
import QuestionIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";
import {getEducationalProgramCharacteristicCanEdit} from "../../getters";

type Props = {
  tableTitle: string;
  characteristic: any;
  tableType: EducationProgramCharacteristicFields.AREA_OF_ACTIVITY | EducationProgramCharacteristicFields.ADDITIONAL_AREA_OF_ACTIVITY
}
export default ({ characteristic, tableType, tableTitle }: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openAddProfStandardModal, setOpenAddProfStandardModal] = useState(false)
  const [profStandard, setProfStandard] = useState<number|undefined>()
  const canEdit = useSelector((state: any) => getEducationalProgramCharacteristicCanEdit(state))

  const handleAddNewItem = useCallback((item: any) => {
    const allActivities = characteristic?.[tableType].map((item: any) => item.id)
    dispatch(actions.changeEducationalProgramCharacteristic({
      id: characteristic.id,
      payload: {
        [tableType]: [
          ...allActivities,
          profStandard,
        ]
      }
    }))
    setOpenAddProfStandardModal(false)
  }, [profStandard, characteristic])

  const handleRemoveItem = useCallback((id: any) => {
    dispatch(actions.changeEducationalProgramCharacteristic({
      id: characteristic.id,
      payload: {
        [tableType]:
          characteristic?.[tableType]
            .map((item: any) => item.id)
            .filter((item: any) => item !== id)
      }
    }))
  }, [characteristic])

  return (
    <>
      <Typography className={classes.label}>
        {tableTitle}

        <Tooltip title={(
          <div className={classes.tooltip}>
            Необходимо указать не менее чем одну область и сферу профессиональной деятельности, в которых выпускники, освоившие программу бакалавриата, могут осуществлять профессиональную деятельность ( в соответствии с реестром областей и перечнем видов профессиональной деятельности Министерства труда и социальной защиты Российской Федерации <a target="_blank" className={classes.link} href="https://profstandart.rosmintrud.ru/">https://profstandart.rosmintrud.ru</a>, приоритетами научно-технологического развития РФ и программой развития Университета ИТМО)
            <br/><br/>
            <b>
              Использование в конструкторе ОП: В op.itmo.ru информация о профессиональных стандартов заполняется в соответствующем интерфейсе <a target="_blank" className={classes.link} href="https://op.itmo.ru/professional-standards">https://op.itmo.ru/professional-standards</a>
            </b>
          </div>
        )}
          leaveDelay={1000}
        >
          <QuestionIcon color="primary" />
        </Tooltip>
      </Typography>
      <Table stickyHeader size='small'>
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell>
              №
            </TableCell>
            <TableCell>
              Код и наименования области профессиональной деятельности
            </TableCell>
            <TableCell>
              Код профессионального стандарта из данной области
            </TableCell>
            <TableCell>
              Наименование профессионального стандарта из данной области
            </TableCell>
            {canEdit ? <TableCell /> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {characteristic?.[tableType]?.map((item: any, index: number) => (
            <TableRow>
              <TableCell>
                {index + 1}
              </TableCell>
              <TableCell>
                {item?.code} {item?.name_of_prof_area}
              </TableCell>
              <TableCell>
                {item?.code_of_prof_area}
              </TableCell>
              <TableCell>
                {item?.title}
              </TableCell>
              {canEdit ? (
                <TableCell>
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
            onClick={() => setOpenAddProfStandardModal(true)}
          >
            Добавить
          </Button>
        </div>
      ) : null}
      <Dialog
        open={openAddProfStandardModal}
        fullWidth
        maxWidth="sm"
        classes={{
          paper: classes.dialog
        }}
      >
        <DialogTitle className={classes.title}>Добавить область</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <ProfessionalStandardSelector
            onChange={setProfStandard}
            label="Профессиональный стандарт"
            value={profStandard}
          />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={() => setOpenAddProfStandardModal(false)}
                  variant="text">
            Отмена
          </Button>
          <Button onClick={handleAddNewItem}
                  variant="contained"
                  disabled={!profStandard}
                  color="primary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
