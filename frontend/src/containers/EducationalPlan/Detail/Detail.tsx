import React from 'react';
import get from 'lodash/get';
import {appRouter} from "../../../service/router-service";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

import {OPTIONALLY} from "../data";

import connect from './Detail.connect';
import styles from './Detail.styles';
import {fields, TrainingModuleFields} from "../TrainingModules/enum";
import FileIcon from '@material-ui/icons/DescriptionOutlined';
import classNames from "classnames";
import {selectRulesArray, typesListArray} from "../TrainingModules/constants";
import {UserType} from "../../../layout/types";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import UserSelector from "../../Profile/UserSelector/UserSelector";

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
    addEditorsMode: false,
    tab: "1",
  }

  componentDidMount() {
    const planId = this.getPlanId();

    this.props.actions.setIsTrajectoryRoute(this.props.trajectoryRoute);

    this.props.actions.getEducationalDetail(planId);
  }

  componentWillUnmount() {
    this.props.actions.pageDown();
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
          const semesterStart = blockOfWorkProgram?.[BlocksOfWorkProgramsFields.SEMESTER_START]?.join(', ');
          const allCreditUnits = workPrograms?.[0]?.ze_v_sem;
          const creditUnits = allCreditUnits?.replaceAll(', ', '')?.replace(/0*$/,"")?.replace(/^0+/, '')?.split("")?.join(" ")
          const type = blockOfWorkProgram[BlocksOfWorkProgramsFields.TYPE]

          const renderRow = (title: any) => (
            <TableRow key={blockOfWorkProgram[BlocksOfWorkProgramsFields.ID]}>
              <TableCell>
                <div style={{ paddingLeft: (level + 1) * 5 }}>
                  {title}
                </div>
              </TableCell>
              <TableCell style={{width: '190px'}}>
                {creditUnits}
              </TableCell>
              <TableCell>
                {semesterStart}
              </TableCell>
              <TableCell>
                {type === OPTIONALLY ? '-' : '+'}
              </TableCell>
              <TableCell />
            </TableRow>
          )

          return (
            <>
              {Boolean(workPrograms?.length) && renderRow(workPrograms.map((workProgram: any) =>
                <div className={classes.displayFlex}>
                  <Typography className={classes.link}
                              onClick={this.goToWorkProgramPage(workProgram[WorkProgramGeneralFields.ID])}>
                    {workProgram[WorkProgramGeneralFields.TITLE]}
                  </Typography>
                  <div className={classes.wpStatus}>{this.getStatus(workProgram.wp_status)}</div>
                  <Tooltip
                    title={'Скачать рабочую программу'}>
                    <FileIcon
                      className={classNames(classes.marginRight10, classes.button)}
                      onClick={this.handleDownloadFile(workProgram[WorkProgramGeneralFields.ID])}
                    />
                  </Tooltip>
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
    const selectionRule = selectRulesArray.find(type => type.value === item?.selection_rule)?.label
    const selectionParameter = item?.selection_parametr
    const laboriousness = item?.laboriousness

    return(
      <>
        <TableRow>
          <TableCell style={{ height: '40px'}} className={classes.moduleNameWrap}>
            <Typography className={classes.moduleName} style={{ paddingLeft: level * 5 }}>
              {'*'.repeat(level)}
              <Link to={appRouter.getTrainingModuleDetailLink(item.id)} target="_blank" className={classes.link}>
                {item?.name}
              </Link>:
            </Typography>
            <Typography>
              {laboriousness ? <>&nbsp;<b>Трудоемкость:</b> {laboriousness}</> : ''}
              {selectionRule ? <>&nbsp;<b>Правило выбора:</b> {selectionRule}</> : ''}
              {selectionParameter ? <>&nbsp;<b>Параметр выбора:</b> {selectionParameter}</> : ''}
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

  renderEducationPlan = () => {
    const {classes, blocks, detailPlan, trajectoryRoute, user, direction} = this.props;
    const {deleteBlockConfirmId, deleteModuleConfirmId, deletedWorkProgramsLength, selectSpecializationData} = this.state;
    const canEdit = detailPlan[EducationalPlanFields.CAN_EDIT];

    return (
      <>
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
                  <TableCell> Зачетные единицы </TableCell>
                  <TableCell> Семестр начала </TableCell>
                  <TableCell> Обязательность </TableCell>
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
      </>
    );
  }

  handleDeletingEditor = (userId: number) => () =>  {
    const {detailPlan} = this.props;
    const plan = get(detailPlan, 'academic_plan_in_field_of_study[0]', {})
    const editors = plan?.[EducationalPlanFields.EDITORS]
    const newEditorIds = editors?.map((editor: UserType) => editor.id)
      .filter((editorId: number) => editorId !== userId);

    this.props.actions.changeEditorsEducationalPlan({
      [EducationalPlanFields.ID]: plan[EducationalPlanFields.ID],
      [EducationalPlanFields.EDITORS]: newEditorIds,
    });
  }

  handleAddingEditor = (userId: number) => {
    const {detailPlan} = this.props;

    const plan = get(detailPlan, 'academic_plan_in_field_of_study[0]', {})
    const editors = plan?.[EducationalPlanFields.EDITORS]
    const newEditorIds = editors.map((editor: UserType) => editor.id).concat(userId);

    this.props.actions.changeEditorsEducationalPlan({
      [EducationalPlanFields.ID]: plan?.[EducationalPlanFields.ID],
      [EducationalPlanFields.EDITORS]: newEditorIds,
    });

    this.setState({
      addEditorsMode: false
    });
  }

  renderMain = () => {
    const {classes, detailPlan} = this.props;

    //@ts-ignore
    const isuId = detailPlan?.ap_isu_id

    const plan = get(detailPlan, 'academic_plan_in_field_of_study[0]', {})
    const editors = plan?.[EducationalPlanFields.EDITORS]

    const {addEditorsMode} = this.state;
    const canEdit = detailPlan?.[EducationalPlanFields.CAN_EDIT];

    return (
      <>
        <div className={classes.editors}>
          <Typography className={classes.editorsTitle}>
            Редакторы:
          </Typography>

          {editors?.map((editor: UserType) =>
            <Chip
              key={editor.id}
              label={getUserFullName(editor)}
              onDelete={canEdit ? this.handleDeletingEditor(editor.id) : undefined}
              className={classes.editorsItem}
            />
          )}
          {editors?.length === 0 && <Typography>ни одного редактора не добавлено</Typography>}

          {canEdit && (
            <Button
              onClick={() => this.setState({addEditorsMode: true})}
              variant="outlined"
              className={classes.editorsAdd}
              size="small"
            >
              <AddIcon/> Добавить редактора
            </Button>
          )}
        </div>

        {plan?.[EducationalPlanFields.YEAR] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Направление:</b> {plan?.[EducationalPlanFields.FIELD_OF_STUDY]?.[0]?.title}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.YEAR] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>ОП:</b> {plan?.[EducationalPlanFields.TITLE]}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.NUMBER] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Номер:</b> {plan?.[EducationalPlanFields.NUMBER]}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.YEAR] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Год набора:</b> {plan?.[EducationalPlanFields.YEAR]}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.QUALIFICATION] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Квалификация:</b> {specializationObject[plan?.[EducationalPlanFields.QUALIFICATION]]}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.TRAINING_PERIOD] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Срок обучения в годах:</b> {plan?.[EducationalPlanFields.TRAINING_PERIOD]}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.TOTAL_INTENSITY] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Количество зачетных единиц:</b> {plan?.[EducationalPlanFields.TOTAL_INTENSITY]}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.PLAN_TYPE] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Тип плана:</b> {plan?.[EducationalPlanFields.PLAN_TYPE] === 'base' ? 'Базовый' : 'Индивидуальный'}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.STRUCTURAL_UNIT] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Структурное подразделение:</b> {plan?.[EducationalPlanFields?.STRUCTURAL_UNIT]?.title}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.UNIVERSITY_PARTNER] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>ВУЗ партнер:</b> {plan?.[EducationalPlanFields.UNIVERSITY_PARTNER]?.map((item: any) => item.title)?.join(', ')}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.MILITARY_DEPARTMENT] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Военная кафедра:</b> {plan?.[EducationalPlanFields.MILITARY_DEPARTMENT] ? 'есть' : 'нету'}
          </Typography>
        ) : null }

        {isuId ? (
          <Typography className={classes.trajectoryOwner}>
            <b>ИСУ ИД:</b> {isuId}
          </Typography>
        ) : null }

        {addEditorsMode && (
          <Dialog
            open
            fullWidth
            maxWidth="sm"
            classes={{
              paper: classes.dialog,
            }}
            onClose={() => this.setState({addEditorsMode: false})}
          >
            <UserSelector
              handleChange={this.handleAddingEditor}
              selectorLabel="Выберите редактора"
              label="Выберите редактора"
              noMargin
            />
          </Dialog>
        )}
      </>
    )
  }

  render() {
    const {classes, blocks, detailPlan, trajectoryRoute, user, direction} = this.props;
    const {deleteBlockConfirmId, deleteModuleConfirmId, deletedWorkProgramsLength, selectSpecializationData} = this.state;
    const canEdit = detailPlan[EducationalPlanFields.CAN_EDIT];

    const {tab} = this.state

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

          <div className={classes.likeIcon}>
            <LikeButton onClick={this.handleClickLike}
                        isLiked={Boolean(detailPlan[EducationalPlanFields.ID_RATING])}
            />
          </div>
        </div>

        <Tabs value={tab} onChange={(e, value) => this.setState({tab: value})}>
          <Tab value="1" label="Главная" />
          <Tab value="2" label="Учебный план" />
        </Tabs>

        {tab === '1' ? this.renderMain() : this.renderEducationPlan()}
      </Paper>
    );
  }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(EducationalPlan)));
