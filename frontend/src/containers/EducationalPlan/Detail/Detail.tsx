// @ts-nocheck
import React from 'react';
import get from 'lodash/get';
import {appRouter} from "../../../service/router-service";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// @ts-ignore
import Scrollbars from "react-custom-scrollbars-2";

import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import {withStyles} from '@mui/styles';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AttachIcon from '@mui/icons-material/AttachFileOutlined';
import WarningIcon from '@mui/icons-material/WarningRounded';

import ConfirmDialog from "../../../components/ConfirmDialog";

import WPBlockCreateModal from "./WPBlockCreateModal";
import ChangePlanModal from '../CreateModal';
import ModuleModal from "./ModuleModal";
import DownloadFileModal from "./DownloadFileModal";
import AddTrainingModuleModal from "../TrainingModules/AddTrainingModuleModal";
import {withRouter} from "../../../hoc/WithRouter";

import DetailHeader from './DetailHeader/DetailHeader';
import actions from "../actions";

import {BlocksOfWorkProgramsType, EducationalPlanType, ModuleType} from '../types';
import {EducationalPlanDetailProps} from './types';

import {
  getEducationalPlanDetail,
} from '../getters';
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
import {BACHELOR_QUALIFICATION, specializationObject} from "../../WorkProgram/constants";

import {OPTIONALLY} from "../data";

import connect from './Detail.connect';
import styles from './Detail.styles';
import {fields, TrainingModuleFields} from "../TrainingModules/enum";
import FileIcon from '@mui/icons-material/DescriptionOutlined';
import classNames from "classnames";
import {selectRulesArray, typesListArray} from "../TrainingModules/constants";
import {UserType} from "../../../layout/types";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import UserSelector from "../../Profile/UserSelector/UserSelector";

const DragHandle = SortableHandle(() => <DragIndicatorIcon style={{cursor: "pointer"}}/>);

const SortableItem = SortableElement((props:any) => {
  const {detailPlan, canEdit, blockId, handleDisconnectModule, module, classes} = props;

  const renderModule = (module:any, level:number):any => {
    const selectionRule = selectRulesArray.find(type => type.value === module?.selection_rule)?.label
    const selectionParameter = module?.selection_parametr

    return (
      <>
        <TableRow tabIndex={0}>
          <TableCell style={{minHeight: '40px', width: '100%'}} className={classes.moduleNameWrap}>
            <Typography className={classes.moduleName} style={{ paddingLeft: level * 5 }}>
              {level === 0 ? <DragHandle /> : null}

              {'*'.repeat(level)}
              <Link to={appRouter.getTrainingModuleDetailLink(module.id)} target="_blank" className={classes.link}>
                {module.name}
              </Link>:
              
            </Typography>
            <Typography>
              {module.laboriousness ? <>&nbsp;<b>Трудоемкость:</b> {module.laboriousness}</> : ''}
              {selectionRule ? <>&nbsp;<b>Правило выбора:</b> {selectionRule}</> : ''}
              {selectionParameter ? <>&nbsp;<b>Параметр выбора:</b> {selectionParameter}</> : ''}
            </Typography>
          </TableCell>
          <TableCell style={{ width: '7%'}} />
          <TableCell style={{ width: '7%'}} />
          <TableCell style={{ width: '7%'}} />
          <TableCell style={{ width: '3%'}}>
            {level === 0 && canEdit ? (
              <Tooltip title="Удалить модуль">
                <DeleteIcon className={classes.marginRight10}
                            color="primary"
                            onClick={handleDisconnectModule(module[ModuleFields.ID], blockId)}
                            style={{cursor: "pointer"}}
                />
              </Tooltip>
            ) : ''}
          </TableCell>
        </TableRow>
        {module?.change_blocks_of_work_programs_in_modules?.length ? <RenderBlockOfWP detailPlan={detailPlan} classes={classes} blockOfWorkPrograms={module?.change_blocks_of_work_programs_in_modules} level={level}/> : null}
        {module?.childs?.map((module: any) => renderModule(module, level + 1))}
      </>
    )
  }

  return (
    <Table stickyHeader size='small' className={classes.dragItemBackground}>
      {renderModule(module, 0)}
    </Table>
  )
});

const SortableList = SortableContainer((props:any) => {
  const {modules, detailPlan, classes, canEdit, blockId, handleDisconnectModule } = props;
  
  return (
    <div>
      {modules.map((value: any, index: number) => (
        <SortableItem key={`item-${value.name}`} 
                      index={index}
                      module={value}
                      classes={classes}
                      canEdit={canEdit}
                      blockId={blockId}
                      handleDisconnectModule={handleDisconnectModule}
                      detailPlan={detailPlan}
        />
      ))}
    </div>
  );
});


const RenderBlockOfWP = (props:any) => {
  const dispatch = useDispatch();
  //@ts-ignore
  const {classes} = props;
  const {detailPlan, blockOfWorkPrograms, level} = props
  const qualification = get(detailPlan, 'academic_plan_in_field_of_study[0].qualification', '');
  const maxSem = qualification === BACHELOR_QUALIFICATION ? 8 : 4;

  const handleDownloadFile = (workProgramId: number) => () => {
    dispatch(actions.openDownloadModal({
      [DownloadFileModalFields.ACADEMIC_PLAN_ID]: detailPlan[EducationalPlanFields.ID],
      [DownloadFileModalFields.ID]: workProgramId,
    }));

    dispatch(actions.getDirectionsDependedOnWorkProgram(workProgramId));
  }
  return (
    <>
      {blockOfWorkPrograms?.map((blockOfWorkProgram: any) => {
        const workPrograms = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.WORK_PROGRAMS);
        const gia = blockOfWorkProgram?.gia || [];
        const practice = blockOfWorkProgram?.practice || [];
        const semesterStart = blockOfWorkProgram?.[BlocksOfWorkProgramsFields.SEMESTER_START]?.join(', ');
        const semesterStartArray = blockOfWorkProgram?.[BlocksOfWorkProgramsFields.SEMESTER_START];
        const type = blockOfWorkProgram[BlocksOfWorkProgramsFields.TYPE]
        const duration = blockOfWorkProgram?.work_program?.[0]?.number_of_semesters;
        const semError = semesterStartArray?.some((item: any) => {
          return (duration + item) > (maxSem + 1)
        })

        const renderRow = (title: any, itemsArray: Array<any>) => {
          const allCreditUnits = itemsArray?.[0]?.ze_v_sem;
          const creditUnitsArray = allCreditUnits?.split(', ')
          // @ts-ignore
          const indexFirstNumber1 = creditUnitsArray?.findIndex((item: number) => +item !== 0)
          const withoutZero1 = creditUnitsArray?.slice(indexFirstNumber1, creditUnitsArray.length)
          const withoutZero1Reverse = withoutZero1?.reverse()
          // @ts-ignore
          const indexFirstNumber2 = withoutZero1Reverse?.findIndex((item: number) => +item !== 0)
          const withoutZero2 = withoutZero1?.slice(indexFirstNumber2, withoutZero1.length)

          const creditUnits = withoutZero2?.reverse()?.join(' ')

          return (
            <TableRow key={blockOfWorkProgram[BlocksOfWorkProgramsFields.ID]}>
              <TableCell>
                <div style={{ paddingLeft: (level + 1) * 5 }}>
                  {title}
                </div>
              </TableCell>
              <TableCell style={{minWidth: '125px'}}>
                {creditUnits}
              </TableCell>
              <TableCell className={semError ? classes.error : undefined} style={{minWidth: '90px'}}>
                {semError ? (
                  <Tooltip title='Обучение по этой дисциплине выходит за рамки обучения (длительность дисциплины больше допустимой в данном семестре)'>
                    <div style={{ width: '30px' }}>
                      {semesterStart}
                    </div>
                  </Tooltip>
                ) : semesterStart}
              </TableCell>
              <TableCell style={{minWidth: '90px'}}>
                {type === OPTIONALLY ? '-' : '+'}
              </TableCell>
              <TableCell />
            </TableRow>
          )
        }

        return (
          <>
            {Boolean(workPrograms?.length) && renderRow(workPrograms.map((workProgram: any) =>
              <div className={classes.displayFlex}>
                <Link className={classes.link}
                      to={appRouter.getWorkProgramLink(workProgram[WorkProgramGeneralFields.ID])}
                      target="_blank"
                >
                  {workProgram[WorkProgramGeneralFields.TITLE]}
                </Link>
                <div className={classes.wpStatus}>{getStatus(workProgram.wp_status)}</div>
                <Tooltip
                  title={'Скачать рабочую программу'}>
                  <FileIcon
                    className={classNames(classes.marginRight10, classes.button)}
                    onClick={handleDownloadFile(workProgram[WorkProgramGeneralFields.ID])}
                  />
                </Tooltip>
              </div>
            ), workPrograms)}
            {Boolean(gia?.length) && renderRow(gia.map((gia: any) =>
              <div className={classes.displayFlex}>
                <Link className={classes.link}
                      to={appRouter.getFinalCertificationLink(gia[WorkProgramGeneralFields.ID])}
                      target="_blank"
                >
                  {gia[WorkProgramGeneralFields.TITLE]} (ГИА)
                </Link>
              </div>
            ), gia)}
            {Boolean(practice?.length) && renderRow(practice.map((practice: any) =>
              <div className={classes.displayFlex}>
                <Link className={classes.link}
                      to={appRouter.getPracticeLink(practice[WorkProgramGeneralFields.ID])}
                      target="_blank"
                >
                  {practice[WorkProgramGeneralFields.TITLE]} (практика)
                </Link>
              </div>
            ), practice)}
          </>
        )
      })}
    </>
  )
}

const getStatus = (statusCode: string) => {
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

  onSortEnd = (blockId:any) => ({oldIndex, newIndex}:any) => {
    this.props.actions.changeModulePosition({oldIndex, newIndex, blockId});
  };

  componentDidMount() {
    const planId = this.getPlanId();

    this.props.actions.setIsTrajectoryRoute(this.props.trajectoryRoute);

    this.props.actions.getEducationalDetail(planId);
  }

  componentWillUnmount() {
    this.props.actions.pageDown();
  }

  getPlanId = () => get(this, 'props.params.id');

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
    //@ts-ignore
    const {classes} = this.props;
    const {blocks, detailPlan, trajectoryRoute, user, direction} = this.props;
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
            <Table stickyHeader size='small' className={classes.tableHeader}>
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell style={{ width: '54%'}}> Название </TableCell>
                  <TableCell style={{ width: '7%', minWidth: '125px'}}> Зачетные единицы </TableCell>
                  <TableCell style={{ width: '7%', minWidth: '90px'}}> Семестр начала </TableCell>
                  <TableCell style={{ width: '7%', minWidth: '90px'}}> Обязательность </TableCell>
                  <TableCell style={{ width: '3%'}}/>
                </TableRow>
              </TableHead>
            </Table>
            {blocks.map(block => {
                  return (
                    <>
                      <Table stickyHeader size='small'>
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
                              <b>трудоемкость</b>&nbsp;{block[EducationalPlanBlockFields.LABORIOUSNESS]}
                            </div>
                          </TableCell>
                        </TableRow>
                      </Table>
                      
                      <SortableList 
                        classes={classes} 
                        modules={block.modules_in_discipline_block}
                        canEdit={canEdit}
                        blockId={block?.id}
                        handleDisconnectModule={this.handleDisconnectModule}
                        detailPlan={detailPlan}
                        useDragHandle
                        onSortEnd={this.onSortEnd(block?.id)}
                      />
                    </>
                  )
                })}
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
    //@ts-ignore
    const {classes} = this.props;
    const {detailPlan, canValidate} = this.props;

    //@ts-ignore
    const isuId = detailPlan?.ap_isu_id

    const plan = get(detailPlan, 'academic_plan_in_field_of_study[0]', {})
    const editors = plan?.[EducationalPlanFields.EDITORS]

    const {addEditorsMode} = this.state;
    const canEdit = detailPlan?.[EducationalPlanFields.CAN_EDIT];

    const newPlan = get(detailPlan, 'academic_plan_in_field_of_study[0].year', 0) >= 2023;
    const type = newPlan ? plan?.[EducationalPlanFields.PLAN_TYPE] :
      plan?.[EducationalPlanFields.PLAN_TYPE] === 'base' ? 'Базовый' : 'Индивидуальный'

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

        <Typography className={classes.trajectoryOwner}>
          <b>Направление:</b> {plan?.[EducationalPlanFields.FIELD_OF_STUDY]?.[0]?.title}
        </Typography>

        <Typography className={classes.trajectoryOwner}>
          <b>ОП:</b> {plan?.[EducationalPlanFields.TITLE]}
        </Typography>

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

        {detailPlan?.[EducationalPlanFields.LABORIOUSNESS] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Общая трудоемкость:</b> {detailPlan?.[EducationalPlanFields.LABORIOUSNESS]}
          </Typography>
        ) : null }

        {plan?.[EducationalPlanFields.PLAN_TYPE] ? (
          <Typography className={classes.trajectoryOwner}>
            <b>Тип плана:</b> {type}
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

        {!canEdit && !canValidate && (
          <Typography className={classes.notifyBlock}>
            <WarningIcon style={{marginRight: 3}}/> Если Вам необходим доступ к редактированию учебного плана, обратитесь в офис сопровождения образовательных программ. (Osop@itmo.ru)
          </Typography>
        )}

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

  checkSemestersDuration = () => {
    const {detailPlan} = this.props;
    const qualification = get(detailPlan, 'academic_plan_in_field_of_study[0].qualification', '');
    const maxSem = qualification === BACHELOR_QUALIFICATION ? 8 : 4;

    return detailPlan?.discipline_blocks_in_academic_plan?.some((item: any) => {
      return item?.modules_in_discipline_block?.some((item: any) => {
        return item?.change_blocks_of_work_programs_in_modules.some((item: any) => {
          const semesterStart = item?.semester_start;
          const duration = item?.work_program?.[0]?.number_of_semesters;
          return semesterStart?.some((item: any) => {
            return (duration + item) > (maxSem + 1)
          })
        })
      })
    })
  }

  render() {
    //@ts-ignore
    const {classes} = this.props;
    const {trajectoryRoute} = this.props;
    // @ts-ignore
    const {tab} = this.state
    return (
      <Paper className={classes.root}>
        <DetailHeader classes={classes} trajectoryRoute={trajectoryRoute} tab={tab} onChangeTab={(e: any, value: any) => this.setState({tab: value})}/>
        {tab === '1' ? this.renderMain() : this.renderEducationPlan()}
      </Paper>
    );
  }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(EducationalPlan)));
