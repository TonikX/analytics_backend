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
import Paper from "@material-ui/core/Paper";
// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

import AddWorkProgramModal from "./AddWorkProgramModal";
import {typeOfWorkProgramInPlan, OPTIONALLY as optionalTypeOfWorkProgram} from '../../data';

import {BlocksOfWorkProgramsFields, ModuleFields} from '../../enum';
import {WorkProgramGeneralType} from "../../../WorkProgram/types";
import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";
import AddCompetenceModal from "./AddCompetenceModal";
import AddIndicatorsModal from "./AddIndicatorsModal";

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
                        label: workProgram ? workProgram.label : '',
                    }
                ]
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

    deleteCompetence = (workProgramId: number, competenceId: number) => () => {
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
                                    ...indicators
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

    handleChangeExpandedWorkProgram = (wpId: number) => () => {
        this.setState({expandedWorkProgram: wpId});
    }

    render() {
        const {isOpen, classes} = this.props;
        const {blockOfWorkPrograms, showAddWorkProgramButton, isAddWorkProgramModalOpen,
            isAddCompetenceModalOpen, isAddIndicatorsModalOpen, expandedWorkProgram
        } = this.state;

        const canAddMoreWorkProgram = get(blockOfWorkPrograms, [BlocksOfWorkProgramsFields.WORK_PROGRAMS, 'length'], 0) === 0 ||
            blockOfWorkPrograms[BlocksOfWorkProgramsFields.TYPE] === optionalTypeOfWorkProgram;

        const disableButton = get(blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS], 'length', 0) === 0 ||
            get(blockOfWorkPrograms[BlocksOfWorkProgramsFields.TYPE], 'length', 0) === 0;

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
                                                   value={item}
                                                   onChange={this.handleChangeHours(index)}
                                                   type="number"
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
                                    <Typography className={classes.label}> Рабочие программы </Typography>
                                    {/*{blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS].map((workProgram: any, wpIndex) =>*/}
                                    {/*    <Accordion expanded={expandedWorkProgram === wpIndex} onChange={this.handleChangeExpandedWorkProgram(wpIndex)}>*/}
                                    {/*        <AccordionSummary*/}
                                    {/*            expandIcon={<ExpandMoreIcon />}*/}
                                    {/*            aria-controls="panel1bh-content"*/}
                                    {/*            id="panel1bh-header"*/}
                                    {/*        >*/}
                                    {/*            <Typography className={classes.workProgramItem}>{workProgram.label} <DeleteIcon onClick={this.handleRemoveWorkProgram(workProgram.value)}/></Typography>*/}
                                    {/*        </AccordionSummary>*/}
                                    {/*        <AccordionDetails>*/}
                                    {/*            <Table>*/}
                                    {/*                <TableHead>*/}
                                    {/*                    <TableRow>*/}
                                    {/*                        <TableCell>Код компетенции</TableCell>*/}
                                    {/*                        <TableCell>Код индикаторов</TableCell>*/}
                                    {/*                        <TableCell>Результаты обучения</TableCell>*/}
                                    {/*                    </TableRow>*/}
                                    {/*                </TableHead>*/}
                                    {/*                <TableBody>*/}
                                    {/*                    {workProgram[BlocksOfWorkProgramsFields.COMPETENCES] &&*/}
                                    {/*                    workProgram[BlocksOfWorkProgramsFields.COMPETENCES].map((competence: any, index: number) => {*/}
                                    {/*                        return <TableRow key={`competence-${wpIndex}-${index}`}>*/}
                                    {/*                            <TableCell>{index + 1}. {competence.label} <DeleteIcon className={classes.deleteIcon} onClick={this.deleteCompetence(workProgram.value, competence.value)}/></TableCell>*/}
                                    {/*                            <TableCell>*/}
                                    {/*                                {competence[BlocksOfWorkProgramsFields.INDICATORS].map((indicator: any, indicatorIndex: number) =>*/}
                                    {/*                                    <div className={classes.indicatorItem} key={`indicator-${wpIndex}-${index}-${indicatorIndex}`}>*/}
                                    {/*                                        {index + 1}.{indicatorIndex + 1} {indicator.label}*/}
                                    {/*                                        <DeleteIcon className={classes.deleteIcon}*/}
                                    {/*                                                    onClick={this.deleteIndicator(workProgram.value, competence.value, indicator.value)}*/}
                                    {/*                                        />*/}
                                    {/*                                    </div>*/}
                                    {/*                                )}*/}

                                    {/*                                <div className={classes.smallButton}*/}
                                    {/*                                     onClick={this.handleOpenAddIndicatorsModal(workProgram.value, competence.value)}*/}
                                    {/*                                ><AddIcon/> Добавить индикатор</div>*/}
                                    {/*                            </TableCell>*/}
                                    {/*                            <TableCell>Результаты</TableCell>*/}
                                    {/*                        </TableRow>*/}
                                    {/*                    })}*/}
                                    {/*                    <TableRow>*/}
                                    {/*                        <TableCell>*/}
                                    {/*                            <div className={classes.smallButton}*/}
                                    {/*                                 onClick={this.handleOpenAddCompetenceModal(workProgram.value)}*/}
                                    {/*                            ><AddIcon/> Добавить компетенцию</div>*/}
                                    {/*                        </TableCell>*/}
                                    {/*                        <TableCell />*/}
                                    {/*                        <TableCell>*/}
                                    {/*                            <div className={classes.smallButton}><AddIcon/> Добавить результат</div>*/}
                                    {/*                        </TableCell>*/}
                                    {/*                    </TableRow>*/}
                                    {/*                </TableBody>*/}
                                    {/*            </Table>*/}
                                    {/*        </AccordionDetails>*/}
                                    {/*    </Accordion>*/}
                                    {/*)}*/}

                                    {blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS].map((workProgram: any, wpIndex) =>{
                                        return <Paper className={classes.workProgramBlockItem}>
                                            <Typography className={classes.workProgramItem}>{workProgram.label} <DeleteIcon onClick={this.handleRemoveWorkProgram(workProgram.value)}/> </Typography>

                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Код компетенции</TableCell>
                                                        <TableCell>Код индикаторов</TableCell>
                                                        <TableCell>Результаты обучения</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {workProgram[BlocksOfWorkProgramsFields.COMPETENCES] &&
                                                        workProgram[BlocksOfWorkProgramsFields.COMPETENCES].map((competence: any, index: number) => {
                                                        return <TableRow key={`competence-${wpIndex}-${index}`}>
                                                            <TableCell style={{maxWidth: '500px'}}>{index + 1}. {competence.label} <DeleteIcon className={classes.deleteIcon} onClick={this.deleteCompetence(workProgram.value, competence.value)}/></TableCell>
                                                            <TableCell>
                                                                {competence[BlocksOfWorkProgramsFields.INDICATORS].map((indicator: any, indicatorIndex: number) =>
                                                                    <div className={classes.indicatorItem} key={`indicator-${wpIndex}-${index}-${indicatorIndex}`}>
                                                                        {index + 1}.{indicatorIndex + 1} {indicator.label}
                                                                        <DeleteIcon className={classes.deleteIcon}
                                                                                    onClick={this.deleteIndicator(workProgram.value, competence.value, indicator.value)}
                                                                        />
                                                                    </div>
                                                                )}

                                                                <div className={classes.smallButton}
                                                                     onClick={this.handleOpenAddIndicatorsModal(workProgram.value, competence.value)}
                                                                ><AddIcon/> Добавить индикатор</div>
                                                            </TableCell>
                                                            <TableCell>Результаты</TableCell>
                                                        </TableRow>
                                                    })}
                                                    <TableRow>
                                                        <TableCell>
                                                            <div className={classes.smallButton}
                                                                 onClick={this.handleOpenAddCompetenceModal(workProgram.value)}
                                                            ><AddIcon/> Добавить компетенцию</div>
                                                        </TableCell>
                                                        <TableCell />
                                                        <TableCell>
                                                            {/*<div className={classes.smallButton}><AddIcon/> Добавить результат</div>*/}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Paper>;
                                    })}
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
            </>
        );
    }
}

export default connect(withStyles(styles)(CreateModal));
