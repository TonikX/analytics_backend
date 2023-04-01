import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {ProfessionalStandardsCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';

import {ProfessionalStandardFields} from '../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import classNames from "classnames";

class CreateModal extends React.PureComponent<ProfessionalStandardsCreateModalProps> {
    state = {
        professionalStandard: {
            [ProfessionalStandardFields.ID]: null,
            [ProfessionalStandardFields.TITLE]: '',
            [ProfessionalStandardFields.NUMBER]: '',
            [ProfessionalStandardFields.CODE]: '',
            [ProfessionalStandardFields.NAME]: '',
        },
    };

    componentDidUpdate(prevProps: Readonly<ProfessionalStandardsCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {professionalStandard} = this.props;

        if (!shallowEqualObjects(professionalStandard, prevProps.professionalStandard)){
            this.setState({
                professionalStandard: {
                    [ProfessionalStandardFields.ID]: get(professionalStandard, ProfessionalStandardFields.ID),
                    [ProfessionalStandardFields.TITLE]: get(professionalStandard, ProfessionalStandardFields.TITLE, ''),
                    [ProfessionalStandardFields.NUMBER]: get(professionalStandard, ProfessionalStandardFields.NUMBER, ''),
                    [ProfessionalStandardFields.CODE]: get(professionalStandard, ProfessionalStandardFields.CODE, ''),
                    [ProfessionalStandardFields.NAME]: get(professionalStandard, ProfessionalStandardFields.NAME, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {professionalStandard} = this.state;

        if (professionalStandard[ProfessionalStandardFields.ID]){
            this.props.actions.changeProfessionalStandard(professionalStandard);
        } else {
            this.props.actions.createNewProfessionalStandard(professionalStandard);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {professionalStandard} = this.state;

        this.setState({
            professionalStandard: {
                ...professionalStandard,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {professionalStandard} = this.state;

        const disableButton = professionalStandard[ProfessionalStandardFields.TITLE]?.length === 0 || professionalStandard[ProfessionalStandardFields.NUMBER]?.length === 0
            || professionalStandard[ProfessionalStandardFields.CODE]?.length === 0 || professionalStandard[ProfessionalStandardFields.NAME]?.length === 0 ;

        const isEditMode = Boolean(professionalStandard[ProfessionalStandardFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'}  профессиональный стандарт </DialogTitle>
                <DialogContent>
                    <TextField label="Название профессионального стандарта *"
                               onChange={this.saveField(ProfessionalStandardFields.TITLE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={professionalStandard[ProfessionalStandardFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Номер профессионального стандарта *"
                               onChange={this.saveField(ProfessionalStandardFields.NUMBER)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={professionalStandard[ProfessionalStandardFields.NUMBER]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Код ПС *"
                               onChange={this.saveField(ProfessionalStandardFields.CODE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={professionalStandard[ProfessionalStandardFields.CODE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Профессиональные стандарты *"
                               onChange={this.saveField(ProfessionalStandardFields.NAME)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={professionalStandard[ProfessionalStandardFields.NAME]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            disabled={disableButton}
                            color="primary"
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(connect(CreateModal));
