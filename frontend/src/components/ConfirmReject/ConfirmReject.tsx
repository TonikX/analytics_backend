import React from 'react';

import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

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
