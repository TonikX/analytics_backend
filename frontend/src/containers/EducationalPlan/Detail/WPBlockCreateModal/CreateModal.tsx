import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";
import classNames from "classnames";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars";

import {CreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import Tooltip from "@material-ui/core/Tooltip";

import AddWorkProgramModal from "./AddWorkProgramModal";
import {typeOfWorkProgramInPlan, OPTIONALLY as optionalTypeOfWorkProgram} from '../../data';

import {BlocksOfWorkProgramsFields, ModuleFields} from '../../enum';
import {WorkProgramGeneralType} from "../../../WorkProgram/types";
import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";

import AddCompetenceModal from "../../../../components/AddCompetenceModal";
import AddIndicatorsModal from "../../../../components/AddIndicatorsModal";
import AddResultsModal from "./AddResultsModal";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

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
        isAddWorkProgramModalOpen: false,
        isAddCompetenceModalOpen: false,
        isAddResultsModalOpen: false,
        isAddIndicatorsModalOpen: false,
        expandedWorkProgram: null,
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
                    value: program[WorkProgramGeneralFields.ID],
                    // @ts-ignore
                    id: program.wp_in_fs_id,
                    // @ts-ignore
                    [BlocksOfWorkProgramsFields.COMPETENCES]: program[BlocksOfWorkProgramsFields.COMPETENCES],
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

    handleOpenAddWorkProgramModal = () => {
        this.setState({isAddWorkProgramModalOpen: true});
    }

    handleCloseAddWorkProgramModal = () => {
        this.setState({isAddWorkProgramModalOpen: false});
    }

    handleOpenAddCompetenceModal = (workProgramId: number) => () => {
        this.setState({isAddCompetenceModalOpen: workProgramId});
    }

    handleCloseAddCompetenceModal = () => {
        this.setState({isAddCompetenceModalOpen: null});
    }

    handleOpenAddIndicatorsModal = (workProgramId: number, competenceId: number) => () => {
        this.setState({isAddIndicatorsModalOpen: {
            workProgramId,
            competenceId
        }});
    }

    handleCloseAddIndicatorsModal = () => {
        this.setState({isAddIndicatorsModalOpen: null});
    }

    handleOpenAddResultsModal = (workProgramId: number, competenceId: number, indicatorId: number) => () => {
        this.setState({isAddResultsModalOpen: {
            workProgramId,
            competenceId,
            indicatorId
        }});
    }

    handleCloseAddResultsModal = () => {
        this.setState({isAddResultsModalOpen: null});
    }

    handleClose = () => {
        const {planId, moduleId} = this.props;

        this.props.actions.closeDetailDialog();
        
        if (planId){
            this.props.actions.getEducationalDetail(planId);
        } else {
            //@ts-ignore
            this.props.moduleActions.getTrainingModule({id: moduleId});
        }
    }

    handleSave = () => {
        const {blockOfWorkPrograms, module} = this.state;

        if (blockOfWorkPrograms[BlocksOfWorkProgramsFields.ID]){
            this.props.actions.changeBlockOfWorkPrograms({...blockOfWorkPrograms, moduleId: module[ModuleFields.ID]});
        } else {
            this.props.actions.createBlockOfWorkPrograms({...blockOfWorkPrograms, moduleId: module[ModuleFields.ID]});
        }
    }

    changeType = (e: React.ChangeEvent) => {
        const {blockOfWorkPrograms} = this.state;
        const value = get(e, 'target.value');
        let workPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS];

        if (value !== optionalTypeOfWorkProgram && get(workPrograms, 'length', 0) > 1){
            workPrograms = [workPrograms[0]];
        }

        this.props.actions.changeBlockOfWorkPrograms({
            [BlocksOfWorkProgramsFields.TYPE]: get(e, 'target.value'),
            [BlocksOfWorkProgramsFields.ID]: blockOfWorkPrograms[BlocksOfWorkProgramsFields.ID],
        });

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
        const newWorkPrograms = [
            ...blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS],
            {
                value,
                label: workProgram ? workProgram.label : '',
            }
        ]

        this.props.actions.changeBlockOfWorkPrograms({
            [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: newWorkPrograms.map(workProgram => workProgram.value),
            [BlocksOfWorkProgramsFields.ID]: blockOfWorkPrograms[BlocksOfWorkProgramsFields.ID],
        });

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: newWorkPrograms
            }
        });
    }

    saveCompetence = (competence: any) => {
        const {blockOfWorkPrograms, isAddCompetenceModalOpen} = this.state;
        const workPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS];
        const workProgramId = isAddCompetenceModalOpen;

        const modifiedWorkPrograms = workPrograms.map((workProgram: any) => {
            if (workProgram.value === workProgramId){
                workProgram = {
                    ...workProgram,
                    [BlocksOfWorkProgramsFields.COMPETENCES]: [
                        ...workProgram[BlocksOfWorkProgramsFields.COMPETENCES] ? workProgram[BlocksOfWorkProgramsFields.COMPETENCES] : [],
                        {
                            ...competence,
                            [BlocksOfWorkProgramsFields.INDICATORS]: []
                        }
                    ]
                }
            }
            return workProgram;
        })

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: modifiedWorkPrograms
            }
        });
    }

    deleteCompetence = (workProgramId: number, competenceId: number, zunId: number, wpChangeBlockId: number) => () => {
        const {blockOfWorkPrograms} = this.state;
        const workPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS];

        const modifiedWorkPrograms = workPrograms.map((workProgram: any) => {
            if (workProgram.value === workProgramId){
                workProgram = {
                    ...workProgram,
                    [BlocksOfWorkProgramsFields.COMPETENCES]: workProgram[BlocksOfWorkProgramsFields.COMPETENCES] ?
                        workProgram[BlocksOfWorkProgramsFields.COMPETENCES].filter((competence: any) => competence.value !== competenceId)
                    : [],
                }
            }
            return workProgram;
        });

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: modifiedWorkPrograms
            }
        });

        if (zunId){
            this.props.actions.deleteCompetenceBlock({
                'wpChangeBlockId': wpChangeBlockId,
                'competenceId': competenceId,
            });
        }
    }

    saveResults = (results: any) => {
        const {blockOfWorkPrograms, isAddResultsModalOpen} = this.state;
        // @ts-ignore
        const {workProgramId, competenceId, indicatorId} = isAddResultsModalOpen;

        const workPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS];

        const modifiedWorkPrograms = workPrograms.map((workProgram: any) => {
            if (workProgram.value === workProgramId){
                workProgram = {
                    ...workProgram,
                    [BlocksOfWorkProgramsFields.COMPETENCES]: workProgram[BlocksOfWorkProgramsFields.COMPETENCES].map((competence: any) => {
                        if (competence.value === competenceId){
                            competence = {
                                ...competence,
                                [BlocksOfWorkProgramsFields.INDICATORS]: competence[BlocksOfWorkProgramsFields.INDICATORS].map((indicator: any) => {
                                    if (indicator.value === indicatorId){
                                        indicator = {
                                            ...indicator,
                                            [BlocksOfWorkProgramsFields.RESULTS]: [
                                                ...indicator[BlocksOfWorkProgramsFields.RESULTS],
                                                ...results
                                            ]
                                        }
                                    }
                                    return indicator;
                                })
                            }
                        }
                        return competence;
                    })
                }
            }
            return workProgram;
        })

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: modifiedWorkPrograms
            }
        });
    }

    saveIndicators = (indicators: any) => {
        const {blockOfWorkPrograms, isAddIndicatorsModalOpen} = this.state;
        // @ts-ignore
        const {workProgramId, competenceId} = isAddIndicatorsModalOpen;

        const workPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS];

        const modifiedWorkPrograms = workPrograms.map((workProgram: any) => {
            if (workProgram.value === workProgramId){
                workProgram = {
                    ...workProgram,
                    [BlocksOfWorkProgramsFields.COMPETENCES]: workProgram[BlocksOfWorkProgramsFields.COMPETENCES].map((competence: any) => {
                        if (competence.value === competenceId){
                            competence = {
                                ...competence,
                                [BlocksOfWorkProgramsFields.INDICATORS]: [
                                    ...competence[BlocksOfWorkProgramsFields.INDICATORS],
                                    ...indicators.map((indicator: any) => ({
                                        ...indicator,
                                        [BlocksOfWorkProgramsFields.RESULTS]: []
                                    }))
                                ]
                            }
                        }
                        return competence;
                    })
                }
            }
            return workProgram;
        })

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: modifiedWorkPrograms
            }
        });
    }

    deleteIndicator = (workProgramId: number, competenceId: number, indicatorId: number) => () => {
        const {blockOfWorkPrograms} = this.state;

        const workPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS];

        const modifiedWorkPrograms = workPrograms.map((workProgram: any) => {
            if (workProgram.value === workProgramId){
                workProgram = {
                    ...workProgram,
                    [BlocksOfWorkProgramsFields.COMPETENCES]: workProgram[BlocksOfWorkProgramsFields.COMPETENCES].map((competence: any) => {
                        if (competence.value === competenceId){
                            competence = {
                                ...competence,
                                [BlocksOfWorkProgramsFields.INDICATORS]: competence[BlocksOfWorkProgramsFields.INDICATORS].filter((indicator: any) => indicator.value !== indicatorId)
                            }
                        }
                        return competence;
                    })
                }
            }
            return workProgram;
        })

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: modifiedWorkPrograms
            }
        });
    }

    deleteResult = (workProgramId: number, competenceId: number, indicatorId: number, resultId: number) => () => {
        const {blockOfWorkPrograms} = this.state;

        const workPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS];

        const modifiedWorkPrograms = workPrograms.map((workProgram: any) => {
            if (workProgram.value === workProgramId){
                workProgram = {
                    ...workProgram,
                    [BlocksOfWorkProgramsFields.COMPETENCES]: workProgram[BlocksOfWorkProgramsFields.COMPETENCES].map((competence: any) => {
                        if (competence.value === competenceId){
                            competence = {
                                ...competence,
                                [BlocksOfWorkProgramsFields.INDICATORS]: competence[BlocksOfWorkProgramsFields.INDICATORS].map((indicator: any) => {
                                    if (indicator.value === indicatorId){
                                        return  {
                                            ...indicator,
                                            [BlocksOfWorkProgramsFields.RESULTS]: [
                                                ...indicator[BlocksOfWorkProgramsFields.RESULTS].filter((result: any) => result.value !== resultId)
                                            ]
                                        };
                                    }
                                    return indicator;
                                })
                            }
                        }
                        return competence;
                    })
                }
            }
            return workProgram;
        })

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: modifiedWorkPrograms
            }
        });
    }

    handleRemoveWorkProgram = (value: string, id: number) => () => {
        const {blockOfWorkPrograms} = this.state;

        // @ts-ignore
        const filteredWorkPrograms = blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS].filter(item => item.value !== value);

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: filteredWorkPrograms
            }
        });

        this.props.actions.deleteWorkProgramFromZun(id);
    }

    handleChangeHours = (index: number) => (e: React.ChangeEvent) => {
        const {blockOfWorkPrograms} = this.state;
        const hours = blockOfWorkPrograms[BlocksOfWorkProgramsFields.SEMESTER_UNIT];

        hours[index] = get(e, 'target.value', 0);

        this.props.actions.changeBlockOfWorkPrograms({
            [BlocksOfWorkProgramsFields.SEMESTER_UNIT]: hours.toString(),
            [BlocksOfWorkProgramsFields.ID]: blockOfWorkPrograms[BlocksOfWorkProgramsFields.ID],
        });

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.SEMESTER_UNIT]: hours
            }
        });
    }

    handleChangeExpandedWorkProgram = (wpId: number) => () => {
        const {expandedWorkProgram} = this.state;

        if (expandedWorkProgram === wpId){
            this.setState({expandedWorkProgram: null});
        } else {
            this.setState({expandedWorkProgram: wpId});
        }
    }

    saveToBeCompetence = (workProgramId: number, competence: any, wpChangeBlockId: number ) => () => {
        this.props.actions.saveCompetenceBlock({
            workProgramId: workProgramId,
            profStandard: competence,
            wpChangeBlockId: wpChangeBlockId,
        })
    }

    render() {
        const {isOpen, classes, disableZUN} = this.props;
        const {blockOfWorkPrograms, showAddWorkProgramButton, isAddWorkProgramModalOpen,
            isAddCompetenceModalOpen, isAddIndicatorsModalOpen, expandedWorkProgram, isAddResultsModalOpen
        } = this.state;

        const canAddMoreWorkProgram = get(blockOfWorkPrograms, [BlocksOfWorkProgramsFields.WORK_PROGRAMS, 'length'], 0) === 0 ||
            blockOfWorkPrograms[BlocksOfWorkProgramsFields.TYPE] === optionalTypeOfWorkProgram;

        const isEditMode = Boolean(blockOfWorkPrograms[BlocksOfWorkProgramsFields.ID]);

        return (
            <>
                <Dialog
                    open={isOpen}
                    onClose={this.handleClose}
                    classes={{
                        root: classes.root,
                        paper: classes.dialog
                    }}
                    fullScreen
                    //@ts-ignore
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {isEditMode ? 'Редактировать' : 'Добавить'} блок рабочих программ
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent className={classes.dialogContent}>
                        <div className={classes.leftSide}>
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
                                    MenuProps={{
                                        PopoverClasses: {
                                            root: classes.selector
                                        }
                                    }}
                                >
                                    {typeOfWorkProgramInPlan.map(item =>
                                        <MenuItem value={item.value} key={`type-${item.value}`}>
                                            {item.label}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <div className={classes.semesterBlock}>
                                <Typography className={classes.label}> Количество зачетных единиц в семестрах </Typography>
                                <div className={classes.semesterList}>
                                    {blockOfWorkPrograms[BlocksOfWorkProgramsFields.SEMESTER_UNIT].map((item, index) =>
                                        <TextField className={classes.semesterField}
                                                   label={`${index + 1} семестр`}
                                                   variant='outlined'
                                                   defaultValue={item}
                                                   onBlur={this.handleChangeHours(index)}
                                                   type="number"
                                                   key={'semester' + index}
                                        />
                                    )}
                                </div>
                            </div>


                            <div className={classes.addWorkProgramButtonWrap}>
                                {showAddWorkProgramButton && canAddMoreWorkProgram &&
                                <Button size="small"
                                        onClick={this.handleOpenAddWorkProgramModal}
                                        className={classes.addWorkProgramButton}
                                        variant="text"
                                ><AddIcon/> Добавить рабочую программу</Button>
                                }
                            </div>
                        </div>

                        <Scrollbars>
                            <div className={classes.rightSide}>
                                <div className={classes.workProgramBlock}>
                                    {!disableZUN &&
                                        <Typography className={classes.label}>
                                            Настройка связей рабочих программ, компетенций, индикаторов и результатов
                                        </Typography>
                                    }
                                    {blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS].map((workProgram: any, wpIndex) =>
                                        <ExpansionPanel expanded={disableZUN ? false : expandedWorkProgram === wpIndex}
                                                        onChange={this.handleChangeExpandedWorkProgram(wpIndex)}
                                                        key={wpIndex}
                                        >
                                            <ExpansionPanelSummary
                                                expandIcon={disableZUN ? <></> : <ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                <Typography className={classes.workProgramItem}>{workProgram.label} <DeleteIcon onClick={this.handleRemoveWorkProgram(workProgram.value, workProgram.id)}/></Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Код компетенции</TableCell>
                                                            <TableCell>Код индикаторов</TableCell>
                                                            <TableCell>Результаты обучения</TableCell>
                                                            <TableCell />
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {workProgram[BlocksOfWorkProgramsFields.COMPETENCES] &&
                                                        workProgram[BlocksOfWorkProgramsFields.COMPETENCES].map((competence: any, index: number) => {

                                                            if (competence[BlocksOfWorkProgramsFields.INDICATORS].length === 0){
                                                                return <TableRow key={'indicator' + index}>
                                                                    <TableCell className={classes.competenceCell}>{index + 1}. {competence.label}</TableCell>
                                                                    <TableCell>
                                                                        <div className={classes.smallButton}
                                                                             onClick={this.handleOpenAddIndicatorsModal(workProgram.value, competence.value)}
                                                                        >
                                                                            <AddIcon/> Добавить индикатор
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell />
                                                                    <TableCell>
                                                                        <div className={classes.competenceButtons}>
                                                                            <DeleteIcon className={classes.iconButton}
                                                                                        onClick={this.deleteCompetence(workProgram.value, competence.value, competence.zunId, workProgram.id)}
                                                                            />
                                                                            <Tooltip title="Добавьте индикатор, чтобы сохранить"
                                                                                     classes={{popper: classes.tooltip}}
                                                                            >
                                                                                <SaveIcon className={classNames(classes.iconButton, classes.disableIcon)} />
                                                                            </Tooltip>
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            }
                                                            return competence[BlocksOfWorkProgramsFields.INDICATORS].map((indicator: any, indicatorIndex: number) =>
                                                                <TableRow key={`indicator-${indicatorIndex}`}>
                                                                    {indicatorIndex === 0 ?
                                                                        <TableCell
                                                                            className={classes.competenceCell}
                                                                            rowSpan={competence[BlocksOfWorkProgramsFields.INDICATORS].length}>
                                                                            {index + 1}. {competence.label}
                                                                        </TableCell>
                                                                        : <></>
                                                                    }
                                                                    <TableCell>
                                                                        {index + 1}.{indicatorIndex + 1} {indicator.label}
                                                                        <DeleteIcon className={classes.deleteIndicatorIcon}
                                                                                    onClick={this.deleteIndicator(workProgram.value, competence.value, indicator.value)}
                                                                        />
                                                                        {indicatorIndex === competence[BlocksOfWorkProgramsFields.INDICATORS].length - 1 ?
                                                                            <div className={classes.smallButton}
                                                                                 onClick={this.handleOpenAddIndicatorsModal(workProgram.value, competence.value)}
                                                                                 style={{margin: '20px 0px 0px'}}
                                                                            >
                                                                                <AddIcon/> Добавить индикатор
                                                                            </div>
                                                                        :
                                                                            <></>
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className={classes.resultsCell}>
                                                                        {indicator[BlocksOfWorkProgramsFields.RESULTS].map((result: any, resultIndex: number) => (
                                                                                <div key={`result-${indicatorIndex}-${resultIndex}`}>
                                                                                    {index + 1}.{indicatorIndex + 1}.{resultIndex + 1} {result.label}
                                                                                    <DeleteIcon className={classes.deleteIndicatorIcon}
                                                                                                onClick={this.deleteResult(workProgram.value, competence.value, indicator.value, result.value)}
                                                                                    />
                                                                                </div>
                                                                            ))
                                                                        }
                                                                        <div className={classes.smallButton} onClick={this.handleOpenAddResultsModal(workProgram.value, competence.value, indicator.value)}><AddIcon/> Связать результат</div>
                                                                    </TableCell>
                                                                    {indicatorIndex === 0 ?
                                                                        <TableCell rowSpan={competence[BlocksOfWorkProgramsFields.INDICATORS].length}>
                                                                            <div className={classes.competenceButtons}>
                                                                                <DeleteIcon className={classes.iconButton} onClick={this.deleteCompetence(workProgram.value, competence.value, competence.zunId, workProgram.value)} />
                                                                                <SaveIcon className={classes.iconButton}
                                                                                          onClick={this.saveToBeCompetence(workProgram.value, competence, workProgram.id)}
                                                                                />
                                                                            </div>
                                                                        </TableCell>
                                                                        : <></>
                                                                    }
                                                                </TableRow>
                                                            )
                                                        })}
                                                        <TableRow>
                                                            <TableCell colSpan={4}>
                                                                <div className={classes.smallButton}
                                                                     onClick={this.handleOpenAddCompetenceModal(workProgram.value)}
                                                                ><AddIcon/> Добавить компетенцию</div>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    )}
                                    {get(blockOfWorkPrograms, [BlocksOfWorkProgramsFields.WORK_PROGRAMS, 'length'], 0) === 0 ?
                                        <Typography> Рабочих программ пока не добавлено</Typography>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </Scrollbars>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button onClick={this.handleClose}
                                variant="text">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
                <AddWorkProgramModal closeDialog={this.handleCloseAddWorkProgramModal}
                                     isOpen={isAddWorkProgramModalOpen}
                                     saveDialog={this.saveWorkProgramList}
                />
                <AddCompetenceModal closeDialog={this.handleCloseAddCompetenceModal}
                                    isOpen={Boolean(isAddCompetenceModalOpen)}
                                    saveDialog={this.saveCompetence}
                />
                <AddIndicatorsModal closeDialog={this.handleCloseAddIndicatorsModal}
                                    isOpen={Boolean(isAddIndicatorsModalOpen)}
                                    saveDialog={this.saveIndicators}
                                    competenceId={get(isAddIndicatorsModalOpen, 'competenceId', 0)}
                />
                <AddResultsModal closeDialog={this.handleCloseAddResultsModal}
                                 isOpen={Boolean(isAddResultsModalOpen)}
                                 saveDialog={this.saveResults}
                                 workProgramId={get(isAddResultsModalOpen, 'workProgramId', 0)}
                />
            </>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(CreateModal));
