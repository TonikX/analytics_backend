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

import {BlocksOfWorkProgramsType, EducationalPlanType} from '../types';
import {EducationalPlanDetailProps} from './types';

import {EducationalPlanBlockFields, ModuleFields, BlocksOfWorkProgramsFields} from "../enum";
import {WorkProgramGeneralFields} from "../../WorkProgram/enum";

import {typeOfWorkProgramInPlan} from "../data";

import connect from './Detail.connect';
import styles from './Detail.styles';

class EducationalPlan extends React.Component<EducationalPlanDetailProps> {
    state = {
        deleteConfirmId: null,
        anchorEl: null
    }

    componentDidMount() {
        const workProgramId = get(this, 'props.match.params.id');

        this.props.actions.getEducationalDetail(workProgramId);
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteBlockOfWorkPrograms(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (plan: EducationalPlanType) => () => {
        this.props.actions.openDialog(plan);
    }

    handleOpenDetailModal = (block: BlocksOfWorkProgramsType|{}, moduleId: number) => () => {
        this.props.actions.openDetailDialog({
            ...block,
            moduleId: moduleId
        });
    }

    handleChangePlan = () => {
        const {detailPlan} = this.props;

        this.props.actions.openDialog(detailPlan);
    }

    render() {
        const {classes, blocks} = this.props;
        const {deleteConfirmId} = this.state;

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
                                                    <Typography>{block[EducationalPlanBlockFields.NAME]}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            {block[EducationalPlanBlockFields.MODULES].map(module => {
                                                return (
                                                    <>
                                                        <TableRow>
                                                            <TableCell colSpan={13}>
                                                                <div className={classes.rowModule}>
                                                                    {module[ModuleFields.NAME]}
                                                                    <AddCircleIcon className={classes.addProgramIcon}
                                                                                   color="primary"
                                                                                   onClick={this.handleOpenDetailModal({}, module[ModuleFields.ID])}
                                                                    />
                                                                </div>
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

                                                                <TableCell className={classes.moduleWorkProgramWrapActions}>
                                                                    <IconButton onClick={this.handleClickDelete(blockOfWorkProgram[BlocksOfWorkProgramsFields.ID])}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={this.handleOpenDetailModal(blockOfWorkProgram, module[ModuleFields.ID])}>
                                                                        <EditIcon />
                                                                    </IconButton>
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

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить блок?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить блок'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(EducationalPlan));
