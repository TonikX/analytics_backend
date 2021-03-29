import React from 'react';
import get from 'lodash/get';
import {appRouter} from "../../../service/router-service";
import {withRouter} from "react-router-dom";
import classNames from "classnames";
// @ts-ignore
import Scrollbars from "react-custom-scrollbars";

import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";

import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import FileIcon from '@material-ui/icons/DescriptionOutlined';
import AttachIcon from '@material-ui/icons/AttachFileOutlined';

import LikeButton from "../../../components/LikeButton/LikeButton";
import ConfirmDialog from "../../../components/ConfirmDialog";

import WPBlockCreateModal from "./WPBlockCreateModal";
import ChangePlanModal from '../CreateModal';
import ModuleModal from "./ModuleModal";
import DownloadFileModal from "./DownloadFileModal";
import AddModuleModal from "./AddModuleModal";

import {BlocksOfWorkProgramsType, EducationalPlanType, ModuleType} from '../types';
import {EducationalPlanDetailProps} from './types';

import {
    EducationalPlanBlockFields,
    ModuleFields,
    BlocksOfWorkProgramsFields,
    EducationalPlanFields,
    DownloadFileModalFields
} from "../enum";
import {FavoriteType} from "../../Profile/Folders/enum";
import {WorkProgramGeneralFields} from "../../WorkProgram/enum";
import {specializationObject} from "../../WorkProgram/constants";

import {typeOfWorkProgramInPlan} from "../data";

import connect from './Detail.connect';
import styles from './Detail.styles';
import {getUserFullName} from "../../../common/utils";
import {DirectionFields} from "../../Direction/enum";

class EducationalPlan extends React.Component<EducationalPlanDetailProps> {
    state = {
        deleteBlockConfirmId: null,
        deleteModuleConfirmId: null,
        deletedWorkProgramsLength: 0,
    }

    componentDidMount() {
        const planId = get(this, 'props.match.params.id');

        this.props.actions.setIsTrajectoryRoute(this.props.trajectoryRoute);

        this.props.actions.getEducationalDetail(planId);
    }

    handleClickBlockDelete = (id: number, length: number) => () => {
        this.setState({
            deleteBlockConfirmId: id,
            deletedWorkProgramsLength: length
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
            deletedWorkProgramsLength: 0,
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

    handleCreateBlockOfWorkPrograms = (moduleId: number) => () => {
        this.props.actions.createBlockOfWorkPrograms(moduleId);
    }

    handleOpenCreateModuleModal = (module: ModuleType|{}, blockId: number) => () => {
        this.props.actions.openCreateModuleDialog({
            ...module,
            blockId
        });
    }

    handleOpenAddModuleModal = (blockId: number) => () => {
        this.props.actions.openAddModuleDialog({
            blockId
        });
    }

    handleChangePlan = () => {
        const {detailPlan} = this.props;

        this.props.actions.openDialog(detailPlan);
    }

    goToWorkProgramPage = (id: number) => () => {
        // @ts-ignore
        const {history} = this.props;

        history.push(appRouter.getWorkProgramLink(id));
    }

    handleDownloadFile = (workProgramId: number) => () => {
        const {detailPlan} = this.props;

        this.props.actions.openDownloadModal({
            [DownloadFileModalFields.ACADEMIC_PLAN_ID]: detailPlan[EducationalPlanFields.ID],
            [DownloadFileModalFields.ID]: workProgramId,
        });

        this.props.actions.getDirectionsDependedOnWorkProgram(workProgramId);
    }

    handleClickLike = () => {
        const {detailPlan, trajectoryRoute} = this.props;

        if (detailPlan[EducationalPlanFields.ID_RATING]){
            this.props.foldersActions.removeFromFolder({
                id: detailPlan[EducationalPlanFields.ID_RATING],
                callback: this.props.actions.getEducationalDetail,
                type: trajectoryRoute ? FavoriteType.TRAJECTORY_PLAN : FavoriteType.ACADEMIC_PLAN,
                relationId: detailPlan[EducationalPlanFields.ID]
            });
        } else {
            this.props.foldersActions.openAddToFolderDialog({
                relationId: detailPlan[EducationalPlanFields.ID],
                type: trajectoryRoute ? FavoriteType.TRAJECTORY_PLAN : FavoriteType.ACADEMIC_PLAN,
                callback: this.props.actions.getEducationalDetail
            });
        }
    }

    render() {
        const {classes, blocks, detailPlan, trajectoryRoute, user, direction} = this.props;
        const {deleteBlockConfirmId, deleteModuleConfirmId, deletedWorkProgramsLength} = this.state;
        const canEdit = detailPlan[EducationalPlanFields.CAN_EDIT];

        return (
            <Paper className={classes.root}>
                <div className={classes.title}>
                    <Typography> Учебный план </Typography>
                    {get(detailPlan[EducationalPlanFields.PROFILE], 'length', 0) ?
                        <Typography>:&nbsp;{detailPlan[EducationalPlanFields.PROFILE]} / {specializationObject[detailPlan[EducationalPlanFields.QUALIFICATION]]} / {detailPlan[EducationalPlanFields.YEAR]}</Typography>
                        :
                        <></>
                    }
                    {canEdit &&
                        <Tooltip title="Изменить учебный план">
                            <EditIcon className={classes.titleIcon} color="primary" onClick={this.handleChangePlan}/>
                        </Tooltip>
                    }
                    <div className={classes.likeIcon}>
                        <LikeButton onClick={this.handleClickLike}
                                    isLiked={Boolean(detailPlan[EducationalPlanFields.ID_RATING])}
                        />
                    </div>
                </div>

                {trajectoryRoute && <Typography className={classes.trajectoryOwner}>
                    <b>Направление:</b> {direction[DirectionFields.EDUCATIONAL_PROFILE]} {direction[DirectionFields.NUMBER]} {direction[DirectionFields.FACULTY]}
                </Typography>}
                {trajectoryRoute && <Typography className={classes.trajectoryOwner}>
                    <b>Владелец траектории:</b> {getUserFullName(user)}
                </Typography>}

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell rowSpan={2}>
                                        Название
                                    </TableCell>
                                    <TableCell colSpan={10} className={classes.headerTextHoursCount}>
                                        Количество зачетных единиц в семестрах
                                    </TableCell>
                                    <TableCell rowSpan={2}> Тип </TableCell>
                                    {canEdit && <TableCell rowSpan={2}/>}
                                </TableRow>

                                <TableRow>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">1</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">2</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">3</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">4</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">5</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">6</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">7</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">8</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">9</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">10</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blocks.map(block => {
                                    return (
                                        <>
                                            <TableRow className={classes.blockRow} key={'block' + block[EducationalPlanBlockFields.ID]}>
                                                <TableCell colSpan={13}>
                                                    <div className={classes.rowBlock}>
                                                        {block[EducationalPlanBlockFields.NAME]}
                                                        {canEdit &&
                                                            <Tooltip title="Создать модуль в данном блоке">
                                                                <AddCircleIcon className={classes.smallAddIcon}
                                                                               onClick={this.handleOpenCreateModuleModal({}, block[EducationalPlanBlockFields.ID])}
                                                                />
                                                            </Tooltip>
                                                        }
                                                        {canEdit &&
                                                            <Tooltip title="Добавить модуль в данный блок">
                                                                <AttachIcon className={classes.smallAddIcon}
                                                                               onClick={this.handleOpenAddModuleModal(block[EducationalPlanBlockFields.ID])}
                                                                />
                                                            </Tooltip>
                                                        }
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            {block[EducationalPlanBlockFields.MODULES].map(module => {
                                                return (
                                                    <>
                                                        <TableRow key={'module' + module[ModuleFields.ID]}>
                                                            <TableCell colSpan={12}>
                                                                <div className={classes.rowModule}>
                                                                    {module[ModuleFields.NAME]}
                                                                    {canEdit &&
                                                                        <Tooltip title="Создать блок рабочих программ">
                                                                            <AddCircleIcon className={classes.smallAddIcon}
                                                                                           color="primary"
                                                                                           onClick={this.handleCreateBlockOfWorkPrograms(module[ModuleFields.ID])}
                                                                            />
                                                                        </Tooltip>
                                                                    }
                                                                </div>
                                                            </TableCell>
                                                            {canEdit &&
                                                                <TableCell className={classes.actions}>
                                                                    <Tooltip title="Удалить модуль">
                                                                        <DeleteIcon className={classes.marginRight10}
                                                                                    color="primary"
                                                                                    onClick={this.handleClickDeleteModule(module[ModuleFields.ID])}
                                                                        />
                                                                    </Tooltip>

                                                                    <Tooltip title="Изменить модуль">
                                                                        <EditIcon color="primary"
                                                                                  onClick={this.handleOpenCreateModuleModal(module, block[EducationalPlanBlockFields.ID])}/>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            }
                                                        </TableRow>

                                                        {module[ModuleFields.BLOCKS_OF_WORK_PROGRAMS].map((blockOfWorkProgram, index) => {
                                                            const semesterHours = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.SEMESTER_UNIT);
                                                            const workPrograms = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.WORK_PROGRAMS);

                                                            const mappedSemesterHours = semesterHours && semesterHours.split ? semesterHours.split(',') : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                                            const semesterHour = mappedSemesterHours.slice(0, 10);

                                                            return <TableRow key={`blockOfWorkProgram-${index}-${module[ModuleFields.ID]}`}>
                                                                <TableCell>
                                                                    {workPrograms && workPrograms.map && workPrograms.map(workProgram =>
                                                                        <div className={classes.displayFlex} key={'wp' + workProgram[WorkProgramGeneralFields.ID]}>
                                                                            <Typography className={classes.workProgramLink}
                                                                                        onClick={this.goToWorkProgramPage(workProgram[WorkProgramGeneralFields.ID])}>
                                                                                {workProgram[WorkProgramGeneralFields.TITLE]}
                                                                            </Typography>
                                                                            <Tooltip title={'Скачать рабочую программу'}>
                                                                                <FileIcon className={classNames(classes.marginRight10, classes.button)}
                                                                                    onClick={this.handleDownloadFile(workProgram[WorkProgramGeneralFields.ID])}
                                                                                />
                                                                            </Tooltip>
                                                                        </div>
                                                                    )}
                                                                </TableCell>
                                                                {semesterHour.map((semesterHour: string, index: number) =>
                                                                    <TableCell key={'hour' + index} align="center" className={classes.hourCell} > {semesterHour} </TableCell>
                                                                )}
                                                                <TableCell>
                                                                    {get(typeOfWorkProgramInPlan.find(item =>
                                                                        item.value === blockOfWorkProgram[BlocksOfWorkProgramsFields.TYPE]
                                                                    ), 'label', '')}
                                                                </TableCell>

                                                                {canEdit &&
                                                                    <TableCell className={classes.actions}>
                                                                        <Tooltip
                                                                            title={`Удалить ${get(workPrograms, 'length', 0) > 1 ? 'комплект рабочих программ' : 'рабочую программу'}`}>
                                                                            <DeleteIcon className={classes.marginRight10}
                                                                                        onClick={this.handleClickBlockDelete(blockOfWorkProgram[BlocksOfWorkProgramsFields.ID], get(workPrograms, 'length', 0))}
                                                                            />
                                                                        </Tooltip>
                                                                        <Tooltip
                                                                            title={`Изменить ${get(workPrograms, 'length', 0) > 1 ? 'комплект рабочих программ' : 'рабочую программу'}`}>
                                                                            <EditIcon
                                                                                onClick={this.handleOpenDetailModal(blockOfWorkProgram, module[ModuleFields.ID])}/>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                }
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

                <WPBlockCreateModal />
                <ChangePlanModal />
                <ModuleModal />
                <DownloadFileModal />
                <AddModuleModal />

                <ConfirmDialog onConfirm={this.handleConfirmModuleDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить модуль?'}
                               isOpen={Boolean(deleteModuleConfirmId)}
                               dialogTitle={'Удалить модуль'}
                               confirmButtonText={'Удалить'}
                />
                <ConfirmDialog onConfirm={this.handleConfirmBlockDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={`Вы точно уверены, что хотите ${deletedWorkProgramsLength > 1 ? 'комлект рабочих программ' : 'рабочую программу'}?`}
                               isOpen={Boolean(deleteBlockConfirmId)}
                               dialogTitle={`Удалить ${deletedWorkProgramsLength > 1 ? 'комлект рабочих программ' : 'рабочую программу'}`}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(EducationalPlan)));
