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

export default ({ characteristic }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openAddProfStandardModal, setOpenAddProfStandardModal] = useState(false)
  const [profStandard, setProfStandard] = useState()

  const handleAddNewItem = useCallback((item: any) => {
    const allActivities = characteristic?.[EducationProgramCharacteristicFields.AREA_OF_ACTIVITY].map((item: any) => item.id)
    dispatch(actions.changeEducationalProgramCharacteristic({
      id: characteristic.id,
      payload: {
        [EducationProgramCharacteristicFields.AREA_OF_ACTIVITY]: [
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
        [EducationProgramCharacteristicFields.AREA_OF_ACTIVITY]:
          characteristic?.[EducationProgramCharacteristicFields.AREA_OF_ACTIVITY]
            .map((item: any) => item.id)
            .filter((item: any) => item !== id)
      }
    }))
  }, [characteristic])

  return (
    <>
      <Typography className={classes.label}>Области профессиональной деятельности</Typography>
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
          {characteristic?.[EducationProgramCharacteristicFields.AREA_OF_ACTIVITY]?.map((item: any, index: number) => (
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
          Добавить проф стандарт
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
        <DialogTitle className={classes.title}>Добавить профессиональный стандарт</DialogTitle>
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
