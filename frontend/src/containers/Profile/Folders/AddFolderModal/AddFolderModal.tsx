import React from 'react';

import {AddFolderModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import TextFieldComponent from "../../../../components/TextField";

import connect from './AddFolderModal.connect';
import styles from './AddFolderModal.styles';

class AddFolderModal extends React.PureComponent<AddFolderModalProps> {
    state = {
        name: '',
        description: '',
    };

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        this.props.actions.createFolder({
            name: this.state.name,
            description: this.state.description,
        })
    }

    changeName = (value: string) => {
        this.setState({
            name: value
        });
    }

    changeDescription = (value: string) => {
        this.setState({
            description: value
        });
    }

    render() {
        const {isOpen, classes} = this.props;
        const disableButton = this.state.name === '';

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Создать папку </DialogTitle>
                <DialogContent>
                    <TextFieldComponent onChange={this.changeName}
                                        label="Название"
                    />

                    <TextFieldComponent onChange={this.changeDescription}
                                        label="Описание"
                                        noMargin
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
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(AddFolderModal));
