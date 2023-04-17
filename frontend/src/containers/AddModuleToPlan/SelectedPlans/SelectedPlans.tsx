import React from "react";
import {useDispatch, useSelector} from "react-redux";
import cn from 'classnames';
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import {rootState} from "../../../store/reducers";
import {getSelectedPlans} from "../getters";
import actions from "../actions";
import {useStyles} from "../AddModuleToPlan.styles";
import {EducationalPlanShort} from "../types";
import {EducationalPlanFields} from "../../EducationalPlan/enum";

export const SelectedPlans = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const selectedPlans = useSelector((state: rootState) => getSelectedPlans(state));
    const removePlan = (id: number) => {
        const newPlans = selectedPlans.filter((it => it.id !== id));
        dispatch(actions.setSelectedPlans(newPlans))
    };

    const getLabel = (item: EducationalPlanShort) => {
        return `${item[EducationalPlanFields.TITLE].slice(0, 3)} ${item[EducationalPlanFields.YEAR]} ${item[EducationalPlanFields.NUMBER]}`
    };

    if (!selectedPlans.length) {
        return <Typography className={classes.marginTop}>Здесь появятся выбранные планы</Typography>
    }
    return (
        <div className={cn(classes.marginTop, classes.chip)}>
            {selectedPlans.map((item, index) => <Chip onDelete={() => removePlan(item.id)} key={index} label={getLabel(item)}/>)}
        </div>
    )
};
