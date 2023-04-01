import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {ProfessionsCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import withStyles from '@mui/material/styles/withStyles';
import TextField from "@mui/material/TextField";

import {ProfessionsFields} from '../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<ProfessionsCreateModalProps> {
    state = {
        profession: {
            [ProfessionsFields.ID]: null,
            [ProfessionsFields.TITLE]: null,
        },
    };

    componentDidUpdate(prevProps: Readonly<ProfessionsCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {profession} = this.props;

        if (!shallowEqualObjects(profession, prevProps.profession)){
            this.setState({
                profession: {
                    [ProfessionsFields.ID]: get(profession, ProfessionsFields.ID),
                    [ProfessionsFields.TITLE]: get(profession, ProfessionsFields.TITLE, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {profession} = this.state;

        if (profession[ProfessionsFields.ID]){
            this.props.actions.changeProfession(profession);
        } else {
            this.props.actions.createNewProfession(profession);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {profession} = this.state;

        this.setState({
            profession: {
                ...profession,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {profession} = this.state;

        const disableButton = !get(profession, [ProfessionsFields.TITLE], null);

        const isEditMode = profession[ProfessionsFields.ID];

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} профессию </DialogTitle>
                <DialogContent>
                    <TextField label="Название *"
                               onChange={this.saveField(ProfessionsFields.TITLE)}
                               value={profession[ProfessionsFields.TITLE]}
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
