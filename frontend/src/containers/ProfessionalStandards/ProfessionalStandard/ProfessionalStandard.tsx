import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {getProfStandard} from "../getters";
import {rootState} from "../../../store/reducers";
import Typography from "@material-ui/core/Typography";
import {useParams} from 'react-router-dom'
import {useStyles} from "./ProfessionalStandard.styles"
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import {ProfessionalStandardsType} from "../types";
import ProfessionalStandardLaborFunctionsCreateModal from "./ProfessionalStandardLaborFunctionsCreateModal";
import ProfessionalStandardCreateModal from "../CreateModal";
import classNames from "classnames";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

export default () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const profStandard = useSelector((state: rootState) => getProfStandard(state))
  const {id} = useParams()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [editedItem, setEditedItem] = useState(undefined)

  useEffect(() => {
    dispatch(actions.getProfessionalStandard(id));
  }, []);

  const handleClickEdit = (profStandard: ProfessionalStandardsType) => () => {
    dispatch(actions.openDialog(profStandard));
  }

  const handleOpenLaborFunctionModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseLaborFunctionModal = () => {
    setIsOpenModal(false)
    setEditedItem(undefined)
  }

  const handleDeleteLaborFunction = (laborFunctionId: number) => () => {
    dispatch(actions.deleteProfessionalStandardAdditionalFields({
      id,
      laborFunctionId,
    }));
  }

  const handleEditLaborFunction = (laborFunction: any) => () => {
    setEditedItem(laborFunction)
    handleOpenLaborFunctionModal()
  }

  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.title}>
          Профессиональный стандарт
          <IconButton onClick={handleClickEdit(profStandard)}>
            <EditIcon/>
          </IconButton>
        </Typography>
        <Typography className={classes.infoCell}> Номер: {profStandard.code} </Typography>
        <Typography className={classes.infoCell}> Название стандарта: {profStandard.title} </Typography>
        <Typography className={classes.infoCell}> Код ПС: {profStandard.code_of_prof_area} </Typography>
        <Typography className={classes.infoCell}>
          Профессиональный стандарт: {profStandard.name_of_prof_area}
        </Typography>
        <Typography className={classes.subTitle}>
          Обобщенные трудовые функции
        </Typography>
        <div className={classNames(classes.row, classes.header)}>
          <Typography className={classes.tableCell}> Код </Typography>
          <Typography className={classes.tableCell}> Наименование </Typography>
          <Typography className={classes.tableCell}> Уровень квалификации </Typography>
        </div>
        {profStandard.generalized_labor_functions?.map((item: any) =>
          <div className={classes.row}>
            <Typography className={classes.tableCell}> {item.code} </Typography>
            <Typography className={classes.tableCell}> {item.name} </Typography>
            <Typography className={classes.tableCell}> {item.qualification_level} </Typography>
            <div className={classes.actions}>
              <DeleteIcon className={classes.iconButton} onClick={handleDeleteLaborFunction(item.id)} />
              <EditIcon className={classes.iconButton} onClick={handleEditLaborFunction(item)} />
            </div>
          </div>
        )}
        <Fab color="secondary"
             classes={{
               root: classes.addIcon
             }}
             onClick={handleOpenLaborFunctionModal}
        >
          <AddIcon/>
        </Fab>

        {isOpenModal && (
          <ProfessionalStandardLaborFunctionsCreateModal
            isOpen={isOpenModal}
            handleCloseModal={handleCloseLaborFunctionModal}
            laborFunction={editedItem}
          />
        )}
        <ProfessionalStandardCreateModal />
      </div>
    </div>
  )
}
