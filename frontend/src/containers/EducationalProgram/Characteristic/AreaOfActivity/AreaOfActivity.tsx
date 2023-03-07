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

import ProfessionalStandardSelector from '../../../ProfessionalStandards/ProfessionalStandardSelector'

import actions from '../../actions';
import {EducationProgramCharacteristicFields} from "../../enum";

import useStyles from './AreaOfActivity.styles'
import QuestionIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";

type Props = {
  tableTitle: string;
  characteristic: any;
  tableType: EducationProgramCharacteristicFields.AREA_OF_ACTIVITY | EducationProgramCharacteristicFields.ADDITIONAL_AREA_OF_ACTIVITY
}
export default ({ characteristic, tableType, tableTitle }: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openAddProfStandardModal, setOpenAddProfStandardModal] = useState(false)
  const [profStandard, setProfStandard] = useState()

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
          interactive
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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {characteristic?.[tableType]?.map((item: any, index: number) => (
            <TableRow>
              <TableCell>
                {index + 1}
              </TableCell>
              <TableCell>
                {item?.code_of_prof_area} {item?.name_of_prof_area}
              </TableCell>
              <TableCell>
                {item?.code}
              </TableCell>
              <TableCell>
                {item?.title}
              </TableCell>
              <TableCell>
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
          onClick={() => setOpenAddProfStandardModal(true)}
        >
          Добавить
        </Button>
      </div>
      <Dialog
        open={openAddProfStandardModal}
        fullWidth
        maxWidth="sm"
        classes={{
          paper: classes.dialog
        }}
      >
        <DialogTitle className={classes.title}>Добавить область</DialogTitle>
        <ProfessionalStandardSelector
          onChange={setProfStandard}
          label="Профессиональный стандарт"
          value={profStandard}
        />
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
