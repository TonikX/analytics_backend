import React from 'react';
import get from "lodash/get";

import {CreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {UpdatedAcademicPlanFields} from "../enum";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        academicPlanUpdateConfiguration: {
            [UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID]: '',
            [UpdatedAcademicPlanFields.ACADEMIC_PLAN_TITLE]: '',
            [UpdatedAcademicPlanFields.UPDATES_ENABLED]: false
        }
    };

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {academicPlanUpdateConfiguration} = this.state;

        this.props.actions.createNewAcademicPlanUpdateConfiguration(academicPlanUpdateConfiguration);
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {academicPlanUpdateConfiguration} = this.state;

        this.setState({
            academicPlanUpdateConfiguration: {
                ...academicPlanUpdateConfiguration,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {academicPlanUpdateConfiguration} = this.state;

         const disableButton = academicPlanUpdateConfiguration[UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID].length <= 0
            || isNaN(Number(academicPlanUpdateConfiguration[UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID]));

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Добавить учебный план </DialogTitle>
                <DialogContent>
                    <TextField label="Id учебного плана"
                               onChange={this.saveField(UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={academicPlanUpdateConfiguration[UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Название учебного плана"
                               onChange={this.saveField(UpdatedAcademicPlanFields.ACADEMIC_PLAN_TITLE)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={academicPlanUpdateConfiguration[UpdatedAcademicPlanFields.ACADEMIC_PLAN_TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
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
