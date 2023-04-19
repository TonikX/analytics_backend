import React from 'react';

import Done from '@mui/icons-material/Done';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import {isStringValueValid} from '../../common/utils';

import {ConfirmRejectProps} from './types';

import useStyles from './ConfirmReject.styles';

const ConfirmReject: React.FC<ConfirmRejectProps> = ({onConfirm, onReject, value}) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.buttonDoneContainer}>
                {isStringValueValid(value) &&
                    <IconButton className={classes.doneIcon} onClick={onConfirm}>
                        <Done />
                    </IconButton>
                }
            </div>
            <div className={classes.buttonCloseContainer}>
                <IconButton className={classes.rejectIcon} onClick={onReject}>
                    <Close />
                </IconButton>
            </div>
        </div>
    )
}

export default ConfirmReject;
