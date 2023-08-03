import React from 'react';
import get from "lodash/get";

import {CreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {UpdatedAcademicPlanFields} from "../enum";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import {Checkbox} from "@mui/material";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        academicPlanUpdateConfiguration: {
            [UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID]: '',
            [UpdatedAcademicPlanFields.ACADEMIC_PLAN_TITLE]: '',
            [UpdatedAcademicPlanFields.UPDATES_ENABLED]: false,
            [UpdatedAcademicPlanFields.OVER_23]: false
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

    handleChangeOver23 = (e: any, checked: boolean) => {
        const {academicPlanUpdateConfiguration} = this.state;

        this.setState({
            academicPlanUpdateConfiguration: {
                ...academicPlanUpdateConfiguration,
                [UpdatedAcademicPlanFields.OVER_23]: checked
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
                <DialogContent className={classes.dialogContent}>
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
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={academicPlanUpdateConfiguration[UpdatedAcademicPlanFields.OVER_23]}
                          onChange={this.handleChangeOver23}
                        />
                      )}
                      label="УП с 2023 года"
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
//@ts-ignore
export default connect(withStyles(styles)(CreateModal));
