import React from 'react';
import get from 'lodash/get';
import {appRouter} from "../../../service/router-service";
import {withRouter, Link} from "react-router-dom";
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
import {getUserFullName} from "../../../common/utils";
import {DirectionFields} from "../../Direction/enum";
import OptionalWorkProgramBlock from "./OptionalWorkProgramsBlock";

import {WorkProgramGeneralFields} from "../../WorkProgram/enum";
import {specializationObject} from "../../WorkProgram/constants";

import {FACULTATIV, OPTIONALLY, SET_SPECIALIZATION, typeOfWorkProgramInPlan} from "../data";

import connect from './Detail.connect';
import styles from './Detail.styles';
import FacultativeBlockModule from "./FacultativeBlockModule";
import Button from "@material-ui/core/Button";

class EducationalPlan extends React.Component<EducationalPlanDetailProps> {
    state = {
        deleteBlockConfirmId: null,
        deleteModuleConfirmId: null,
        selectSpecializationData: {
            blockId: null,
            id: null,
            title: null
        },
        deletedWorkProgramsLength: 0,
    }

    componentDidMount() {
        const planId = this.getPlanId();

        this.props.actions.setIsTrajectoryRoute(this.props.trajectoryRoute);

        this.props.actions.getEducationalDetail(planId);
    }

    getPlanId = () => get(this, 'props.match.params.id');

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

    handleConfirmSelectSpecialization = () => {
        const {selectSpecializationData} = this.state;

        this.props.actions.planTrajectorySelectSpecialization({
            id: selectSpecializationData.id,
            blockId: selectSpecializationData.blockId,
            planId: this.getPlanId()
        });

        this.closeSelectSpecializationConfirmModal();
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

    showSelectSpecializationConfirmModal = (title: string, id: number, blockId: number) => () => {
        this.setState({
            selectSpecializationData: {
                blockId,
                title,
                id
            }
        });
    }

    closeSelectSpecializationConfirmModal = () => {
        this.setState({
            selectSpecializationData: {
                blockId: null,
                id: null,
                title: null
            }
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
                relationId: this.getPlanId()
            });
        } else {
            this.props.foldersActions.openAddToFolderDialog({
                relationId: this.getPlanId(),
                type: trajectoryRoute ? FavoriteType.TRAJECTORY_PLAN : FavoriteType.ACADEMIC_PLAN,
                callback: this.props.actions.getEducationalDetail
            });
        }
    }

    saveOptionalProgram = (moduleId: number, workProgram: number) => {
        this.props.actions.planTrajectorySelectOptionalWp({
            moduleId,
            workProgram,
            planId: this.getPlanId()
        });
    }

    saveElectivesProgram = (moduleId: number, workPrograms: any) => {
        this.props.actions.planTrajectorySelectElectives({workPrograms, moduleId, planId: this.getPlanId()});
    }

    validate = () => {
        this.props.actions.validateAcademicPlan(this.getPlanId());
    }

    render() {
        const {classes, blocks, detailPlan, trajectoryRoute, user, direction} = this.props;
        const {deleteBlockConfirmId, deleteModuleConfirmId, deletedWorkProgramsLength, selectSpecializationData} = this.state;
        const canEdit = detailPlan[EducationalPlanFields.CAN_EDIT];

        return (
            <Paper className={classes.root}>
                <div className={classes.title}>
                    <Typography>
                        Учебный план: {get(detailPlan, 'academic_plan_in_field_of_study[0].title', '')}&nbsp;
                        {get(detailPlan, 'academic_plan_in_field_of_study[0].field_of_study', []).map((item: any) =>
                            <>({specializationObject[get(item, 'qualification', '')]} / {get(item, 'title', '')} ({get(item, 'number', '')}))&nbsp;</>
                        )}
                    </Typography>

                    {/*{canEdit &&*/}
                    {/*    <Tooltip title="Изменить учебный план">*/}
                    {/*        <EditIcon className={classes.titleIcon} color="primary" onClick={this.handleChangePlan}/>*/}
                    {/*    </Tooltip>*/}
                    {/*}*/}
                    <Button variant="contained"
                            color="primary" onClick={this.validate}>
                        Отправить на валидацию
                    </Button>
                    <Tooltip title={(
                        <>
                            1. Пропущен обязательный блок <br/>
                            2. Пропущен обязательный модуль в блоке <br/>
                            3. Отсутствуют дисциплины в модуле <br/>
                            4. Количество з.е. не достигает рекомендованного минимума <br/>
                            5. Недостаточное количество дисциплин в модуле <br/>
                            6. Недостаточное количество з. е. в модуле <br/>
                        </>
                    )}>
                        <Button variant="contained" style={{marginLeft: 'auto'}} color="primary">Валидация</Button>
                    </Tooltip>
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
                                                const showSelectSpecializationButton = get(module, [ModuleFields.BLOCKS_OF_WORK_PROGRAMS, 0, BlocksOfWorkProgramsFields.TYPE]) === SET_SPECIALIZATION && trajectoryRoute;
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
                                                                    {showSelectSpecializationButton &&
                                                                        <Button
                                                                          variant="outlined"
                                                                          onClick={this.showSelectSpecializationConfirmModal(module[ModuleFields.NAME], module[ModuleFields.ID], block[EducationalPlanBlockFields.ID])}
                                                                          style={{marginLeft: '5px'}}
                                                                        >
                                                                          Выбрать специализацию
                                                                        </Button>
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

                                                        {get(module, [ModuleFields.BLOCKS_OF_WORK_PROGRAMS, 0, BlocksOfWorkProgramsFields.TYPE]) === FACULTATIV && trajectoryRoute ?
                                                            <FacultativeBlockModule blocks={module}
                                                                                    saveWorkPrograms={this.saveElectivesProgram}
                                                                                    handleDownloadFile={this.handleDownloadFile}
                                                            />
                                                            :
                                                            <>
                                                                {module[ModuleFields.BLOCKS_OF_WORK_PROGRAMS].map((blockOfWorkProgram, index) => {
                                                                    const blockType = blockOfWorkProgram[BlocksOfWorkProgramsFields.TYPE];
                                                                    const moduleId = module[ModuleFields.ID];
                                                                    const workPrograms = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.WORK_PROGRAMS);

                                                                    if (trajectoryRoute && workPrograms?.length > 1 && blockType === OPTIONALLY) {
                                                                        return <OptionalWorkProgramBlock
                                                                            module={blockOfWorkProgram}
                                                                            key={`blockOfWorkProgram-${index}-${moduleId}`}
                                                                            handleDownloadFile={this.handleDownloadFile}
                                                                            isMultiSelect={false}
                                                                            saveWorkPrograms={this.saveOptionalProgram}
                                                                        />;
                                                                    }

                                                                    const semesterHours = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.SEMESTER_UNIT);

                                                                    const mappedSemesterHours = semesterHours && semesterHours.split ? semesterHours.split(',') : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                                                    const semesterHour = mappedSemesterHours.slice(0, 10);

                                                                    return <TableRow
                                                                        key={`blockOfWorkProgram-${index}-${moduleId}`}>
                                                                        <TableCell>
                                                                            {workPrograms && workPrograms.map && workPrograms.map(workProgram =>
                                                                                <div className={classes.displayFlex}
                                                                                     key={'wp' + workProgram[WorkProgramGeneralFields.ID]}>
                                                                                    <div className={classes.displayFlex}>
                                                                                        <Link to={appRouter.getWorkProgramLink(workProgram[WorkProgramGeneralFields.ID])}
                                                                                              className={classes.workProgramLink}
                                                                                              target="_blank"
                                                                                        >
                                                                                            {workProgram[WorkProgramGeneralFields.TITLE]}
                                                                                        </Link>
                                                                                    </div>
                                                                                    <Tooltip
                                                                                        title={'Скачать рабочую программу'}>
                                                                                        <FileIcon
                                                                                            className={classNames(classes.marginRight10, classes.button)}
                                                                                            onClick={this.handleDownloadFile(workProgram[WorkProgramGeneralFields.ID])}
                                                                                        />
                                                                                    </Tooltip>
                                                                                </div>
                                                                            )}
                                                                        </TableCell>
                                                                        {semesterHour.map((semesterHour: string, index: number) =>
                                                                            <TableCell key={'hour' + index}
                                                                                       align="center"
                                                                                       className={classes.hourCell}> {semesterHour} </TableCell>
                                                                        )}
                                                                        <TableCell>
                                                                            {get(typeOfWorkProgramInPlan.find(item =>
                                                                                item.value === blockType
                                                                            ), 'label', '')}
                                                                        </TableCell>

                                                                        {canEdit &&
                                                                        <TableCell className={classes.actions}>
                                                                          <Tooltip
                                                                            title={`Удалить ${get(workPrograms, 'length', 0) > 1 ? 'комплект рабочих программ' : 'рабочую программу'}`}>
                                                                            <DeleteIcon
                                                                              className={classes.marginRight10}
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
                                                        }
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

                {!trajectoryRoute &&
                    <>
                      <WPBlockCreateModal />
                      <ChangePlanModal />
                      <ModuleModal />
                      <AddModuleModal />
                    </>
                }
                <DownloadFileModal />

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
                <ConfirmDialog onConfirm={this.handleConfirmSelectSpecialization}
                               onDismiss={this.closeSelectSpecializationConfirmModal}
                               confirmText={`Вы точно уверены, что хотите выбрать специализацию ${selectSpecializationData.title}?`}
                               isOpen={Boolean(selectSpecializationData.id)}
                               dialogTitle={'Выбрать специализацию'}
                               confirmButtonText={'Выбрать специализацию'}
                />
            </Paper>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(EducationalPlan)));
