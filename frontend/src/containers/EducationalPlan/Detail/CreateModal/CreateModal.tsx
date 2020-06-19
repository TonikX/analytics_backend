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

import {EducationalPlanFields} from '../../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {EducationPlanInDirectionFields} from "../../../EduationPlanInDirection/enum";
import {DirectionFields} from "../../../Direction/enum";
import SearchSelector from "../../../../components/SearchSelector/SearchSelector";
import {typeOfWorkProgramInPlan} from '../../data';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {specialization} from "../../../WorkProgram/data";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        educationalPlan: {
            [EducationalPlanFields.ID]: null,
            [EducationalPlanFields.PROFILE]: '',
            [EducationalPlanFields.APPROVAL_DATE]: moment().format(),
            [EducationalPlanFields.NUMBER]: '',
        },
    };

    componentDidMount() {
        this.props.workProgramActions.getWorkProgramList();
    }

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

    saveWorkProgramList = (value: string) => {

    }

    handleChangeSearchText = (searchText: string) => {
        this.props.workProgramActions.changeSearchQuery(searchText);
        this.props.workProgramActions.getWorkProgramList();
    }

    render() {
        const {isOpen, classes, workProgramList} = this.props;
        const {educationalPlan} = this.state;

        const disableButton = true;
        // const disableButton = educationalPlan[EducationalPlanFields.PROFILE].length === 0 || get(educationalPlan[EducationalPlanFields.NUMBER], 'length', 0) === 0;

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

                    <SearchSelector label="Рабочая программа * "
                                    changeSearchText={this.handleChangeSearchText}
                                    list={workProgramList}
                                    changeItem={this.saveWorkProgramList}
                                    className={classes.marginBottom30}
                                    value={''}
                                    valueLabel={''}
                    />
                    <FormControl className={classNames(classes.selectorWrap, classes.marginBottom30)}>
                        <InputLabel shrink id="section-label">
                            Тип *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveField(DirectionFields.QUALIFICATION)}
                            value={''}
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
                            {typeOfWorkProgramInPlan.map(item =>
                                <MenuItem value={item.value} key={`type-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

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
