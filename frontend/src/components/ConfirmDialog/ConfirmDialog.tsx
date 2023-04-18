import React from 'react';

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";

import useStyles from './ConfirmDialog.styles';

interface ConfirmDialogProps {
    isOpen: boolean;
    confirmText: string;
    dialogTitle: string;
    confirmButtonText: string;
    onDismiss: Function;
    onConfirm: Function;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({isOpen, confirmText, onDismiss, onConfirm, dialogTitle, confirmButtonText}) => {
    const classes = useStyles()
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

export default ConfirmDialog;
