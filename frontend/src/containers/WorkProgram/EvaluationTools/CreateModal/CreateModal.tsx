import React from 'react';
import get from "lodash/get";
import {shallowEqual} from "recompose";
import classNames from 'classnames';

import {CreateModalProps} from './types';

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import AppBar from "@material-ui/core/AppBar";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {AutoSizer} from "react-virtualized";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import QuestionIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import CKEditor from '../../../../components/CKEditor'
import {types} from '../constants'

import {EvaluationCriteiaFields, EvaluationToolFields, fields, workProgramSectionFields,} from '../../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import {Input} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/NoteAddOutlined";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import CheckIcon from "@material-ui/icons/CheckOutlined";
import {v4 as uuidv4} from 'uuid';


const EditableTableCell = ({ row, name, onChange }: {row: any, name: any, onChange: any}) => {
    const { isEditMode } = row;
    return (
        <TableCell>
            {isEditMode? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                />
            ): (
                row[name]
            )}
        </TableCell>
    );
};

class CreateModal extends React.PureComponent<CreateModalProps> {
    editor = null;

    state = {
        isOpen: false,
        showErrors: false,
        evaluationTool: {
            [EvaluationToolFields.ID]: null,
            [EvaluationToolFields.DESCRIPTION]: '',
            [EvaluationToolFields.SECTIONS]: [],
            [EvaluationToolFields.MIN]: '',
            [EvaluationToolFields.NAME]: '',
            [EvaluationToolFields.MAX]: '',
            [EvaluationToolFields.TYPE]: '',
            [EvaluationToolFields.DEADLINE]: 1,
            [EvaluationToolFields.CHECK_POINT]: false,
            [EvaluationToolFields.SEMESTER]: '1',
            [EvaluationToolFields.PROBLEM_TOPIC]: '',
            [EvaluationToolFields.FIELDS_HINTS]: '',
            [EvaluationToolFields.CRITERIA]: [] as any[],
        },
        evalCriteria: [
            {
                internalId: uuidv4(),
                [EvaluationCriteiaFields.ID]: 1,
                [EvaluationCriteiaFields.EVALUATION_CRITERIA]: 'asd',
                [EvaluationCriteiaFields.MIN]: 10,
                [EvaluationCriteiaFields.MAX]: 100,
                [EvaluationCriteiaFields.EVALUATIONTOOL_ID]: null,
                [EvaluationCriteiaFields.CERTIFICATIONEVALUATIONTOOL_TYPE_ID]: null,
            },
            {
                internalId: uuidv4(),
                [EvaluationCriteiaFields.ID]: 2,
                [EvaluationCriteiaFields.EVALUATION_CRITERIA]: 'asdsa',
                [EvaluationCriteiaFields.MIN]: 10,
                [EvaluationCriteiaFields.MAX]: 100,
                [EvaluationCriteiaFields.EVALUATIONTOOL_ID]: null,
                [EvaluationCriteiaFields.CERTIFICATIONEVALUATIONTOOL_TYPE_ID]: null,
            },
            {
                internalId: uuidv4(),
                [EvaluationCriteiaFields.ID]: 3,
                [EvaluationCriteiaFields.EVALUATION_CRITERIA]: '2df4',
                [EvaluationCriteiaFields.MIN]: 10,
                [EvaluationCriteiaFields.MAX]: 100,
                [EvaluationCriteiaFields.EVALUATIONTOOL_ID]: null,
                [EvaluationCriteiaFields.CERTIFICATIONEVALUATIONTOOL_TYPE_ID]: null,
            },
        ] as any[],
        evaluationCriteria: {
            [EvaluationCriteiaFields.ID]: null,
            [EvaluationCriteiaFields.EVALUATION_CRITERIA]: '',
            [EvaluationCriteiaFields.MIN]: null,
            [EvaluationCriteiaFields.MAX]: null,
            [EvaluationCriteiaFields.EVALUATIONTOOL_ID]: null,
            [EvaluationCriteiaFields.CERTIFICATIONEVALUATIONTOOL_TYPE_ID]: null,
        },
        sumMin: 0,
        sumMax: 0
    };



    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {evaluationTool} = this.props;
        // const {evaluationCriteria} = this.props;

        if (!shallowEqual(this.props, prevProps)){
            this.setState({
                isOpen: this.props.isOpen,
                evaluationTool: {
                    [EvaluationToolFields.ID]: get(evaluationTool, EvaluationToolFields.ID, null),
                    [EvaluationToolFields.NAME]: get(evaluationTool, EvaluationToolFields.NAME, ''),
                    [EvaluationToolFields.DESCRIPTION]: get(evaluationTool, EvaluationToolFields.DESCRIPTION, ''),
                    //@ts-ignore
                    [EvaluationToolFields.SECTIONS]: get(evaluationTool, EvaluationToolFields.SECTIONS, []).map(item => item[workProgramSectionFields.ID]),
                    [EvaluationToolFields.MIN]: get(evaluationTool, EvaluationToolFields.MIN, ''),
                    [EvaluationToolFields.MAX]: get(evaluationTool, EvaluationToolFields.MAX, ''),
                    [EvaluationToolFields.DEADLINE]: get(evaluationTool, EvaluationToolFields.DEADLINE, 1),
                    [EvaluationToolFields.TYPE]: get(evaluationTool, EvaluationToolFields.TYPE, ''),
                    [EvaluationToolFields.CHECK_POINT]: get(evaluationTool, EvaluationToolFields.CHECK_POINT, false),
                    [EvaluationToolFields.SEMESTER]: get(evaluationTool, EvaluationToolFields.SEMESTER, '1'),
                    [EvaluationToolFields.PROBLEM_TOPIC]: get(evaluationTool, EvaluationToolFields.PROBLEM_TOPIC, ''),
                    [EvaluationToolFields.FIELDS_HINTS]: get(evaluationTool, EvaluationToolFields.FIELDS_HINTS, ''),
                }
            });
        }
    }

    componentDidMount() {
        this.recalcTableSums();
    }

    handleClose = () => {
        this.props.actions.closeDialog(fields.CREATE_NEW_EVALUATION_TOOLS);
        this.setState({ showErrors: false })
    }

    handleSave = () => {
        let { evaluationTool, evalCriteria } = this.state;

        const disableSave = get(evaluationTool, [EvaluationToolFields.NAME, 'length'], 0) === 0
                            || get(evaluationTool, [EvaluationToolFields.DESCRIPTION, 'length'], 0) === 0
                            // || get(evaluationTool, [EvaluationToolFields.SECTIONS, 'length'], 0) === 0
                            || get(evaluationTool, [EvaluationToolFields.TYPE, 'length'], 0) === 0
        ;
        if (evaluationTool[EvaluationToolFields.ID]){
            this.setState({ showErrors: false });
            // evaluationTool[EvaluationToolFields.CRITERIA] = evalCriteria;
            this.props.actions.changeEvaluationTool(evaluationTool);
        } else if (!disableSave){
            this.setState({ showErrors: false });
            this.props.actions.addEvaluationTool({
                evaluationTool,
                evalCriteria
            });
        } else if (disableSave) {
            this.setState({ showErrors: true })
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {evaluationTool} = this.state;
        // const {evaluationCriteia} = this.state;

        this.setState({
            evaluationTool: {
                ...evaluationTool,
                [field]: get(e, 'target.value')
            }
            // evaluationCriteria: {
            //     ...evaluationCriteia,
            //     [field]: get(e, 'target.value')
            // }
        })
    }

    changeDeadline = (e: any, value: number | number[]) => {
        const {evaluationTool} = this.state;

        this.setState({
            evaluationTool: {
                ...evaluationTool,
                [EvaluationToolFields.DEADLINE]: value
            }
        })
    }

    changeCheckPoint = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const {evaluationTool} = this.state;

        this.setState({
            evaluationTool: {
                ...evaluationTool,
                [EvaluationToolFields.CHECK_POINT]: checked
            }
        })
    }

    recalcTableSums = () => {
        const { evalCriteria } = this.state;

        let newSumMin = evalCriteria
            .filter(row => typeof row[EvaluationCriteiaFields.MIN] === 'number')
            .map(row => row[EvaluationCriteiaFields.MIN]);
        newSumMin = newSumMin.length !== 0 ? newSumMin.reduce((a, b) => a + b) : 0;
        let newSumMax = evalCriteria
            .filter(row => typeof row[EvaluationCriteiaFields.MAX] === 'number')
            .map(row => row[EvaluationCriteiaFields.MAX]);
        newSumMax = newSumMax.length !== 0 ? newSumMax.reduce((a, b) => a + b) : 0;

        this.setState({
            sumMin: newSumMin,
            sumMax: newSumMax,
        });
    }
    onTableRowToggleEdit = (id: any) => {
        const {evalCriteria} = this.state;

        this.setState({
            evalCriteria: evalCriteria.map(row => {
                if (row.internalId === id) {
                    const { isEditMode } = row;

                    return {...row, isEditMode: !isEditMode}
                }
                return row;
            }),
        }, () => {
            this.recalcTableSums();
        });
    };
    onTableRowDelete = (id: any) => {
        const { evalCriteria } = this.state;
        const newEvalCriteria = evalCriteria.filter(row => row.internalId !== id);
        this.setState({
            evalCriteria: newEvalCriteria
        }, () => {
            this.recalcTableSums();
        });
    };
    onTableRowChange = (e: any, row: any) => {
        const { evalCriteria } = this.state;
        let value = e.target.value;
        const name = e.target.name;
        const { internalId } = row;

        const newEvalCriteria = evalCriteria.map(row => {
            if (row.internalId === internalId) {
                if (
                    (name === EvaluationCriteiaFields.MAX || name === EvaluationCriteiaFields.MIN)
                    && !isNaN(Number(value))
                ){
                    value = Number(value);
                }
                return { ...row, [name]: value }
            }
            return row;
        });
        this.setState({
            evalCriteria: newEvalCriteria
        });
    }
    onTableRowCreate = () => {
        const { evalCriteria } = this.state;
        const newEvalCritera = evalCriteria.concat([{
            internalId: uuidv4(),
            [EvaluationCriteiaFields.ID]: null,
            [EvaluationCriteiaFields.EVALUATION_CRITERIA]: '',
            [EvaluationCriteiaFields.MIN]: 0,
            [EvaluationCriteiaFields.MAX]: 0,
            [EvaluationCriteiaFields.EVALUATIONTOOL_ID]: null,
            [EvaluationCriteiaFields.CERTIFICATIONEVALUATIONTOOL_TYPE_ID]: null,
            isEditMode: true,
        }]);
        this.setState({
            evalCriteria: newEvalCritera
        });
    }

    changeDescription = (event: any) => {
        const {evaluationTool} = this.state;
        const data = event.editor.getData();

        this.setState({
            evaluationTool: {
                ...evaluationTool,
                [EvaluationToolFields.DESCRIPTION]: data
            }
        })
    }
    hasError = (field: string) => {
        const { showErrors, evaluationTool } = this.state;
        return showErrors && get(evaluationTool, [field, 'length'], 0) === 0
    }
    render() {
        const {classes, sections, semesterCount} = this.props;
        const {evaluationTool, isOpen, evalCriteria} = this.state;

        const isEditMode = Boolean(evaluationTool[EvaluationToolFields.ID]);
        if (!isOpen) return <></>

        return (
            <div className={classNames(classes.dialog, {[classes.openDialog]: isOpen})}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {isEditMode ? 'Редактировать' : 'Создать'} оценочное средство
                        </Typography>
                        <Button autoFocus
                                color="inherit"
                                onClick={this.handleSave}
                                // disabled={disableButton}
                                classes={{
                                    disabled: classes.disabledButton
                                }}
                        >
                            Сохранить
                        </Button>
                    </Toolbar>
                </AppBar>

                <DialogContent className={classes.dialogContent}>
                    {isOpen &&
                        <>
                            <div className={classes.leftSide}>
                                <AutoSizer style={{width: '100%'}}>
                                    {({width}) => (
                                        <>
                                            <TextField label="Название оценочного средства *"
                                                       onChange={this.saveField(EvaluationToolFields.NAME)}
                                                       variant="outlined"
                                                       className={classNames(classes.input, classes.marginBottom30, classes.nameInput)}
                                                       fullWidth
                                                       InputLabelProps={{
                                                           shrink: true,
                                                       }}
                                                       error={this.hasError(EvaluationToolFields.NAME)}
                                                       value={evaluationTool[EvaluationToolFields.NAME]}
                                            />

                                            <FormControl error={this.hasError(EvaluationToolFields.SECTIONS)} className={classes.sectionSelector}>
                                                <InputLabel shrink id="section-label">
                                                    Раздел *
                                                </InputLabel>
                                                <Select
                                                    variant="outlined"
                                                    multiple
                                                    className={classes.selector}
                                                    // @ts-ignore
                                                    onChange={this.saveField(EvaluationToolFields.SECTIONS)}
                                                    value={evaluationTool[EvaluationToolFields.SECTIONS]}
                                                    fullWidth
                                                    displayEmpty
                                                    input={
                                                        <OutlinedInput
                                                            notched
                                                            labelWidth={100}
                                                            name="course"
                                                            id="section-label"
                                                        />
                                                    }
                                                    style={{width: width}}
                                                >
                                                    {sections.map((item: any) =>
                                                        <MenuItem value={item.value} key={`section-${item.value}`}>
                                                            {item.label}
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>

                                            <FormControl error={this.hasError(EvaluationToolFields.TYPE)} className={classes.typeSelector}>
                                                <InputLabel shrink id="section-label">
                                                    Тип *
                                                </InputLabel>
                                                <Select
                                                    variant="outlined"
                                                    className={classes.selector}
                                                    // @ts-ignore
                                                    onChange={this.saveField(EvaluationToolFields.TYPE)}
                                                    value={evaluationTool[EvaluationToolFields.TYPE]}
                                                    fullWidth
                                                    displayEmpty
                                                    input={
                                                        <OutlinedInput
                                                            notched
                                                            labelWidth={100}
                                                            name="course"
                                                            id="section-label"
                                                        />
                                                    }
                                                    style={{width: width}}
                                                    renderValue={(value = '') => {
                                                        //@ts-ignore
                                                        if (types.includes(value) || value.length === 0){
                                                            return <>{value}</>
                                                        }
                                                        return <>{value} (устаревшее)</>
                                                    }}
                                                >
                                                    {types.map((type: any, index: number) =>
                                                        <MenuItem value={type} key={`type-${index}`}>
                                                            {type}
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <div
                                                className={classNames(classes.row, classes.marginBottom30)}
                                            >
                                                <TextField
                                                    label="Тема (проблема)"
                                                    onChange={this.saveField(EvaluationToolFields.PROBLEM_TOPIC)}
                                                    variant="outlined"
                                                    className={classNames(classes.input, classes.nameInput)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={this.hasError(EvaluationToolFields.PROBLEM_TOPIC)}
                                                    value={evaluationTool[EvaluationToolFields.PROBLEM_TOPIC]}
                                                />
                                                <Tooltip title="Здесь Вы можете написать тему или проблему Вашего оценочного средства, если она есть.">
                                                    <QuestionIcon color="primary" className={classes.tooltipIcon} />
                                                </Tooltip>
                                            </div>

                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Длительность изучения *
                                                    <Tooltip title="Первый семестр - семестр с которого начинается дисциплина.">
                                                        <QuestionIcon color="primary" className={classes.tooltipIcon} />
                                                    </Tooltip>
                                                </FormLabel>
                                                <RadioGroup className={classes.radioGroup}
                                                            onChange={this.saveField(EvaluationToolFields.SEMESTER)}
                                                            value={evaluationTool[EvaluationToolFields.SEMESTER]}
                                                >
                                                    <FormControlLabel value={'1'} control={<Radio checked={parseInt(evaluationTool[EvaluationToolFields.SEMESTER]) === 1} />} label="Первый" />
                                                    <FormControlLabel
                                                      disabled={semesterCount < 2}
                                                      value={'2'}
                                                      control={<Radio checked={parseInt(evaluationTool[EvaluationToolFields.SEMESTER]) === 2} />}
                                                      label="Второй"
                                                    />
                                                    <FormControlLabel
                                                      disabled={semesterCount < 3}
                                                      value={'3'}
                                                      control={<Radio checked={parseInt(evaluationTool[EvaluationToolFields.SEMESTER]) === 3} />}
                                                      label="Третий"
                                                    />
                                                    <FormControlLabel
                                                      disabled={semesterCount < 4}
                                                      value={'4'}
                                                      control={<Radio checked={parseInt(evaluationTool[EvaluationToolFields.SEMESTER]) === 4} />}
                                                      label="Четвертый"
                                                    />
                                                </RadioGroup>
                                            </FormControl>

                                            <FormControlLabel
                                                control={<Checkbox checked={evaluationTool[EvaluationToolFields.CHECK_POINT]} onChange={this.changeCheckPoint}/>}
                                                label="Ключевая точка"
                                                className={classes.marginBottom30}
                                            />

                                            <div>
                                                <Typography className={classes.weekTitle}>
                                                    Срок контроля в неделях
                                                </Typography>
                                                <Slider
                                                    defaultValue={1}
                                                    step={1}
                                                    marks
                                                    min={0}
                                                    max={20}
                                                    valueLabelDisplay="on"
                                                    value={evaluationTool[EvaluationToolFields.DEADLINE]}
                                                    onChange={this.changeDeadline}
                                                />
                                            </div>
                                        </>
                                    )}
                                </AutoSizer>
                            </div>

                            <div className={classes.rightSide}>
                                <Box component="div" display="block">
                                    <>
                                        <InputLabel className={classes.label}> Описание * </InputLabel>
                                        <CKEditor
                                            value={evaluationTool[EvaluationToolFields.DESCRIPTION]
                                                    ? evaluationTool[EvaluationToolFields.DESCRIPTION] : ''}
                                            onChange={this.changeDescription}
                                            useFormulas
                                            height="calc(70vh - 280px)"
                                            style={this.hasError(EvaluationToolFields.DESCRIPTION)? {border: '1px solid #d00000'} : {border: '1px solid #d1d1d1'}}
                                        />
                                    </>
                                    <Box

                                    >
                                        <Box
                                            display='flex'
                                            justifyContent='space-between'
                                            alignItems='baseline'
                                            paddingBottom='10px'
                                        >
                                            <InputLabel className={classes.label}>Критерии оценивания *</InputLabel>
                                            <Button
                                                variant="contained"
                                                startIcon={<CreateIcon />}
                                                onClick={() => {this.onTableRowCreate()}}
                                            >
                                                Добавить
                                            </Button>
                                        </Box>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <colgroup>
                                                    <col style={{width: '5%'}}/>
                                                    <col style={{width: '70%'}}/>
                                                    <col style={{width: '7%'}}/>
                                                    <col style={{width: '7%'}}/>
                                                    <col style={{width: '10%'}}/>
                                                </colgroup>
                                                <TableHead>
                                                    <TableRow key='table-header'>
                                                        <TableCell>№</TableCell>
                                                        <TableCell>Критерий оценивания</TableCell>
                                                        <TableCell>Мин. кол-во баллов</TableCell>
                                                        <TableCell>Макс. кол-во баллов</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {evalCriteria.map((row, idx) => (
                                                        <TableRow key={row.internalId}>
                                                            <TableCell>{idx + 1}</TableCell>
                                                            <EditableTableCell row={row} name={EvaluationCriteiaFields.EVALUATION_CRITERIA} onChange={this.onTableRowChange} />
                                                            <EditableTableCell row={row} name={EvaluationCriteiaFields.MIN} onChange={this.onTableRowChange} />
                                                            <EditableTableCell row={row} name={EvaluationCriteiaFields.MAX} onChange={this.onTableRowChange} />
                                                            <TableCell>
                                                                {row.isEditMode? (
                                                                    <ButtonGroup>
                                                                        <IconButton
                                                                            size='small'
                                                                            onClick={() => this.onTableRowToggleEdit(row.internalId)}
                                                                        >
                                                                            <CheckIcon />
                                                                        </IconButton>
                                                                    </ButtonGroup>
                                                                ): (
                                                                    <ButtonGroup>
                                                                        <IconButton
                                                                            size='small'
                                                                            onClick={() => this.onTableRowToggleEdit(row.internalId)}
                                                                        >
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            size='small'
                                                                            onClick={() => this.onTableRowDelete(row.internalId)}
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </ButtonGroup>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow key='table_footer'>
                                                        <TableCell colSpan={2}>Всего</TableCell>
                                                        <TableCell>{this.state.sumMin}</TableCell>
                                                        <TableCell>{this.state.sumMax}</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            </div>


                        </>
                    }
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>

                        <Button onClick={this.handleSave}
                                variant="contained"
                                color="primary">
                            Сохранить
                        </Button>
                </DialogActions>
            </div>
        );
    }
}

export default connect(withStyles(styles)(CreateModal));
