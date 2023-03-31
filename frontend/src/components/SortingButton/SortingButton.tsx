import React from 'react';
import classNames from 'classnames';

import withStyles from '@mui/material/styles/withStyles';

import ArrowUp from "@material-ui/icons/ArrowDropUp";
import ArrowDown from "@material-ui/icons/ArrowDropDown";
import IconButton from "@mui/material/IconButton";

import styles from './SortingButton.styles';

import {SortingButtonProps, Types} from './types';

const SortingButton = ({classes, changeMode, mode}: SortingButtonProps) => {
    const changeModeHandler = () => {
        switch (mode) {
            case Types.ASC:
                changeMode(Types.DESC);
                break;
            case Types.DESC:
                changeMode('');
                break;
            case '':
                changeMode(Types.ASC);
                break;
        }
    };

    return <IconButton className={classes.button}
                       onClick={changeModeHandler}
    >
        <div className={classes.iconsContainer}>
            <ArrowUp className={classNames(classes.topIcon, {[classes.selectedSort]: mode === Types.ASC})}
            />
            <ArrowDown className={classNames(classes.bottomIcon, {[classes.selectedSort]: mode === Types.DESC})}/>
        </div>
    </IconButton>;
}

export default withStyles(styles)(SortingButton);
