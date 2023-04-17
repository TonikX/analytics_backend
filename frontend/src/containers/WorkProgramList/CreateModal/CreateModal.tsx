import React from 'react';
import get from "lodash/get";

import {CreateModalProps, HoursSection} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import {ImplementationFormatsEnum, WorkProgramGeneralFields} from "../../WorkProgram/enum";
import {implementationFormats, languageArray, specialization} from "../../WorkProgram/constants";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import moment from "moment";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";
import FormControl from "@mui/material/FormControl";
import SearchSelector from "../../../components/SearchSelector/SearchSelector";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import EditedRow from "./EditableRow/EditableRow";
import {Table} from "@mui/material";

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
    [WorkProgramGeneralFields.ZE_V_SEM]: "0",
    [WorkProgramGeneralFields.EVALUATION_TOOLS]: [[1]],
    [WorkProgramGeneralFields.CONSULTATIONS]: "0",
};

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        workProgram: {
            ...DEFAULT_WP_STATE,
            [WorkProgramGeneralFields.EVALUATION_TOOLS]: [[1]],
        },
    };

    handleClose = () => {
        this.props.actions.closeDialog();
        this.setState({
            workProgram: {
                ...DEFAULT_WP_STATE,
                [WorkProgramGeneralFields.EVALUATION_TOOLS]: [[1]],
            }
        });
    };

    getNewSection = (semesterNum: number) => {
        const {workProgram} = this.state;
        const {lecture_hours_v2, practice_hours_v2, lab_hours_v2, ze_v_sem, evaluation_tools, consultation_v2} = workProgram;

        const lectureClasses = lecture_hours_v2.split(", ");
        const practiceClasses = practice_hours_v2.split(", ");
        const laboratoryHours = lab_hours_v2.split(", ");
        const zeSem = ze_v_sem.split(", ");
        const consultationsHours = consultation_v2.split(", ");

        return ({
            lecture_classes: +lectureClasses[semesterNum - 1] || 0,
            practical_lessons: +practiceClasses[semesterNum - 1] || 0,
            consultations: +consultationsHours[semesterNum - 1] || 0,
            laboratory: +laboratoryHours[semesterNum - 1] || 0,
            ze_v_sem: +zeSem[semesterNum - 1] || 0,
            evaluation_tools: evaluation_tools[semesterNum - 1] || [1]
        });
    };

    updateRow = (section: HoursSection, semesterNum: number) => {
        const {workProgram} = this.state;
        const {lecture_hours_v2, practice_hours_v2, lab_hours_v2, ze_v_sem, evaluation_tools, consultation_v2} = workProgram;
        this.setState({
            workProgram: {
                ...workProgram,
                lab_hours_v2: this.replaceValue(lab_hours_v2, section.laboratory, +semesterNum),
                lecture_hours_v2: this.replaceValue(lecture_hours_v2, section.lecture_classes, +semesterNum),
                practice_hours_v2: this.replaceValue(practice_hours_v2, section.practical_lessons, +semesterNum),
                consultation_v2: this.replaceValue(consultation_v2, section.consultations, +semesterNum),
                ze_v_sem: this.replaceValue(ze_v_sem, section.ze_v_sem, +semesterNum),
                evaluation_tools: this.insertIntoArray(evaluation_tools, section.evaluation_tools, +semesterNum),
            }
        });
    };

    handleSave = () => {
        const {workProgram} = this.state;
        this.props.actions.createNewWorkProgram({
            ...workProgram,
            hours: this.calculateTotal(workProgram.ze_v_sem) * 36,
            contact_hours_v2: this.calculateContactWork(),
            srs_hours_v2: this.calculateSrc(),
            consultation_v2: workProgram[WorkProgramGeneralFields.IMPLEMENTATION_FORMAT] === ImplementationFormatsEnum.OFFLINE ?
                null : workProgram[WorkProgramGeneralFields.CONSULTATIONS]
        });
        this.setState({
            workProgram: {
                ...DEFAULT_WP_STATE,
                [WorkProgramGeneralFields.EVALUATION_TOOLS]: [[1]],
            }
        });
    };

    replaceValue = (oldValue: string, newValue: number, semesterNumber: number) => {
        const arr = oldValue.split(", ");
        // На случай, если кто-то решил стереть нули
        arr[semesterNumber - 1] = String(newValue) ? String(newValue) : "0";
        return arr.join(", ");
    };

    insertIntoArray = (oldArray: number[][], newValue: number[], semesterNumber: number) => {
        const arr = [...oldArray];
        arr[semesterNumber - 1] = newValue;
        return arr;
    };

    calculateTotal = (zeValues: string) => {
        return zeValues.split(", ").reduce((total, item) => {
            total += Number(item);
            return total;
        }, 0);
    };

    calculateSrc = () => {
        const {workProgram} = this.state;
        const {lecture_hours_v2, practice_hours_v2, lab_hours_v2, ze_v_sem} = workProgram;
        const lecturesArray = lecture_hours_v2.split(", ").map(Number);
        const practiceArray = practice_hours_v2.split(", ").map(Number);
        const labArray = lab_hours_v2.split(", ").map(Number);
        const zeSem = ze_v_sem.split(", ").map(Number);

        const result = [];
        for (let i = 0; i < lecturesArray.length; i++) {
            const sum = lecturesArray[i] + practiceArray[i] + labArray[i];
            result.push((36 * zeSem[i] - sum * 1.1).toFixed(2))
        }

        return result.join(", ");
    };

    calculateContactWork = () => {
        const {workProgram} = this.state;
        const {lecture_hours_v2, practice_hours_v2, lab_hours_v2} = workProgram;
        const lecturesArray = lecture_hours_v2.split(", ").map(Number);
        const practiceArray = practice_hours_v2.split(", ").map(Number);
        const labArray = lab_hours_v2.split(", ").map(Number);

        const result = [];
        for (let i = 0; i < lecturesArray.length; i++) {
            const sum = lecturesArray[i] + practiceArray[i] + labArray[i];
            result.push((sum * 1.1).toFixed(2))
        }

        return result.join(", ");
    };

    fixArray = (arr: number[][], newLength: number) => {
        if (arr.length > newLength) {
            return arr.slice(0, newLength)
        }

        while (newLength > arr.length) {
            arr.push([1])
        }

        return arr;
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
        const {lecture_hours_v2, practice_hours_v2, lab_hours_v2, ze_v_sem, evaluation_tools, consultation_v2} = workProgram;

        const lectureClasses = lecture_hours_v2.split(", ");
        const practiceClasses = practice_hours_v2.split(", ");
        const laboratoryHours = lab_hours_v2.split(", ");
        const zeSem = ze_v_sem.split(", ");
        const consultationHours = consultation_v2.split(", ");

        this.setState({
            workProgram: {
                ...workProgram,
                [WorkProgramGeneralFields.SEMESTER_COUNT]: numOfSemesters,
                lab_hours_v2: this.fixZeros(laboratoryHours, +numOfSemesters).join(", "),
                lecture_hours_v2: this.fixZeros(lectureClasses, +numOfSemesters).join(", "),
                practice_hours_v2: this.fixZeros(practiceClasses, +numOfSemesters).join(", "),
                consultation_v2: this.fixZeros(consultationHours, +numOfSemesters).join(", "),
                ze_v_sem: this.fixZeros(zeSem, +numOfSemesters).join(", "),
                evaluation_tools: this.fixArray(evaluation_tools, +numOfSemesters),
            }
        });
    };

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {workProgram} = this.state;

        if (field === WorkProgramGeneralFields.SEMESTER_COUNT) {
            this.recalculateHours(get(e, 'target.value', ''));
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
                maxWidth="md"
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
                        <FormLabel component="legend">Длительность в семестрах *</FormLabel>
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
                                <TableCell className={classes.headerCell}>Зачетные единицы</TableCell>
                                <TableCell className={classes.headerCell}>Занятия лекционного типа</TableCell>
                                <TableCell className={classes.headerCell}>Лабораторные занятия</TableCell>
                                <TableCell className={classes.headerCell}>Практические занятия</TableCell>
                                <TableCell className={classes.headerCell}>Консультации</TableCell>
                                <TableCell className={classes.headerCell}>Аттестационное оценочное средство</TableCell>
                            </TableRow>
                        </TableHead>
                        {new Array(+workProgram[WorkProgramGeneralFields.SEMESTER_COUNT]).fill('').map((_item, index) => {
                            return <EditedRow
                                implementationFormat={workProgram[WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]}
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

// @ts-ignore
export default connect(withStyles(styles)(CreateModal));
