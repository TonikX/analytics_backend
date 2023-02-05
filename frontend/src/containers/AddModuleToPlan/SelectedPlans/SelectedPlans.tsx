import React from "react";
import {useDispatch, useSelector} from "react-redux";
import cn from 'classnames';
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import {rootState} from "../../../store/reducers";
import {getSelectedPlans} from "../getters";
import actions from "../actions";
import {useStyles} from "../AddModuleToPlan.styles";

export const SelectedPlans = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const selectedPlans = useSelector((state: rootState) => getSelectedPlans(state));
    const removePlan = (item: number) => {
        const newPlans = selectedPlans.filter((it => it !== item));
        dispatch(actions.setSelectedPlans(newPlans))
    };

    if (!selectedPlans.length) {
        return <Typography className={classes.marginTop}>Здесь появятся выбранные планы</Typography>
    }
    return (
        <div className={cn(classes.marginTop, classes.chip)}>
            {selectedPlans.map((item, index) => <Chip onDelete={() => removePlan(item)} key={index} label={item}/>)}
        </div>
    )
};
