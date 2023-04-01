import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";
import classNames from "classnames";
import moment, {Moment} from 'moment';

import {CreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import DateIcon from "@mui/icons-material/DateRange";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import {DatePicker} from '@material-ui/pickers';

import {EducationalPlanFields} from '../enum';
import {FULL_DATE_FORMAT} from "../../../common/utils";
import {specialization, years} from "../../WorkProgram/constants";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        educationalPlan: {
            [EducationalPlanFields.ID]: null,
            [EducationalPlanFields.PROFILE]: '',
            [EducationalPlanFields.APPROVAL_DATE]: moment().format(),
            [EducationalPlanFields.NUMBER]: '',
            [EducationalPlanFields.EDUCATION_FORM]: 'internal',
            [EducationalPlanFields.QUALIFICATION]: '',
            [EducationalPlanFields.YEAR]: '2020/2021',
        },
    };

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {educationalPlan} = this.props;

        if (!shallowEqualObjects(educationalPlan, prevProps.educationalPlan)){
            this.setState({
                educationalPlan: {
                    [EducationalPlanFields.ID]: get(educationalPlan, EducationalPlanFields.ID),
                    [EducationalPlanFields.PROFILE]: get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.TITLE], ''),
                    [EducationalPlanFields.QUALIFICATION]: get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.QUALIFICATION], ''),
                    [EducationalPlanFields.EDUCATION_FORM]: get(educationalPlan, EducationalPlanFields.EDUCATION_FORM, 'internal'),
                    [EducationalPlanFields.YEAR]: get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.QUALIFICATION], '2020/2021'),
                    [EducationalPlanFields.NUMBER]: get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.NUMBER], ''),
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

        const disableButton = educationalPlan[EducationalPlanFields.PROFILE].length === 0
            || get(educationalPlan[EducationalPlanFields.YEAR], 'length', 0) === 0
            || get(educationalPlan[EducationalPlanFields.QUALIFICATION], 'length', 0) === 0
        ;

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
                    <TextField label="Образовательная программа *"
                               onChange={this.saveField(EducationalPlanFields.PROFILE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalPlan[EducationalPlanFields.PROFILE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Номер"
                               onChange={this.saveField(EducationalPlanFields.NUMBER)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalPlan[EducationalPlanFields.NUMBER]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Форма обучения *</FormLabel>
                        <RadioGroup className={classes.radioGroup}
                                    onChange={this.saveField(EducationalPlanFields.EDUCATION_FORM)}
                                    value={educationalPlan[EducationalPlanFields.EDUCATION_FORM]}
                        >
                            <FormControlLabel value="internal"
                                              control={<Radio checked={educationalPlan[EducationalPlanFields.EDUCATION_FORM] === 'internal'} />}
                                              label="Очная"
                            />
                            <FormControlLabel value="extramural"
                                              control={<Radio checked={educationalPlan[EducationalPlanFields.EDUCATION_FORM] === 'extramural'} />}
                                              label="Заочная"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl className={classNames(classes.qualificationSelectorWrap, classes.marginBottom30)}>
                        <InputLabel shrink id="section-label">
                            Уровень образования *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveField(EducationalPlanFields.QUALIFICATION)}
                            value={educationalPlan[EducationalPlanFields.QUALIFICATION]}
                            fullWidth
                            displayEmpty
                            input={
                                <OutlinedInput
                                    notched
                                    labelWidth={100}
                                    id="section-label"
                                />
                            }
                        >
                            {specialization.map(item =>
                                <MenuItem value={item.value} key={`group-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl className={classNames(classes.selectorWrap, classes.marginBottom30)}>
                        <InputLabel shrink>
                            Год набора *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveField(EducationalPlanFields.YEAR)}
                            value={educationalPlan[EducationalPlanFields.YEAR]}
                            fullWidth
                            displayEmpty
                            input={
                                <OutlinedInput
                                    notched
                                    labelWidth={100}
                                    name="year"
                                />
                            }
                        >
                            {years.map(item =>
                                <MenuItem value={item.value} key={`group-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

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
                        format={FULL_DATE_FORMAT}
                        label={'Дата согласования'}
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
