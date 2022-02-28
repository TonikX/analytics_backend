import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {getProfStandard} from "../getters";
import {rootState} from "../../../store/reducers";
import Typography from "@material-ui/core/Typography";
import {useParams} from 'react-router-dom'
import {useStyles} from "./ProfessionalStandard.styles"
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import {ProfessionalStandardsType} from "../types";
import ProfessionalStandardCreateModal from "./ProfessionalStandardCreateModal";
import classNames from "classnames";
import SortingButton from "../../../components/SortingButton/SortingButton";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const profStandard = useSelector((state: rootState) => getProfStandard(state))
    const {id} = useParams()
    const [isOpenModal, setIsOpenModal] = useState(false)



    useEffect(() => {
        dispatch(actions.getProfessionalStandard(id));
    }, []);

    const handleClickEdit = (profStandard: ProfessionalStandardsType) => () => {
        dispatch(actions.openDialog(profStandard));
    }

    const handleCreate = () => {
        setIsOpenModal(true)
    }

    const handleCloseModal =() => {
        setIsOpenModal(false)
    }
    // @ts-ignore
    return (
        <div className={classes.root}>
            <div>
                <Typography className={classes.title}>
                    Профессиональный стандарт
                </Typography>
                <Typography className={classes.codeCell}> Номер: {profStandard.code} </Typography>
                <Typography className={classes.codeCell}> Название стандарта: {profStandard.title} </Typography>
                <Typography className={classes.codeCell}> Код ПС: {profStandard.code_of_prof_area} </Typography>
                <Typography className={classes.codeCell}> Профессиональный
                    стандарт: {profStandard.name_of_prof_area} </Typography>
                <div className={classes.actions}>

                    <IconButton onClick={handleClickEdit(profStandard)}>
                        <EditIcon/>
                    </IconButton>
                    <ProfessionalStandardCreateModal/>

                </div>
                <div className={classNames(classes.row, classes.header)}>

                    <Typography className={classes.marginRight}> Код </Typography>
                    <Typography className={classes.marginRight}> Наименование </Typography>
                    <Typography className={classes.marginRight}> Уровень квалификации </Typography>

                </div>
<div>

    {profStandard.generalized_labor_functions?.map((item: any) =>
        <div>
        <Typography className={classes.codeCell}>  {item.code} </Typography>
        <Typography className={classes.codeCell}> {item.name} </Typography>
        <Typography className={classes.codeCell}> {item.qualificationLevel} </Typography>
        </div>
        )}
</div>


                <Fab color="secondary"
                     classes={{
                       root: classes.addIcon
                     }}
                     onClick={handleCreate}
                >
                    <AddIcon/>
                </Fab>

                <ProfessionalStandardCreateModal isOpen={isOpenModal} handleCloseModal={handleCloseModal}/>

            </div>
        </div>


    )


}
