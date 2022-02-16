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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import {WorkProgramGeneralFields} from "../../WorkProgram/enum";
import {implementationFormats, specialization} from "../../WorkProgram/constants";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {DatePicker} from "@material-ui/pickers";
import moment, {Moment} from "moment";
import {IconButton} from "@material-ui/core";
import DateIcon from "@material-ui/icons/DateRange";
import {FULL_DATE_FORMAT} from "../../../common/utils";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        workProgram: {
            [WorkProgramGeneralFields.TITLE]: '',
            [WorkProgramGeneralFields.CODE]: '',
            [WorkProgramGeneralFields.QUALIFICATION]: '',
            [WorkProgramGeneralFields.AUTHORS]: '',
            [WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]: undefined,
            [WorkProgramGeneralFields.APPROVAL_DATE]: moment().format(),
        },
    };

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {workProgram} = this.state;

        this.props.actions.createNewWorkProgram(workProgram);
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {workProgram} = this.state;

        this.setState({
            workProgram: {
                ...workProgram,
                [field]: get(e, 'target.value')
            }
        })
    }

    saveYear = (date: Moment) => {
        const {workProgram} = this.state;

        this.setState({
            workProgram: {
                ...workProgram,
                [WorkProgramGeneralFields.APPROVAL_DATE]: date.format()
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {workProgram} = this.state;
        
        const disableButton = workProgram[WorkProgramGeneralFields.TITLE].length === 0 
            || workProgram[WorkProgramGeneralFields.QUALIFICATION].length === 0 
            || workProgram[WorkProgramGeneralFields.CODE].length === 0
        ;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Создать рабочую программу </DialogTitle>
                <DialogContent>
                    <TextField label="Название *"
                               onChange={this.saveField(WorkProgramGeneralFields.TITLE)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={workProgram[WorkProgramGeneralFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Идентификационный номер программы *"
                               onChange={this.saveField(WorkProgramGeneralFields.CODE)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={workProgram[WorkProgramGeneralFields.CODE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Авторский состав"
                               onChange={this.saveField(WorkProgramGeneralFields.AUTHORS)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={workProgram[WorkProgramGeneralFields.AUTHORS]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <DatePicker
                        value={moment(workProgram[WorkProgramGeneralFields.APPROVAL_DATE])}
                        onChange={(date: any) => this.saveYear(date)}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <DateIcon />
                                </IconButton>
                            ),
                        }}
                        inputVariant="outlined"
                        className={classes.datePicker}
                        format={FULL_DATE_FORMAT}
                        label={'Дата создания *'}
                    />
                    <div className={classes.marginBottom20}>
                        <InputLabel className={classes.label}> Уровень образовательной программы * </InputLabel>
                        <Select
                            className={classes.specializationSelector}
                            value={workProgram[WorkProgramGeneralFields.QUALIFICATION]}
                            // @ts-ignore
                            onChange={this.saveField(WorkProgramGeneralFields.QUALIFICATION)}
                            variant="outlined"
                        >
                            {specialization.map(item =>
                                <MenuItem value={item.value} key={`group-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </div>
                    <div>
                        <InputLabel className={classes.label}> Формат реализации * </InputLabel>
                        <Select
                            className={classes.specializationSelector}
                            value={workProgram[WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]}
                          // @ts-ignore
                            onChange={this.saveField(WorkProgramGeneralFields.IMPLEMENTATION_FORMAT)}
                            variant="outlined"
                        >
                            {implementationFormats.map(item =>
                                <MenuItem value={item.value} key={`group-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </div>
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
