import React from 'react';
import get from 'lodash/get';
// @ts-ignore
import Scrollbars from "react-custom-scrollbars";

import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";

import ConfirmDialog from "../../../components/ConfirmDialog";
import CreateModal from "./CreateModal";
import ChangePlanModal from '../CreateModal';

import {BlocksOfWorkProgramsType, EducationalPlanType, ModuleType} from '../types';
import {EducationalPlanDetailProps} from './types';

import {EducationalPlanBlockFields, ModuleFields, BlocksOfWorkProgramsFields} from "../enum";
import {WorkProgramGeneralFields} from "../../WorkProgram/enum";

import {typeOfWorkProgramInPlan} from "../data";

import connect from './Detail.connect';
import styles from './Detail.styles';
import Tooltip from "@material-ui/core/Tooltip";
import ModuleModal from "./ModuleModal";

class EducationalPlan extends React.Component<EducationalPlanDetailProps> {
    state = {
        deleteBlockConfirmId: null,
        deleteModuleConfirmId: null,
    }

    componentDidMount() {
        const workProgramId = get(this, 'props.match.params.id');

        this.props.actions.getEducationalDetail(workProgramId);
    }

    handleClickBlockDelete = (id: number) => () => {
        this.setState({
            deleteBlockConfirmId: id
        });
    }

    handleConfirmBlockDeleteDialog = () => {
        const {deleteBlockConfirmId} = this.state;

        this.props.actions.deleteBlockOfWorkPrograms(deleteBlockConfirmId);
        this.closeConfirmDeleteDialog();
    }

    handleConfirmModuleDeleteDialog = () => {
        const {deleteModuleConfirmId} = this.state;

        this.props.actions.deleteModule(deleteModuleConfirmId);

        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteBlockConfirmId: null,
            deleteModuleConfirmId: null,
        });
    }
    
    handleClickDeleteModule = (id: number) => () => {
        this.setState({
            deleteModuleConfirmId: id
        });
    }

    handleClickEdit = (plan: EducationalPlanType) => () => {
        this.props.actions.openDialog(plan);
    }

    handleOpenDetailModal = (block: BlocksOfWorkProgramsType|{}, moduleId: number) => () => {
        this.props.actions.openDetailDialog({
            ...block,
            moduleId
        });
    }

    handleOpenCreateModuleModal = (module: ModuleType|{}, blockId: number) => () => {
        this.props.actions.openModuleDialog({
            ...module,
            blockId
        });
    }

    handleChangePlan = () => {
        const {detailPlan} = this.props;

        this.props.actions.openDialog(detailPlan);
    }

    render() {
        const {classes, blocks} = this.props;
        const {deleteBlockConfirmId, deleteModuleConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Учебный план
                </Typography>


                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table size='small' className={classes.table}>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell rowSpan={2}>
                                        Название
                                    </TableCell>
                                    <TableCell colSpan={10} className={classes.headerTextHoursCount}>
                                        Количество часов в семестрах
                                    </TableCell>
                                    <TableCell rowSpan={2}> Тип </TableCell>
                                    <TableCell rowSpan={2}/>
                                </TableRow>

                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>3</TableCell>
                                    <TableCell>4</TableCell>
                                    <TableCell>5</TableCell>
                                    <TableCell>6</TableCell>
                                    <TableCell>7</TableCell>
                                    <TableCell>8</TableCell>
                                    <TableCell>9</TableCell>
                                    <TableCell>10</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blocks.map(block => {
                                    return (
                                        <>
                                            <TableRow className={classes.blockRow}>
                                                <TableCell colSpan={13}>
                                                    <Typography>
                                                        <div className={classes.rowBlock}>
                                                            {block[EducationalPlanBlockFields.NAME]}
                                                            <Tooltip title="Создать модуль в данном блоке">
                                                                <AddCircleIcon className={classes.smallAddIcon}
                                                                               onClick={this.handleOpenCreateModuleModal({}, block[EducationalPlanBlockFields.ID])}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            {block[EducationalPlanBlockFields.MODULES].map(module => {
                                                return (
                                                    <>
                                                        <TableRow>
                                                            <TableCell colSpan={12}>
                                                                <div className={classes.rowModule}>
                                                                    {module[ModuleFields.NAME]}
                                                                    <Tooltip title="Создать блок рабочих программ">
                                                                        <AddCircleIcon className={classes.smallAddIcon}
                                                                                       color="primary"
                                                                                       onClick={this.handleOpenDetailModal({}, module[ModuleFields.ID])}
                                                                        />
                                                                    </Tooltip>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className={classes.actions}>
                                                                <Tooltip title="Удалить модуль">
                                                                    <IconButton onClick={this.handleClickDeleteModule(module[ModuleFields.ID])}>
                                                                        <DeleteIcon color="primary" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Изменить модуль">
                                                                    <IconButton onClick={this.handleOpenCreateModuleModal(module, block[EducationalPlanBlockFields.ID])}>
                                                                        <EditIcon color="primary" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>

                                                        {module[ModuleFields.BLOCKS_OF_WORK_PROGRAMS].map(blockOfWorkProgram => {
                                                            const semesterHours = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.SEMESTER_HOUR);

                                                            const mappedSemesterHours = semesterHours && semesterHours.split ? semesterHours.split(',') : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                                                            return <TableRow>
                                                                <TableCell>
                                                                    {blockOfWorkProgram[BlocksOfWorkProgramsFields.WORK_PROGRAMS].map(workProgram =>
                                                                        <Typography>
                                                                            {workProgram[WorkProgramGeneralFields.TITLE]}
                                                                        </Typography>
                                                                    )}
                                                                </TableCell>
                                                                {mappedSemesterHours.map((semesterHour: string) =>
                                                                    <TableCell> {semesterHour} </TableCell>
                                                                )}
                                                                <TableCell>
                                                                    {get(typeOfWorkProgramInPlan.find(item =>
                                                                        item.value === blockOfWorkProgram[BlocksOfWorkProgramsFields.TYPE]
                                                                    ), 'label', '')}
                                                                </TableCell>

                                                                <TableCell className={classes.actions}>
                                                                    <Tooltip title="Удалить блок рабочих программ">
                                                                        <IconButton onClick={this.handleClickBlockDelete(blockOfWorkProgram[BlocksOfWorkProgramsFields.ID])}>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="Изменить блок рабочих программ">
                                                                        <IconButton onClick={this.handleOpenDetailModal(blockOfWorkProgram, module[ModuleFields.ID])}>
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            </TableRow>;
                                                        })}
                                                    </>
                                                )
                                            })}
                                        </>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>

                <div className={classes.footer}>
                    <Fab color="secondary"
                         classes={{
                             root: classes.addIcon
                         }}
                         onClick={this.handleChangePlan}
                    >
                        <EditIcon />
                    </Fab>
                </div>

                <CreateModal />
                <ChangePlanModal />
                <ModuleModal />

                <ConfirmDialog onConfirm={this.handleConfirmModuleDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить модуль?'}
                               isOpen={Boolean(deleteModuleConfirmId)}
                               dialogTitle={'Удалить модуль'}
                               confirmButtonText={'Удалить'}
                />
                <ConfirmDialog onConfirm={this.handleConfirmBlockDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить блок?'}
                               isOpen={Boolean(deleteBlockConfirmId)}
                               dialogTitle={'Удалить блок'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(EducationalPlan));
