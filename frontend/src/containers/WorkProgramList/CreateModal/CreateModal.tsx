import React from 'react';
import get from "lodash/get";

import {CreateModalProps, HoursSection} from './types';

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
import {implementationFormats, languageArray, specialization} from "../../WorkProgram/constants";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import moment from "moment";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl";
import SearchSelector from "../../../components/SearchSelector/SearchSelector";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import EditedRow from "./EditableRow/EditableRow";
import {Table} from "@material-ui/core";
import {workProgramFields} from "../../SelectDiscipline/enum";

const DEFAULT_WP_STATE = {
    [WorkProgramGeneralFields.TITLE]: '',
    [WorkProgramGeneralFields.TITLE_EN]: '',
    [WorkProgramGeneralFields.LANGUAGE]: '',
    [WorkProgramGeneralFields.QUALIFICATION]: '',
    [WorkProgramGeneralFields.STRUCTURAL_UNIT]: '',
    [WorkProgramGeneralFields.SEMESTER_COUNT]: 1,
    [WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]: '',
    [WorkProgramGeneralFields.APPROVAL_DATE]: moment().format(),
    [WorkProgramGeneralFields.LAB_HOURS]: "0",
    [WorkProgramGeneralFields.LECTURE_HOURS]: "0",
    [WorkProgramGeneralFields.SRS_HOURS]: "0",
    [WorkProgramGeneralFields.PRACTICE_HOURS]: "0",
};

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        workProgram: {
            ...DEFAULT_WP_STATE,
            // lecture_hours_v2: '',
            // practice_hours_v2: '',
            // lab_hours_v2: '',
            // srs_hours_v2: '',
        },
    };

    handleClose = () => {
        this.props.actions.closeDialog();
        this.setState({
            workProgram: {
                ...DEFAULT_WP_STATE,
            }
        });
    };

    getNewSection = (semesterNum: number) => {
        const {workProgram} = this.state;
        const {lecture_hours_v2, practice_hours_v2, srs_hours_v2, lab_hours_v2} = workProgram;

        const lectureClasses = lecture_hours_v2.split(", ");
        const practiceClasses = practice_hours_v2.split(", ");
        const sroHours = srs_hours_v2.split(", ");
        const laboratoryHours = lab_hours_v2.split(", ");

        return ({
            SRO: +sroHours[semesterNum - 1] || 0,
            lecture_classes: +lectureClasses[semesterNum - 1] || 0,
            practical_lessons: +practiceClasses[semesterNum - 1] || 0,
            laboratory: +laboratoryHours[semesterNum - 1] || 0,
        });
    };

    updateRow = (section: HoursSection, semesterNum: number) => {
        const {workProgram} = this.state;
        const {lecture_hours_v2, practice_hours_v2, srs_hours_v2, lab_hours_v2} = workProgram;

        this.setState({
            workProgram: {
                ...workProgram,
                lab_hours_v2: this.replaceValue(lab_hours_v2, section.laboratory, +semesterNum),
                srs_hours_v2: this.replaceValue(srs_hours_v2, section.SRO, +semesterNum),
                lecture_hours_v2: this.replaceValue(lecture_hours_v2, section.lecture_classes, +semesterNum),
                practice_hours_v2: this.replaceValue(practice_hours_v2, section.practical_lessons, +semesterNum),
            }
        });
    };

    handleSave = () => {
        const {workProgram} = this.state;
        this.props.actions.createNewWorkProgram(workProgram);
        this.setState({
            workProgram: {
                ...DEFAULT_WP_STATE,
            }
        });
    };

    replaceValue = (oldValue: string, newValue: number, semesterNumber: number) => {
        const arr = oldValue.split(", ");
        // На случай, если кто-то решил стереть нули
        arr[semesterNumber - 1] = String(newValue) ? String(newValue) : "0";
        return arr.join(", ");
    };

    fixZeros = (arr: string[], newLength: number) => {
        if (newLength < arr.length) {
            return arr.slice(0, newLength);
        }

        while (newLength > arr.length) {
            arr.push("0")
        }

        return arr;
    };

    recalculateHours = (numOfSemesters: string) => {
        const {workProgram} = this.state;
        const {lecture_hours_v2, practice_hours_v2, srs_hours_v2, lab_hours_v2} = workProgram;

        const lectureClasses = lecture_hours_v2.split(", ");
        const practiceClasses = practice_hours_v2.split(", ");
        const sroHours = srs_hours_v2.split(", ");
        const laboratoryHours = lab_hours_v2.split(", ");

        this.setState({
            workProgram: {
                ...workProgram,
                [WorkProgramGeneralFields.SEMESTER_COUNT]: numOfSemesters,
                lab_hours_v2: this.fixZeros(laboratoryHours, +numOfSemesters).join(", "),
                srs_hours_v2: this.fixZeros(sroHours, +numOfSemesters).join(", "),
                lecture_hours_v2: this.fixZeros(lectureClasses, +numOfSemesters).join(", "),
                practice_hours_v2: this.fixZeros(practiceClasses, +numOfSemesters).join(", "),
            }
        });
    };

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {workProgram} = this.state;

        if (field === WorkProgramGeneralFields.SEMESTER_COUNT) {
            this.recalculateHours(get(e, 'target.value'));
        } else {
            this.setState({
                workProgram: {
                    ...workProgram,
                    [field]: get(e, 'target.value')
                }
            });
        }
    };

    handleChangeStructuralUnitSearchText = (searchText: string) => {
        this.props.structuralUnitActions.changeSearchQuery(searchText);
        this.props.structuralUnitActions.getStructuralUnits();
    };

    changeStructuralUnit = (value: string) => {
        const {workProgram} = this.state;
        this.setState({
            workProgram: {
                ...workProgram,
                [WorkProgramGeneralFields.STRUCTURAL_UNIT]: value
            }
        });
    };

    render() {
        const {isOpen, structuralUnitsList, structuralUnit, classes} = this.props;
        const {workProgram} = this.state;

        const {title_en, ...rest} = workProgram;
        const disableButton = !Object.values(rest).every(Boolean);

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
                    <div>
                        <InputLabel className={classes.label}> Название * </InputLabel>
                        <TextField
                            onChange={this.saveField(WorkProgramGeneralFields.TITLE)}
                            variant="outlined"
                            className={classes.input}
                            fullWidth
                            value={workProgram[WorkProgramGeneralFields.TITLE]}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div>
                        <InputLabel className={classes.label}> Название (англ.)</InputLabel>
                        <TextField
                            onChange={this.saveField(WorkProgramGeneralFields.TITLE_EN)}
                            variant="outlined"
                            className={classes.input}
                            fullWidth
                            value={workProgram[WorkProgramGeneralFields.TITLE_EN]}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div>
                        <InputLabel className={classes.label}> Язык реализации * </InputLabel>
                        <Select
                            className={classes.languageSelector}
                            value={workProgram[WorkProgramGeneralFields.LANGUAGE]}
                            // @ts-ignore
                            onChange={this.saveField(WorkProgramGeneralFields.LANGUAGE)}
                            variant="outlined"
                        >
                            {languageArray.map(item =>
                                <MenuItem value={item.value} key={`language-${item.value}`}>
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
                                <MenuItem value={item.value} key={`format-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </div>
                    <div className={classes.marginTop20}>
                        <InputLabel className={classes.label}> Реализатор дисциплины * </InputLabel>
                        <SearchSelector
                            label=""
                            changeSearchText={this.handleChangeStructuralUnitSearchText}
                            list={structuralUnitsList}
                            changeItem={this.changeStructuralUnit}
                            value={structuralUnit?.id}
                            valueLabel={structuralUnit?.title}
                        />
                    </div>
                    <FormControl className={classes.marginTop20} component="fieldset">
                        <FormLabel component="legend">Длительность семестров *</FormLabel>
                        <RadioGroup className={classes.radioGroup}
                                    onChange={this.saveField(WorkProgramGeneralFields.SEMESTER_COUNT)}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <FormControlLabel
                                    control={<Radio
                                        value={item}
                                        checked={workProgram[WorkProgramGeneralFields.SEMESTER_COUNT] == item}/>}
                                    label={item}
                                    key={item}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headerCell}>Занятия лекционного типа</TableCell>
                                <TableCell className={classes.headerCell}>Лабораторные занятия</TableCell>
                                <TableCell className={classes.headerCell}>Практические занятия</TableCell>
                                <TableCell className={classes.headerCell}>Консультации</TableCell>
                            </TableRow>
                        </TableHead>
                        {new Array(+workProgram[WorkProgramGeneralFields.SEMESTER_COUNT]).fill('').map((_item, index) => {
                            return <EditedRow
                                semesterNum={index + 1}
                                updateRow={this.updateRow}
                                section={this.getNewSection(index + 1)}
                            />
                        })}

                    </Table>
                    <div className={classes.marginTop20}>
                        <InputLabel className={classes.label}>Уровень образовательной программы * </InputLabel>
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
