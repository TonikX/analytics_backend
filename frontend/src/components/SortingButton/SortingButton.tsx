import React from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import ArrowUp from "@material-ui/icons/ArrowDropUp";
import ArrowDown from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";

import styles from './SortingButton.styles';

import {SortingButtonProps, SortingEnumTypes} from './sortingEnumTypes';

class SortingButton extends React.Component<SortingButtonProps> {
    render(){
        const {classes, changeMode, mode} = this.props;

        const changeModeHandler = () => {
            switch (mode) {
                case SortingEnumTypes.ASC:
                    changeMode(SortingEnumTypes.DESC);
                    break;
                case SortingEnumTypes.DESC:
                    changeMode('');
                    break;
                case '':
                    changeMode(SortingEnumTypes.ASC);
                    break;
            }
        };

        return <IconButton className={classes.button}
                           onClick={changeModeHandler}
                >
            <div className={classes.iconsContainer}>
                <ArrowUp className={classNames(classes.topIcon, {[classes.selectedSort]: mode === SortingEnumTypes.ASC})}
                />
                <ArrowDown className={classNames(classes.bottomIcon, {[classes.selectedSort]: mode === SortingEnumTypes.DESC})}/>
            </div>
        </IconButton>
    }
}

export default withStyles(styles)(SortingButton);
