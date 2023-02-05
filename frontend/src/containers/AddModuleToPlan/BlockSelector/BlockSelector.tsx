import MenuItem from "@material-ui/core/MenuItem";
import {Select} from "@material-ui/core";
import React from "react";
import {useStyles} from "../AddModuleToPlan.styles";
import {useDispatch, useSelector} from "react-redux";
import cn from 'classnames';
import {getSelectedBlock} from "../getters";
import actions from "../actions";

export const BlockSelector = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const BLOCK_TITLES = [
        'Блок 1. Модули (дисциплины)', 'Блок 2. Практика', 'Блок 3. ГИА', 'Блок 4. Факультативные модули (дисциплины)'
    ];

    const value = useSelector(getSelectedBlock);
    const onChange = (e: React.ChangeEvent<any>) => {
        const val = e.target?.value;
        dispatch(actions.setSelectedBlock(val));
    };

    return (
        <Select
            className={cn(classes.marginBottom, classes.marginTop)}
            value={value}
            // @ts-ignore
            onChange={onChange}
            variant="outlined"
            fullWidth
        >
            {BLOCK_TITLES.map((item, index) =>
                <MenuItem value={item} key={`block-${index}`}>
                    {item}
                </MenuItem>
            )}
        </Select>
    )
}
