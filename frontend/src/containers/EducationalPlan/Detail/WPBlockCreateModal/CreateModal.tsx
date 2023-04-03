import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";
import classNames from "classnames";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars-2";

import {CreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {withStyles} from '@mui/styles';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
// import ExpansionPanel from '@mui/material/ExpansionPanel';
// import ExpansionPanelDetails from '@mui/material/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@mui/material/ExpansionPanelSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import Tooltip from "@mui/material/Tooltip";

import AddWorkProgramModal from "./AddWorkProgramModal";
import {OPTIONALLY as optionalTypeOfWorkProgram, typeOfWorkProgramInPlan} from '../../data';

import {BlocksOfWorkProgramsFields, ModuleFields} from '../../enum';
import {WorkProgramGeneralType} from "../../../WorkProgram/types";
import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";

import AddCompetenceModal from "../../../../components/AddCompetenceModal";
import AddIndicatorsModal from "../../../../components/AddIndicatorsModal";
import AddPracticeModal from "../../../Practice/components/AddPracticeModal";
import AddGiaModal from "../../../FinalCertification/components/AddGiaModal";
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
            [BlocksOfWorkProgramsFields.SEMESTER_START]: [],
            [BlocksOfWorkProgramsFields.SEMESTER_DURATION]: '',
        },
        gia: [],
        practice: [],
        showWorkProgramSelector: false,
        showAddWorkProgramButton: true,
        isAddWorkProgramModalOpen: false,
        isAddCompetenceModalOpen: false,
        isAddResultsModalOpen: false,
        isAddIndicatorsModalOpen: false,
        isAddGiaModalOpen: false,
        isAddPracticeModalOpen: false,
        expandedWorkProgram: null,
    };

    componentDidMount() {
        this.props.workProgramActions.getWorkProgramList();
    }

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {blockOfWorkPrograms} = this.props;

        if (!shallowEqualObjects(blockOfWorkPrograms, prevProps.blockOfWorkPrograms)){
            const workProgram = get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.WORK_PROGRAMS) || [];
            const gia = get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.GIA) || [];
            const practice = get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.PRACTICE) || [];

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

            this.setState({
                blockOfWorkPrograms: {
                    [BlocksOfWorkProgramsFields.ID]: get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.ID),
                    [BlocksOfWorkProgramsFields.TYPE]: get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.TYPE, ''),
                    [BlocksOfWorkProgramsFields.SEMESTER_START]: get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.SEMESTER_START, ''),
                    [BlocksOfWorkProgramsFields.SEMESTER_DURATION]: get(blockOfWorkPrograms, BlocksOfWorkProgramsFields.SEMESTER_DURATION, ''),
                    [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: mappedWorkProgram,
                },
                module: {
                    [ModuleFields.ID]: get(blockOfWorkPrograms, 'moduleId'),
                },
                gia,
                practice,
            });
        }
    }

    handleOpenAddWorkProgramModal = () => {
        this.setState({isAddWorkProgramModalOpen: true});
    }

    handleOpenAddGiaModal = () => {
        this.setState({isAddGiaModalOpen: true});
    }

    handleOpenAddPracticeModal = () => {
        this.setState({isAddPracticeModalOpen: true});
    }

    handleCloseAddWorkProgramModal = () => {
        this.setState({isAddWorkProgramModalOpen: false});
    }

    handleCloseAddGiaModal = () => {
        this.setState({isAddGiaModalOpen: false});
    }

    handleCloseAddPracticeModal = () => {
        this.setState({isAddPracticeModalOpen: false});
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
        const {blockOfWorkPrograms, gia, practice} = this.state

        const rpdLength = get(blockOfWorkPrograms, [BlocksOfWorkProgramsFields.WORK_PROGRAMS, 'length'], 0)

        if (rpdLength === 0 && gia.length === 0 && practice.length === 0) {
            this.props.actions.deleteBlockOfWorkPrograms(blockOfWorkPrograms?.[BlocksOfWorkProgramsFields.ID])
        }

        this.props.actions.closeDetailDialog();

        if (planId){
            this.props.actions.getEducationalDetail(planId);
        } else {
            //@ts-ignore
            this.props.moduleActions.getTrainingModule(moduleId);
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

    savePracticeList = (value: string, label: string) => {
        const {blockOfWorkPrograms, practice} = this.state
        if (value === '') return;

        this.props.actions.changeBlockOfWorkPrograms({
            ...blockOfWorkPrograms,
            practice: [
              ...practice.map((item: any) => item.id),
              value
            ]
        });

        this.setState({
            practice: [
                ...practice,
                {
                    id: value,
                    title: label.split('(')?.[0]
                }
            ]
        })
    }

    saveGiaList = (value: string, label: string) => {
        const {blockOfWorkPrograms, gia} = this.state

        if (value === '') return;
        this.props.actions.changeBlockOfWorkPrograms({
            ...blockOfWorkPrograms,
            gia: [
                ...gia.map((item: any) => item.id),
                value
            ]
        });

        this.setState({
            gia: [
                ...gia,
                {
                    id: value,
                    title: label.split('(')?.[0]
                }
            ]
        })
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
            competence: competence,
            wpChangeBlockId: wpChangeBlockId,
        })
    }

    changeSelectedStartSemester = (item: number) => () => {
        const { blockOfWorkPrograms } = this.state
        const startSemester: Array<number> = blockOfWorkPrograms[BlocksOfWorkProgramsFields.SEMESTER_START]
        const newStartSemester = startSemester.includes(item) ?
            startSemester.filter(startItem => item === startItem) :
            [...startSemester, item]

        this.props.actions.changeBlockOfWorkPrograms({
            [BlocksOfWorkProgramsFields.SEMESTER_START]: newStartSemester,
            [BlocksOfWorkProgramsFields.ID]: blockOfWorkPrograms[BlocksOfWorkProgramsFields.ID],
        });

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.SEMESTER_START]: newStartSemester,
            }
        })
    }

    changeDuration = (e: any) => {
        const { blockOfWorkPrograms } = this.state

        this.props.actions.changeBlockOfWorkPrograms({
            [BlocksOfWorkProgramsFields.SEMESTER_DURATION]: e.target.value,
            [BlocksOfWorkProgramsFields.ID]: blockOfWorkPrograms[BlocksOfWorkProgramsFields.ID],
        });
    }

    changeStateDuration = (e: any) => {
        const { blockOfWorkPrograms } = this.state

        this.setState({
            blockOfWorkPrograms: {
                ...blockOfWorkPrograms,
                [BlocksOfWorkProgramsFields.SEMESTER_DURATION]: e.target.value,
            }
        })
    }

    handleRemoveGia = () => {
        const {blockOfWorkPrograms} = this.state

        this.props.actions.changeBlockOfWorkPrograms({
            ...blockOfWorkPrograms,
            gia: []
        });

        this.setState({
            gia: []
        })
    }

    handleRemovePractice = () => {
        const {blockOfWorkPrograms} = this.state

        this.props.actions.changeBlockOfWorkPrograms({
            ...blockOfWorkPrograms,
            practice: []
        });

        this.setState({
            practice: []
        })
    }

    renderGia = () => {
        const {classes} = this.props
        const {gia} = this.state
        return (
          <div>
              {gia.map((item: any) => (
                <Typography className={classes.workProgramItem}>
                    {item.title} <DeleteIcon onClick={this.handleRemoveGia}/>
                </Typography>
              ))}
          </div>
        )
    }

    renderPractice = () => {
        const {classes} = this.props
        const {practice} = this.state
        return (
          <div>
              {practice.map((item: any) => (
                <Typography className={classes.workProgramItem}>
                    {item.title} <DeleteIcon onClick={this.handleRemovePractice}/>
                </Typography>
              ))}
          </div>
        )
    }

    render() {
        const {isOpen, classes, disableZUN, canAddGia, canAddPractice, canAddWp} = this.props;
        const {blockOfWorkPrograms, showAddWorkProgramButton, isAddWorkProgramModalOpen,
            isAddCompetenceModalOpen, isAddIndicatorsModalOpen, expandedWorkProgram, isAddResultsModalOpen,
          isAddGiaModalOpen, isAddPracticeModalOpen, gia, practice,
        } = this.state;
        const wpLength = get(blockOfWorkPrograms, [BlocksOfWorkProgramsFields.WORK_PROGRAMS, 'length'], 0)

        const startSemester: Array<number> = this.state.blockOfWorkPrograms[BlocksOfWorkProgramsFields.SEMESTER_START]

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

                            {/*<TextField label="Длительность изучения"*/}
                            {/*           onBlur={this.changeDuration}*/}
                            {/*           onChange={this.changeStateDuration}*/}
                            {/*           variant="outlined"*/}
                            {/*           className={classes.smallInput}*/}
                            {/*           fullWidth*/}
                            {/*           value={blockOfWorkPrograms[BlocksOfWorkProgramsFields.SEMESTER_DURATION]}*/}
                            {/*           InputLabelProps={{*/}
                            {/*               shrink: true,*/}
                            {/*           }}*/}
                            {/*           type="number"*/}
                            {/*/>*/}

                            <div className={classes.semesterBlock}>
                                <Typography className={classes.label}> Выберите семеcтры, в которых может начаться дисциплина </Typography>
                                <div className={classes.semesterList}>
                                    {Array(8).fill(0).map((item, index) =>
                                        <Button
                                            key={'start-semester' + index}
                                            variant={startSemester.includes(index + 1) ? 'contained' : "outlined"}
                                            onClick={this.changeSelectedStartSemester(index + 1)}
                                        >
                                            {index + 1}
                                        </Button>
                                    )}
                                </div>
                            </div>


                            {/*<div className={classes.addWorkProgramButtonWrap}>*/}
                                {showAddWorkProgramButton && canAddWp && wpLength === 0 && gia.length === 0 && practice.length === 0 &&
                                <Button size="small"
                                        onClick={this.handleOpenAddWorkProgramModal}
                                        className={classes.addWorkProgramButton}
                                        variant="text"
                                ><AddIcon/> Добавить дисциплину</Button>
                                } <br/>
                                {showAddWorkProgramButton && canAddGia && gia.length === 0 && !wpLength && practice.length === 0 &&
                                <Button size="small"
                                        onClick={this.handleOpenAddGiaModal}
                                        className={classes.addWorkProgramButton}
                                        variant="text"
                                ><AddIcon/> Добавить ГИА</Button>
                                } <br/>
                                {showAddWorkProgramButton && canAddPractice && practice.length === 0 && gia.length === 0 && !wpLength &&
                                <Button size="small"
                                        onClick={this.handleOpenAddPracticeModal}
                                        className={classes.addWorkProgramButton}
                                        variant="text"
                                ><AddIcon/> Добавить практику</Button>
                                } <br/>
                            {/*</div>*/}
                        </div>

                        <Scrollbars>
                            <div className={classes.rightSide}>
                                <div className={classes.workProgramBlock}>
                                    {!disableZUN &&
                                        <Typography className={classes.label}>
                                            Настройка связей рабочих программ, компетенций, индикаторов и результатов
                                        </Typography>
                                    }
                                    {this.renderGia()}
                                    {this.renderPractice()}
                                    {/*{blockOfWorkPrograms[BlocksOfWorkProgramsFields.WORK_PROGRAMS].map((workProgram: any, wpIndex) =>*/}
                                    {/*    <ExpansionPanel expanded={disableZUN ? false : expandedWorkProgram === wpIndex}*/}
                                    {/*                    onChange={this.handleChangeExpandedWorkProgram(wpIndex)}*/}
                                    {/*                    key={wpIndex}*/}
                                    {/*    >*/}
                                    {/*        <ExpansionPanelSummary*/}
                                    {/*            expandIcon={disableZUN ? <></> : <ExpandMoreIcon />}*/}
                                    {/*            aria-controls="panel1bh-content"*/}
                                    {/*            id="panel1bh-header"*/}
                                    {/*        >*/}
                                    {/*            <Typography className={classes.workProgramItem}>{workProgram.label} <DeleteIcon onClick={this.handleRemoveWorkProgram(workProgram.value, workProgram.id)}/></Typography>*/}
                                    {/*        </ExpansionPanelSummary>*/}
                                    {/*        <ExpansionPanelDetails>*/}
                                    {/*            <Table>*/}
                                    {/*                <TableHead>*/}
                                    {/*                    <TableRow>*/}
                                    {/*                        <TableCell>Код компетенции</TableCell>*/}
                                    {/*                        <TableCell>Код индикаторов</TableCell>*/}
                                    {/*                        <TableCell>Результаты обучения</TableCell>*/}
                                    {/*                        <TableCell />*/}
                                    {/*                    </TableRow>*/}
                                    {/*                </TableHead>*/}
                                    {/*                <TableBody>*/}
                                    {/*                    {workProgram[BlocksOfWorkProgramsFields.COMPETENCES] &&*/}
                                    {/*                    workProgram[BlocksOfWorkProgramsFields.COMPETENCES].map((competence: any, index: number) => {*/}

                                    {/*                        if (competence[BlocksOfWorkProgramsFields.INDICATORS].length === 0){*/}
                                    {/*                            return <TableRow key={'indicator' + index}>*/}
                                    {/*                                <TableCell className={classes.competenceCell}>{index + 1}. {competence.label}</TableCell>*/}
                                    {/*                                <TableCell>*/}
                                    {/*                                    <div className={classes.smallButton}*/}
                                    {/*                                         onClick={this.handleOpenAddIndicatorsModal(workProgram.value, competence.value)}*/}
                                    {/*                                    >*/}
                                    {/*                                        <AddIcon/> Добавить индикатор*/}
                                    {/*                                    </div>*/}
                                    {/*                                </TableCell>*/}
                                    {/*                                <TableCell />*/}
                                    {/*                                <TableCell>*/}
                                    {/*                                    <div className={classes.competenceButtons}>*/}
                                    {/*                                        <DeleteIcon className={classes.iconButton}*/}
                                    {/*                                                    onClick={this.deleteCompetence(workProgram.value, competence.value, competence.zunId, workProgram.id)}*/}
                                    {/*                                        />*/}
                                    {/*                                        <Tooltip title="Добавьте индикатор, чтобы сохранить"*/}
                                    {/*                                                 classes={{popper: classes.tooltip}}*/}
                                    {/*                                        >*/}
                                    {/*                                            <SaveIcon className={classNames(classes.iconButton, classes.disableIcon)} />*/}
                                    {/*                                        </Tooltip>*/}
                                    {/*                                    </div>*/}
                                    {/*                                </TableCell>*/}
                                    {/*                            </TableRow>*/}
                                    {/*                        }*/}
                                    {/*                        return competence[BlocksOfWorkProgramsFields.INDICATORS].map((indicator: any, indicatorIndex: number) =>*/}
                                    {/*                            <TableRow key={`indicator-${indicatorIndex}`}>*/}
                                    {/*                                {indicatorIndex === 0 ?*/}
                                    {/*                                    <TableCell*/}
                                    {/*                                        className={classes.competenceCell}*/}
                                    {/*                                        rowSpan={competence[BlocksOfWorkProgramsFields.INDICATORS].length}>*/}
                                    {/*                                        {index + 1}. {competence.label}*/}
                                    {/*                                    </TableCell>*/}
                                    {/*                                    : <></>*/}
                                    {/*                                }*/}
                                    {/*                                <TableCell>*/}
                                    {/*                                    {index + 1}.{indicatorIndex + 1} {indicator.label}*/}
                                    {/*                                    <DeleteIcon className={classes.deleteIndicatorIcon}*/}
                                    {/*                                                onClick={this.deleteIndicator(workProgram.value, competence.value, indicator.value)}*/}
                                    {/*                                    />*/}
                                    {/*                                    {indicatorIndex === competence[BlocksOfWorkProgramsFields.INDICATORS].length - 1 ?*/}
                                    {/*                                        <div className={classes.smallButton}*/}
                                    {/*                                             onClick={this.handleOpenAddIndicatorsModal(workProgram.value, competence.value)}*/}
                                    {/*                                             style={{margin: '20px 0px 0px'}}*/}
                                    {/*                                        >*/}
                                    {/*                                            <AddIcon/> Добавить индикатор*/}
                                    {/*                                        </div>*/}
                                    {/*                                    :*/}
                                    {/*                                        <></>*/}
                                    {/*                                    }*/}
                                    {/*                                </TableCell>*/}
                                    {/*                                <TableCell className={classes.resultsCell}>*/}
                                    {/*                                    {indicator[BlocksOfWorkProgramsFields.RESULTS].map((result: any, resultIndex: number) => (*/}
                                    {/*                                            <div key={`result-${indicatorIndex}-${resultIndex}`}>*/}
                                    {/*                                                {index + 1}.{indicatorIndex + 1}.{resultIndex + 1} {result.label}*/}
                                    {/*                                                <DeleteIcon className={classes.deleteIndicatorIcon}*/}
                                    {/*                                                            onClick={this.deleteResult(workProgram.value, competence.value, indicator.value, result.value)}*/}
                                    {/*                                                />*/}
                                    {/*                                            </div>*/}
                                    {/*                                        ))*/}
                                    {/*                                    }*/}
                                    {/*                                    <div className={classes.smallButton} onClick={this.handleOpenAddResultsModal(workProgram.value, competence.value, indicator.value)}><AddIcon/> Связать результат</div>*/}
                                    {/*                                </TableCell>*/}
                                    {/*                                {indicatorIndex === 0 ?*/}
                                    {/*                                    <TableCell rowSpan={competence[BlocksOfWorkProgramsFields.INDICATORS].length}>*/}
                                    {/*                                        <div className={classes.competenceButtons}>*/}
                                    {/*                                            <DeleteIcon className={classes.iconButton} onClick={this.deleteCompetence(workProgram.value, competence.value, competence.zunId, workProgram.value)} />*/}
                                    {/*                                            <SaveIcon className={classes.iconButton}*/}
                                    {/*                                                      onClick={this.saveToBeCompetence(workProgram.value, competence, workProgram.id)}*/}
                                    {/*                                            />*/}
                                    {/*                                        </div>*/}
                                    {/*                                    </TableCell>*/}
                                    {/*                                    : <></>*/}
                                    {/*                                }*/}
                                    {/*                            </TableRow>*/}
                                    {/*                        )*/}
                                    {/*                    })}*/}
                                    {/*                    <TableRow>*/}
                                    {/*                        <TableCell colSpan={4}>*/}
                                    {/*                            <div className={classes.smallButton}*/}
                                    {/*                                 onClick={this.handleOpenAddCompetenceModal(workProgram.value)}*/}
                                    {/*                            ><AddIcon/> Добавить компетенцию</div>*/}
                                    {/*                        </TableCell>*/}
                                    {/*                    </TableRow>*/}
                                    {/*                </TableBody>*/}
                                    {/*            </Table>*/}
                                    {/*        </ExpansionPanelDetails>*/}
                                    {/*    </ExpansionPanel>*/}
                                    {/*)}*/}
                                    {get(blockOfWorkPrograms, [BlocksOfWorkProgramsFields.WORK_PROGRAMS, 'length'], 0) === 0 && gia.length === 0 && practice.length === 0 ?
                                        <Typography> Рабочих программ, ГИА или практик пока не добавлено</Typography>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </Scrollbars>
                    </DialogContent>
                    <DialogActions className={classes.actions}>`
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
                <AddPracticeModal closeDialog={this.handleCloseAddPracticeModal}
                                  isOpen={isAddPracticeModalOpen}
                                  saveDialog={this.savePracticeList}
                />
                <AddGiaModal closeDialog={this.handleCloseAddGiaModal}
                             isOpen={isAddGiaModalOpen}
                             saveDialog={this.saveGiaList}
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
