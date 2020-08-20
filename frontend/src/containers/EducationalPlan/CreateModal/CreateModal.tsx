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
import MenuItem from "@material-ui/core/MenuItem";
import DateIcon from "@material-ui/icons/DateRange";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import {DatePicker} from '@material-ui/pickers';

import {EducationalPlanFields} from '../enum';
import {FULL_DATE_FORMAT} from "../../../common/utils";
import {specialization, years} from "../../WorkProgram/data";

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

        if (!shallowEqual(educationalPlan, prevProps.educationalPlan)){
            this.setState({
                educationalPlan: {
                    [EducationalPlanFields.ID]: get(educationalPlan, EducationalPlanFields.ID),
                    [EducationalPlanFields.PROFILE]: get(educationalPlan, EducationalPlanFields.PROFILE, ''),
                    [EducationalPlanFields.QUALIFICATION]: get(educationalPlan, EducationalPlanFields.QUALIFICATION, ''),
                    [EducationalPlanFields.EDUCATION_FORM]: get(educationalPlan, EducationalPlanFields.EDUCATION_FORM, 'internal'),
                    [EducationalPlanFields.YEAR]: get(educationalPlan, EducationalPlanFields.YEAR, '2020/2021'),
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

        const disableButton = educationalPlan[EducationalPlanFields.PROFILE].length === 0
            || get(educationalPlan[EducationalPlanFields.NUMBER], 'length', 0) === 0
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
                            Квалификация *
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
