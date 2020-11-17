import React from 'react';
import get from "lodash/get";

import {AddToFolderModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import TextFieldComponent from "../../../../components/TextField";

import connect from './AddToFolderModal.connect';
import styles from './AddToFolderModal.styles';

class AddToFolderModal extends React.PureComponent<AddToFolderModalProps> {
    state = {
        data: {

        },
    };

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {

    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        // const {profession} = this.state;
        //
        // this.setState({
        //     profession: {
        //         ...profession,
        //         [field]: get(e, 'target.value')
        //     }
        // })
    }

    render() {
        const {isOpen, classes} = this.props;
        const disableButton = false;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Добавить РПД в закладки </DialogTitle>
                <DialogContent>
                    <TextFieldComponent onChange={() => {}}
                                        label="Комментарий"
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            disabled={disableButton}
                            color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(AddToFolderModal));
