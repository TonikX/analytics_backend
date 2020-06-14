import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";
import classNames from "classnames";
import moment, {Moment} from 'moment';

import {CreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import DateIcon from "@material-ui/icons/DateRange";
import {IconButton} from "@material-ui/core";

import {DatePicker} from '@material-ui/pickers';

import {EducationalPlanFields} from '../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        educationalPlan: {
            [EducationalPlanFields.ID]: null,
            [EducationalPlanFields.PROFILE]: '',
            [EducationalPlanFields.APPROVAL_DATE]: moment().format(),
            [EducationalPlanFields.NUMBER]: '',
        },
    };

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {educationalPlan} = this.props;

        if (!shallowEqual(educationalPlan, prevProps.educationalPlan)){
            this.setState({
                educationalPlan: {
                    [EducationalPlanFields.ID]: get(educationalPlan, EducationalPlanFields.ID),
                    [EducationalPlanFields.PROFILE]: get(educationalPlan, EducationalPlanFields.PROFILE, ''),
                    [EducationalPlanFields.NUMBER]: get(educationalPlan, EducationalPlanFields.NUMBER, ''),
                    [EducationalPlanFields.APPROVAL_DATE]: get(educationalPlan, EducationalPlanFields.APPROVAL_DATE, moment().format()),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {educationalPlan} = this.state;

        if (educationalPlan[EducationalPlanFields.ID]){
            this.props.actions.changeEducationalPlan(educationalPlan);
        } else {
            this.props.actions.createNewEducationalPlan(educationalPlan);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {educationalPlan} = this.state;

        this.setState({
            educationalPlan: {
                ...educationalPlan,
                [field]: get(e, 'target.value')
            }
        })
    }

    saveDate = (date: Moment) => {
        const {educationalPlan} = this.state;

        this.setState({
            educationalPlan: {
                ...educationalPlan,
                [EducationalPlanFields.APPROVAL_DATE]: date.format()
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {educationalPlan} = this.state;

        const disableButton = educationalPlan[EducationalPlanFields.PROFILE].length === 0 || get(educationalPlan[EducationalPlanFields.NUMBER], 'length', 0) === 0;

        const isEditMode = Boolean(educationalPlan[EducationalPlanFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} учебный план</DialogTitle>
                <DialogContent>
                    <TextField label="Профиль *"
                               onChange={this.saveField(EducationalPlanFields.PROFILE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalPlan[EducationalPlanFields.PROFILE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Номер *"
                               onChange={this.saveField(EducationalPlanFields.NUMBER)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalPlan[EducationalPlanFields.NUMBER]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <DatePicker
                        value={educationalPlan[EducationalPlanFields.APPROVAL_DATE]}
                        onChange={(date: any) => this.saveDate(date)}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <DateIcon />
                                </IconButton>
                            ),
                        }}
                        inputVariant="outlined"
                        className={classes.datePicker}
                        format={'DD.MM.YYYY'}
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
