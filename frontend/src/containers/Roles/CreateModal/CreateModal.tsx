import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {RolesCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {withStyles} from '@mui/styles';
import TextField from "@mui/material/TextField";

import {RolesFields} from '../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<RolesCreateModalProps> {
    state = {
        role: {
            [RolesFields.ID]: null,
            [RolesFields.TITLE]: null,
        },
    };

    componentDidUpdate(prevProps: Readonly<RolesCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {role} = this.props;

        if (!shallowEqualObjects(role, prevProps.role)){
            this.setState({
                role: {
                    [RolesFields.ID]: get(role, RolesFields.ID),
                    [RolesFields.TITLE]: get(role, RolesFields.TITLE, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {role} = this.state;

        if (role[RolesFields.ID]){
            this.props.actions.changeRole(role);
        } else {
            this.props.actions.createNewRole(role);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {role} = this.state;

        this.setState({
            role: {
                ...role,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {role} = this.state;

        const disableButton = !get(role, [RolesFields.TITLE], null);

        const isEditMode = role[RolesFields.ID];

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} роль </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <TextField label="Название *"
                               onChange={this.saveField(RolesFields.TITLE)}
                               value={role[RolesFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               fullWidth
                               variant="outlined"
                               className={classes.input}
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

export default connect(withStyles(styles)(CreateModal));
