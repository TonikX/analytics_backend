import React, {useEffect} from "react";
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
import ProfessionalStandardCreateModal from "../CreateModal/CreateModal";

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const profStandard = useSelector((state: rootState) => getProfStandard(state))
    const {id} = useParams()

    useEffect(() => {
        dispatch(actions.getProfessionalStandard(id));
    }, []);

    const handleClickEdit = (profStandard: ProfessionalStandardsType) => () => {
        dispatch(actions.openDialog(profStandard));
    }
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
            </div>
        </div>
    )


}
