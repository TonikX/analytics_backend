import React from 'react';

import {withStyles, WithStyles} from '@mui/styles';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";


import styles from './ConfirmDialog.styles';

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
