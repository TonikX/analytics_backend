import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {WithStyles} from '@material-ui/core';

import styles from './ConfirmDialog.styles';
import DialogTitle from "@material-ui/core/DialogTitle";

interface ConfirmDialogProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    confirmText: string;
    dialogTitle: string;
    confirmButtonText: string;
    onDismiss: Function;
    onConfirm: Function;
}

const ConfirmDialog = ({isOpen, confirmText, onDismiss, onConfirm, dialogTitle, confirmButtonText, classes}: ConfirmDialogProps) => {
    const handleConfirmDialog = () => {
        onConfirm();
    };
    const handleDismissDialog = () => {
        onDismiss();
    };

    return (
        <Dialog open={isOpen}
                classes={{
                    paper: classes.dialog
                }}
        >
            <DialogTitle> {dialogTitle} </DialogTitle>
            <DialogContent>
                <Typography> {confirmText} </Typography>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button onClick={handleDismissDialog}
                        variant="text">
                    Отмена
                </Button>
                <Button onClick={handleConfirmDialog}
                        color="primary"
                        variant="contained"
                >
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(ConfirmDialog);
