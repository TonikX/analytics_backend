import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";
import classNames from "classnames";

import {CreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

import SearchSelector from "../../../../components/SearchSelector/SearchSelector";
import {typeOfWorkProgramInPlan, OPTIONALLY as optionalTypeOfWorkProgram} from '../../data';

import {BlocksOfWorkProgramsFields, ModuleFields} from '../../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {WorkProgramGeneralType} from "../../../WorkProgram/types";
import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";
import moment from "moment";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        module: {
            [ModuleFields.ID]: '',
        },
        blockOfWorkPrograms: {
            [BlocksOfWorkProgramsFields.ID]: null,
            [BlocksOfWorkProgramsFields.TYPE]: '',
            [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: [],
            [BlocksOfWorkProgramsFields.SEMESTER_UNIT]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        showWorkProgramSelector: false,
        showAddWorkProgramButton: true,
    };

    componentDidMount() {
        this.props.workProgramActions.getWorkProgramList();
    }

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {blockOfWorkPrograms} = this.props;

        if (!shallowEqual(blockOfWorkPrograms, prevProps.blockOfWorkPrograms)){
            const workProgram = get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.WORK_PROGRAMS) || [];
            const semesterHours = get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.SEMESTER_UNIT);

            const mappedWorkProgram = workProgram.map((program: WorkProgramGeneralType) => {
                const date = moment(program[WorkProgramGeneralFields.APPROVAL_DATE]).isValid() ?
                    moment(program[WorkProgramGeneralFields.APPROVAL_DATE]).format('YYYY') : '';

                const authors = program[WorkProgramGeneralFields.AUTHORS] || '';

                return {
                    label: `${program[WorkProgramGeneralFields.TITLE]} ${date} ${authors}`,
                    value: program[WorkProgramGeneralFields.ID]
                };
            });

            const mappedSemesterHours = semesterHours && semesterHours.split ? semesterHours.split(',') : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            this.setState({
                blockOfWorkPrograms: {
                    [BlocksOfWorkProgramsFields.ID]: get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.ID),
                    [BlocksOfWorkProgramsFields.TYPE]: get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.TYPE, ''),
                    [BlocksOfWorkProgramsFields.SEMESTER_UNIT]: mappedSemesterHours,
                    [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: mappedWorkProgram,
                },
                module: {
                    [ModuleFields.ID]: get(blockOfWorkPrograms, 'moduleId'),
                },
            });
        }
    }

    handleShowAddWorkProgramButton = () => {
        this.setState({showAddWorkProgramButton: true});
    }

    handleHideAddWorkProgramButton = () => {
        this.setState({showAddWorkProgramButton: false});
    }

    handleShowWorkProgramSelector = () => {
        this.setState({showWorkProgramSelector: true});
        this.handleHideAddWorkProgramButton();
    }

    handleHideWorkProgramSelector = () => {
        this.setState({showWorkProgramSelector: false});
    }

    handleClose = () => {
        this.props.actions.closeDetailDialog();
    }

    handleSave = () => {
        const {blockOfWorkPrograms, module} = this.state;

        if (blockOfWorkPrograms[BlocksOfWorkProgramsFields.ID]){
            this.props.actions.changeBlockOfWorkPrograms({...blockOfWorkPrograms, moduleId: module[ModuleFields.ID]});
        } else {
            this.props.actions.createBlockOfWorkPrograms({...blockOfWorkPrograms, moduleId: module[ModuleFields.ID]});
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {blockOfWorkPrograms} = this.state;

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [field]: get(e, 'target.value')
            }
        })
    }

    changeType = (e: React.ChangeEvent) => {
        const {blockOfWorkPrograms} = this.state;
        const value = get(e, 'target.value');
        let workPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS];

        if (value !== optionalTypeOfWorkProgram && get(workPrograms, 'length', 0) > 1){
            workPrograms = [workPrograms[0]];
        }

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.TYPE]: get(e, 'target.value'),
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: workPrograms
            }
        })
    }

    saveWorkProgramList = (value: string) => {
        if (value === '') return;

        const {blockOfWorkPrograms} = this.state;
        const {workProgramList} = this.props;

        const workProgram = workProgramList.find(el => el.value === value);

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: [
                    ...blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS],
                    {
                        value,
                        label: workProgram ? workProgram.label : ''
                    }
                ]
            }
        });

        this.handleHideWorkProgramSelector();
        this.handleShowAddWorkProgramButton();
    }

    handleRemoveWorkProgram = (value: string) => () => {
        const {blockOfWorkPrograms} = this.state;

        // @ts-ignore
        const filteredWorkPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS].filter(item => item.value !== value);

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: filteredWorkPrograms
            }
        });
    }

    handleChangeHours = (index: number) => (e: React.ChangeEvent) => {
        const {blockOfWorkPrograms} = this.state;
        const hours = blockOfWorkPrograms[BlocksOfWorkProgramsFields.SEMESTER_UNIT];

        hours[index] = get(e, 'target.value', 0);

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.SEMESTER_UNIT]: hours
            }
        });
    }

    handleChangeSearchText = (searchText: string) => {
        this.props.workProgramActions.changeSearchQuery(searchText);
        this.props.workProgramActions.getWorkProgramList();
    }

    render() {
        const {isOpen, classes, workProgramList} = this.props;
        const {blockOfWorkPrograms, showAddWorkProgramButton, showWorkProgramSelector} = this.state;

        const canAddMoreWorkProgram = get(blockOfWorkPrograms, [BlocksOfWorkProgramsFields.WORK_PROGRAMS, 'length'], 0) === 0 ||
            blockOfWorkPrograms[BlocksOfWorkProgramsFields.TYPE] === optionalTypeOfWorkProgram;

        const disableButton = get(blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS], 'length', 0) === 0 ||
            get(blockOfWorkPrograms[BlocksOfWorkProgramsFields.TYPE], 'length', 0) === 0;

        const isEditMode = Boolean(blockOfWorkPrograms[BlocksOfWorkProgramsFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Добавить'} блок рабочих программ</DialogTitle>
                <DialogContent>
                    <FormControl className={classNames(classes.selectorWrap, classes.marginBottom30)}>
                        <InputLabel shrink id="section-label">
                            Тип *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.changeType}
                            value={blockOfWorkPrograms[BlocksOfWorkProgramsFields.TYPE]}
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

                    <div className={classes.workProgramBlock}>
                        <Typography className={classes.label}> Рабочие программы </Typography>
                        {blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS].map(item =>{
                            //@ts-ignore
                            return <Typography className={classes.workProgramItem}>{item.label} <DeleteIcon onClick={this.handleRemoveWorkProgram(item.value)}/> </Typography>
                        })}
                        {get(blockOfWorkPrograms, [BlocksOfWorkProgramsFields.WORK_PROGRAMS, 'length'], 0) === 0 ?
                            <Typography> Рабочих программ пока не добавлено</Typography>
                            : <></>
                        }
                    </div>

                    {showWorkProgramSelector &&
                        <SearchSelector label="Рабочая программа * "
                                        changeSearchText={this.handleChangeSearchText}
                                        list={workProgramList}
                                        changeItem={this.saveWorkProgramList}
                                        className={classes.marginBottom30}
                                        value={''}
                                        valueLabel={''}
                        />
                    }

                    <div className={classes.addWorkProgramButtonWrap}>
                        {showAddWorkProgramButton && canAddMoreWorkProgram &&
                            <Button size="small"
                                    onClick={this.handleShowWorkProgramSelector}
                                    className={classes.addWorkProgramButton}
                                    variant="text"
                            ><AddIcon/> Добавить рабочую программу</Button>
                        }
                    </div>

                    <div className={classes.semesterBlock}>
                        <Typography className={classes.label}> Количество зачетных единиц в семестрах </Typography>
                        <div className={classes.semesterList}>
                            {blockOfWorkPrograms[BlocksOfWorkProgramsFields.SEMESTER_UNIT].map((item, index) =>
                                <TextField className={classes.semesterField}
                                           label={`${index} семестр`}
                                           variant='outlined'
                                           value={item}
                                           onChange={this.handleChangeHours(index)}
                                           type="number"
                                />
                            )}
                        </div>
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
