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

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {CertificationFields} from "../../enum";
import {withRouter} from "react-router-dom";
import {appRouter} from "../../../../service/router-service";
import {Select, Table} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import SearchSelector from "../../../../components/SearchSelector/SearchSelector";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl";
import {specialization} from "../../../WorkProgram/constants";
import EditedRow from "./EditableRow/EditableRow";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        state: {
            [CertificationFields.TITLE]: '',
            [CertificationFields.YEAR]: (new Date()).getFullYear(),
            [CertificationFields.STRUCTURAL_UNIT]: '',
            [CertificationFields.SEMESTER_COUNT]: 1,
            [CertificationFields.QUALIFICATION]: '',
            [CertificationFields.ZE_V_SEM]: '',
            [CertificationFields.EVALUATION_TOOLS]: [[1]]
        } as any,
    };

    handleClose = () => {
        this.props.actions.closeModal();
    };

    handleSave = () => {
        const {state} = this.state;
        const history = this.props.history;
        const callback = (id: number) => {
            history.push(appRouter.getFinalCertificationLink(id));
        };
        this.props.actions.createCertification({
            state: {
                ...state,
                [CertificationFields.EVALUATION_TOOLS]: JSON.stringify(state[CertificationFields.EVALUATION_TOOLS])
            }, callback
        });
    };

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {state} = this.state;

        this.setState({
            ...this.state,
            state: {
                ...state,
                [field]: get(e, 'target.value')
            }
        })
    }

    handleChangeStructuralUnitSearchText = (searchText: string) => {
        this.props.structuralUnitActions.changeSearchQuery(searchText);
        this.props.structuralUnitActions.getStructuralUnits();
    };

    changeStructuralUnit = (value: string) => {
        const {state} = this.state;

        this.setState({
            ...this.state,
            state: {
                ...state,
                [CertificationFields.STRUCTURAL_UNIT]: value,
            }
        })
    };

    insertIntoArray = (oldArray: number[][], newValue: number[], semesterNumber: number) => {
        const arr = [...oldArray];
        arr[semesterNumber - 1] = newValue;
        return arr;
    };

    replaceValue = (oldValue: string, newValue: number, semesterNumber: number) => {
        const arr = oldValue.split(", ");
        // На случай, если кто-то решил стереть нули
        arr[semesterNumber - 1] = String(newValue) ? String(newValue) : "0";
        return arr.join(", ");
    };

    updateRow = (section: HoursSection, semesterNum: number) => {
        const {state} = this.state;
        const {ze_v_sem, evaluation_tools_v_sem} = state;
        this.setState({
            ...this.state,
            state: {
                ...state,
                ze_v_sem: this.replaceValue(ze_v_sem, section.ze_v_sem, +semesterNum),
                evaluation_tools_v_sem: this.insertIntoArray(evaluation_tools_v_sem, section.evaluation_tools_v_sem, +semesterNum),
            }
        });
    };

    getNewSection = (semesterNum: number) => {
        const {state} = this.state;
        const {ze_v_sem, evaluation_tools_v_sem} = state;

        const zeSem = ze_v_sem.split(", ");

        return ({
            ze_v_sem: +zeSem[semesterNum - 1] || 0,
            evaluation_tools_v_sem: evaluation_tools_v_sem[semesterNum - 1] || [1]
        });
    };

    render() {
        const {isOpen, structuralUnitsList, structuralUnit, classes} = this.props;
        const {state} = this.state;

        const disableButton = !state[CertificationFields.YEAR]
            || state[CertificationFields.TITLE].length === 0
            || state[CertificationFields.STRUCTURAL_UNIT] === ''
            || state[CertificationFields.ZE_V_SEM] === ''
            || state[CertificationFields.QUALIFICATION] === '';

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Создать рабочую программу ГИА </DialogTitle>
                <DialogContent>
                    <div>
                        <InputLabel className={classes.label}>Название</InputLabel>
                        <TextField label=""
                                   onChange={this.saveField(CertificationFields.TITLE)}
                                   variant="outlined"
                                   fullWidth
                                   value={state[CertificationFields.TITLE]}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                    </div>
                    <div className={classes.marginTop20}>
                        <InputLabel className={classes.label}>Год</InputLabel>
                        <Select
                            label=""
                            value={state[CertificationFields.YEAR]}
                            placeholder="2022"
                            // @ts-ignore
                            onChange={this.saveField(CertificationFields.YEAR)}
                            fullWidth
                        >
                            {new Array(6).fill(2017).map((item, index) =>
                                <MenuItem value={item + index} key={`year-${index}`}>
                                    {item + index}
                                </MenuItem>
                            )}
                        </Select>
                    </div>
                    <div className={classes.marginTop20}>
                        <InputLabel className={classes.label}> Реализатор</InputLabel>
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
                        <FormLabel component="legend">Длительность в семестрах</FormLabel>
                        <RadioGroup className={classes.radioGroup}
                                    onChange={this.saveField(WorkProgramGeneralFields.SEMESTER_COUNT)}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <FormControlLabel
                                    control={<Radio
                                        value={item}
                                        checked={state[CertificationFields.SEMESTER_COUNT] == item}/>}
                                    label={item}
                                    key={item}
                                    disabled
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headerCell}>Зачетные единицы</TableCell>
                                <TableCell className={classes.headerCell}>Аттестационное оценочное средство</TableCell>
                            </TableRow>
                        </TableHead>
                        {new Array(+state[CertificationFields.SEMESTER_COUNT]).fill('').map((_item, index) => {
                            return <EditedRow
                                semesterNum={index + 1}
                                updateRow={this.updateRow}
                                section={this.getNewSection(index + 1)}
                            />
                        })}

                    </Table>
                    <div className={classes.marginTop20}>
                        <InputLabel className={classes.label}>Уровень образовательной программы</InputLabel>
                        <Select
                            className={classes.specializationSelector}
                            value={state[CertificationFields.QUALIFICATION]}
                            // @ts-ignore
                            onChange={this.saveField(CertificationFields.QUALIFICATION)}
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

export default connect(withStyles(styles)(withRouter(CreateModal)));
