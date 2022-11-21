import React from 'react';
import get from 'lodash/get';
import {appRouter} from "../../../service/router-service";
import {withRouter} from "react-router-dom";

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
import AttachIcon from '@material-ui/icons/AttachFileOutlined';

import LikeButton from "../../../components/LikeButton/LikeButton";
import ConfirmDialog from "../../../components/ConfirmDialog";

import WPBlockCreateModal from "./WPBlockCreateModal";
import ChangePlanModal from '../CreateModal';
import ModuleModal from "./ModuleModal";
import DownloadFileModal from "./DownloadFileModal";
import AddTrainingModuleModal from "../TrainingModules/AddTrainingModuleModal";

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

import {WorkProgramGeneralFields} from "../../WorkProgram/enum";
import {specializationObject} from "../../WorkProgram/constants";

import {typeOfWorkProgramInPlan} from "../data";

import connect from './Detail.connect';
import styles from './Detail.styles';
import {fields} from "../TrainingModules/enum";

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

    handleOpenCreateModuleModal = (module: ModuleType|{}, blockId: number) => () => {
        this.props.actions.openCreateModuleDialog({
            ...module,
            blockId
        });
    }

    handleOpenAddModuleModal = (blockId: number) => () => {
        this.props.trainingModulesActions.openDialog({
            data: {
                moduleId: blockId,
            },
            dialog: fields.ADD_TRAINING_MODULE_DIALOG
        });
    }

    goToWorkProgramPage = (id: number) => () => {
        // @ts-ignore
        const {history} = this.props;

        history.push(appRouter.getWorkProgramLink(id));
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

    getStatus = (statusCode: string) => {
        switch (statusCode) {
            case 'WK':
                return 'В работе';
            case 'EX':
                return 'На экспертизе';
            case 'AC':
                return 'Одобрено';
            case 'AR':
                return 'Архив';
            case 'RE':
                return 'На доработке';
            default:
                return '';
        }
    };
    renderBlockOfWP = (blockOfWorkPrograms: any, level: number) => {
        const {classes} = this.props

        return (
          <>
              {blockOfWorkPrograms?.map((blockOfWorkProgram: any) => {
                  const workPrograms = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.WORK_PROGRAMS);
                  const gia = blockOfWorkProgram?.gia || [];
                  const practice = blockOfWorkProgram?.practice || [];
                  const duration = blockOfWorkProgram?.[BlocksOfWorkProgramsFields.SEMESTER_DURATION];
                  const semesterStart = blockOfWorkProgram?.[BlocksOfWorkProgramsFields.SEMESTER_START]?.join(', ');

                  const renderRow = (title: any) => (
                    <TableRow key={blockOfWorkProgram[BlocksOfWorkProgramsFields.ID]}>
                        <TableCell>
                            <div style={{ paddingLeft: (level + 1) * 5 }}>
                                {title}
                            </div>
                        </TableCell>
                        <TableCell>
                            {duration}
                        </TableCell>
                        <TableCell>
                            {semesterStart}
                        </TableCell>
                        <TableCell>
                            {get(typeOfWorkProgramInPlan.find(item =>
                              item.value === blockOfWorkProgram[BlocksOfWorkProgramsFields.TYPE]
                            ), 'label', '')}
                        </TableCell>
                        <TableCell />
                    </TableRow>
                  )

                  return (
                    <>
                        {renderRow(workPrograms.map((workProgram: any) =>
                          <div className={classes.displayFlex}>
                              <Typography className={classes.workProgramLink}
                                          onClick={this.goToWorkProgramPage(workProgram[WorkProgramGeneralFields.ID])}>
                                  {workProgram[WorkProgramGeneralFields.TITLE]}
                              </Typography>
                          </div>
                        ))}
                        {Boolean(gia?.length) && renderRow(<>
                            {gia?.map((item: any) => item?.title).join(', ')} (ГИА)
                        </>)}
                        {Boolean(practice?.length) && renderRow(<>
                            {practice?.map((item: any) => item?.title).join(', ')} (практика)
                        </>)}
                    </>
                  )
              })}
          </>
        )
    }

    renderModule = (item: any, level: number, blockId?: any): any => {
        const {classes} = this.props
        const blockOfWorkPrograms = item?.change_blocks_of_work_programs_in_modules

        return(
          <>
              <TableRow>
                  <TableCell style={{ height: '40px'}} className={classes.moduleNameWrap}>
                      <Typography className={classes.moduleName} style={{ paddingLeft: level * 5 }}>
                          {'*'.repeat(level)}
                          {item?.name}
                      </Typography>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell>
                      {level === 0 ? (
                        <Tooltip title="Удалить модуль">
                            <DeleteIcon className={classes.marginRight10}
                                        color="primary"
                                        onClick={this.handleDisconnectModule(item[ModuleFields.ID], blockId)}
                                        style={{cursor: "pointer"}}
                            />
                        </Tooltip>
                      ) : ''}
                  </TableCell>
              </TableRow>
              {this.renderBlockOfWP(blockOfWorkPrograms, level)}
              {item?.childs?.map((child: any) => (
                this.renderModule(child, level + 1)
              ))}
          </>
        )
    }

    handleConnectModules = (modules: Array<number>, fatherId: number) => {
        this.props.actions.educationalPlanConnectModules({
            modules,
            blockId: fatherId,
        })
    }

    handleDisconnectModule = (module: number, blockId: number) => () => {
        this.props.actions.educationalPlanDisconnectModule({
            module,
            blockId,
        })
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
                            <>
                                ({specializationObject[get(item, 'qualification', '')]} / {get(item, 'title', '')} ({get(item, 'number', '')}))&nbsp;
                            </>
                        )}
                        - {get(detailPlan, 'academic_plan_in_field_of_study[0].year', '')}
                    </Typography>

                    {/*{canEdit &&*/}
                    {/*    <Tooltip title="Изменить учебный план">*/}
                    {/*        <EditIcon className={classes.titleIcon} color="primary" onClick={this.handleChangePlan}/>*/}
                    {/*    </Tooltip>*/}
                    {/*}*/}
                    {/*<Tooltip title={(*/}
                    {/*    <>*/}
                    {/*        1. Пропущен обязательный блок <br/>*/}
                    {/*        2. Пропущен обязательный модуль в блоке <br/>*/}
                    {/*        3. Отсутствуют дисциплины в модуле <br/>*/}
                    {/*        4. Количество з.е. не достигает рекомендованного минимума <br/>*/}
                    {/*        5. Недостаточное количество дисциплин в модуле <br/>*/}
                    {/*        6. Недостаточное количество з. е. в модуле <br/>*/}
                    {/*    </>*/}
                    {/*)}>*/}
                    {/*    <Button variant="contained" style={{marginLeft: 'auto'}} color="primary">Валидация</Button>*/}
                    {/*</Tooltip>*/}
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
                                    <TableCell> Название </TableCell>
                                    <TableCell> Тип </TableCell>
                                    <TableCell> Длительность </TableCell>
                                    <TableCell> Семестр начала </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blocks.map(block => {
                                    const module: any = block[EducationalPlanBlockFields.MODULES]
                                    const programs: any = module?.change_blocks_of_work_programs_in_modules
                                    return (
                                        <>
                                            <TableRow className={classes.blockRow} key={'block' + block[EducationalPlanBlockFields.ID]}>
                                                <TableCell colSpan={5}>
                                                    <div className={classes.rowBlock}>
                                                        {block[EducationalPlanBlockFields.NAME]}
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

                                            {module?.map((item: any) => this.renderModule(item, 0, block?.id))}
                                            {this.renderBlockOfWP(programs, -1)}
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
                      <AddTrainingModuleModal onSave={this.handleConnectModules} />
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
