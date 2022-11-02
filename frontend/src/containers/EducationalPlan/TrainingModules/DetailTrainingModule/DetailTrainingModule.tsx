import React, {ReactText} from 'react';
import get from 'lodash/get';
import {withRouter} from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";

import Typography from '@material-ui/core/Typography';

import {BlocksOfWorkProgramsFields, ModuleFields} from "../../enum";
import {DetailTrainingModuleProps} from './types';

import connect from './DetailTrainingModule.connect';
import WPBlockCreateModal from "../../Detail/WPBlockCreateModal";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import withStyles from '@material-ui/core/styles/withStyles';
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import Paper from "@material-ui/core/Paper";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';

import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";

import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";
import {typeOfWorkProgramInPlan} from "../../data";
import {appRouter} from "../../../../service/router-service";
import {BlocksOfWorkProgramsType} from "../../types";

import styles from './DetailTrainingModule.styles';
import LikeButton from "../../../../components/LikeButton/LikeButton";
import {FavoriteType} from "../../../Profile/Folders/enum";
import Chip from "@material-ui/core/Chip";
import {getUserFullName} from "../../../../common/utils";
import AddIcon from "@material-ui/icons/Add";
import {UserType} from "../../../../layout/types";
import UserSelector from "../../../Profile/UserSelector/UserSelector";
import Dialog from "@material-ui/core/Dialog";
import {fields, StepsEnum, TrainingModuleFields} from "../enum";
import {selectRulesArray, steps} from "../constants";
import StepButton from "@material-ui/core/StepButton";
import TrainingModuleCreateModal from "../TrainingModuleCreateModal/TrainingModuleCreateModal";
import SimpleSelector from "../../../../components/SimpleSelector/SimpleSelector";
import EvaluationTools from '../EvaluationTools'
import AddTrainingModuleModal from "../AddTrainingModuleModal/AddTrainingModuleModal";

class DetailTrainingModule extends React.Component<DetailTrainingModuleProps> {
  state = {
    deleteBlockConfirmId: null,
    deletedWorkProgramsLength: 0,
    addEditorsMode: false,
    activeStep: StepsEnum.GENERAL,
    description: this.props.module[TrainingModuleFields.DESCRIPTION],
    isuId: this.props.module[TrainingModuleFields.ISU_ID],
  }

  componentDidMount() {
    this.props.actions.getTrainingModule(this.getModuleId());
  }

  componentDidUpdate(prevProps: DetailTrainingModuleProps, nextProps: any) {
    if (prevProps.module !== this.props.module) {
      this.setState({
        description: this.props.module[TrainingModuleFields.DESCRIPTION],
        isuId: this.props.module[TrainingModuleFields.ISU_ID],
      })
    }
  }

  handleCreateNewWPBlock = (moduleId: number) => () => {
    this.props.educationPlansActions.createBlockOfWorkPrograms(moduleId);
  }

  handleCreateNewModule = () => {
    this.props.actions.openDialog({
      dialog: fields.CREATE_TRAINING_MODULE_DIALOG
    });
  }

  handleAddNewModule = (id: number) => () => {
    this.props.actions.openDialog({
      data: id,
      dialog: fields.ADD_TRAINING_MODULE_DIALOG
    });
  }

  removeFatherFromModule = (id: number) => () => {
    this.props.actions.removeFatherFromModule(id)
  }

  getModuleId = () => get(this.props.match.params, 'id');

  goToWorkProgramPage = (id: number) => () => {
    // @ts-ignore
    const {history} = this.props;

    history.push(appRouter.getWorkProgramLink(id));
  }

  handleConfirmBlockDeleteDialog = () => {
    const {deleteBlockConfirmId} = this.state;

    this.props.educationPlansActions.deleteBlockOfWorkPrograms(deleteBlockConfirmId);
    this.closeConfirmDeleteDialog();
  }

  closeConfirmDeleteDialog = () => {
    this.setState({
      deleteBlockConfirmId: null,
      deletedWorkProgramsLength: 0,
    });
  }

  handleClickBlockDelete = (id: number, length: number) => () => {
    this.setState({
      deleteBlockConfirmId: id,
      deletedWorkProgramsLength: length
    });
  }

  handleOpenDetailModal = (block: BlocksOfWorkProgramsType | {}) => () => {
    this.props.educationPlansActions.openDetailDialog({
      ...block,
      moduleId: this.getModuleId()
    });
  }
  handleClickLike = () => {
    const {moduleRating, moduleRatingId} = this.props;
    const moduleId = this.getModuleId();

    if (moduleRating) {
      this.props.foldersActions.removeFromFolder({
        id: moduleRatingId,
        callback: this.props.actions.getTrainingModule,
        type: FavoriteType.MODULES,
        relationId: moduleId
      });
    } else {
      this.props.foldersActions.openAddToFolderDialog({
        relationId: moduleId,
        type: FavoriteType.MODULES,
        callback: this.props.actions.getTrainingModule,
      });
    }
  }

  handleAddingEditor = (userId: number) => {
    const module = this.props.module;
    const newEditorIds = module[TrainingModuleFields.EDITORS].map((editor: UserType) => editor.id).concat(userId);

    this.props.actions.changeEditorList({
      data: {
        [TrainingModuleFields.ID]: module[TrainingModuleFields.ID],
        [TrainingModuleFields.EDITORS]: newEditorIds,
      }
    });

    this.setState({
      addEditorsMode: false
    });
  }

  handleDeletingEditor = (userId: number) => () => {
    const module = this.props.module;
    const newEditorIds = module[TrainingModuleFields.EDITORS]
      .map((editor: UserType) => editor.id)
      .filter((editorId: number) => editorId !== userId);

    this.props.actions.changeEditorList({
      data: {
        [TrainingModuleFields.ID]: module[TrainingModuleFields.ID],
        [TrainingModuleFields.EDITORS]: newEditorIds,
      }
    });
  }

  renderModule = (item: any, level: number): any => {
    const {classes, canEdit} = this.props
    const blockOfWorkPrograms = item?.change_blocks_of_work_programs_in_modules

    return(
      <>
        <TableRow>
          <TableCell  style={{ height: '40px'}} rowSpan={2} colSpan={canEdit ? 3 : 2} className={classes.moduleNameWrap}>
            <Typography className={classes.moduleName} style={{ paddingLeft: level * 5 }}>
              {'*'.repeat(level)}
              {item?.name}
            </Typography>
          </TableCell>
          <TableCell />
          {canEdit && (
            <TableCell style={{ height: '40px'}}>
              <div className={classes.moduleButtons}>
                <Button size="small" onClick={this.handleCreateNewWPBlock(item.id)}>
                  <AddIcon/> РПД
                </Button>
                <Button size="small" onClick={this.handleAddNewModule(item.id)}>
                  <AddIcon/> Модуль
                </Button>
                {level !== 0 && (
                  <Tooltip
                    title={`Открепить модуль`}>
                    <DeleteIcon className={classes.deleteIcon}
                                onClick={this.removeFatherFromModule(item.id)}
                                style={{
                                  marginRight: '28px',
                                  marginTop: '5px',
                                }}
                    />
                  </Tooltip>
                )}
              </div>
            </TableCell>
          )}
        </TableRow>
        {blockOfWorkPrograms?.map((blockOfWorkProgram: any) => {
          const workPrograms = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.WORK_PROGRAMS);

          return <TableRow key={blockOfWorkProgram[BlocksOfWorkProgramsFields.ID]}>
            <TableCell>
              <div style={{ paddingLeft: 10 + level * 5 }}>
                {workPrograms.map((workProgram: any) =>
                  <div className={classes.displayFlex}>
                    <Typography className={classes.workProgramLink}
                                onClick={this.goToWorkProgramPage(workProgram[WorkProgramGeneralFields.ID])}>
                      {workProgram[WorkProgramGeneralFields.TITLE]}
                    </Typography>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              {get(typeOfWorkProgramInPlan.find(item =>
                item.value === blockOfWorkProgram[BlocksOfWorkProgramsFields.TYPE]
              ), 'label', '')}
            </TableCell>

            {canEdit &&
              <TableCell className={classes.actions}>
                <Tooltip
                  title={`Удалить ${get(workPrograms, 'length', 0) > 1 ? 'комплект рабочих программ' : 'рабочую программу'}`}>
                  <DeleteIcon className={classes.deleteIcon}
                              onClick={this.handleClickBlockDelete(blockOfWorkProgram[BlocksOfWorkProgramsFields.ID], get(workPrograms, 'length', 0))}
                  />
                </Tooltip>
                <Tooltip
                  title={`Изменить ${get(workPrograms, 'length', 0) > 1 ? 'комплект рабочих программ' : 'рабочую программу'}`}>
                  <EditIcon
                    onClick={this.handleOpenDetailModal(blockOfWorkProgram)}/>
                </Tooltip>
              </TableCell>
            }
          </TableRow>;
        })}
        {item?.childs?.map((item: any) => (
          this.renderModule(item, level + 1)
        ))}
      </>
    )
  }

  updateTrainingModuleField = (field: string) => (e: React.ChangeEvent) => {
    this.props.actions.changeTrainingModule({
      data: {
        [field]: get(e, 'target.value'),
        id: this.props.module?.id
      }
    })
  }

  updateSelectRule = (value: ReactText) => {
    this.props.actions.changeTrainingModule({
      data: {
        [TrainingModuleFields.SELECTION_RULE]: value,
        id: this.props.module?.id
      }
    })
  }

  renderModules = () => {
    const {classes, module, canEdit} = this.props
    return (
      <>
        <Scrollbars style={{height: 'calc(100vh - 400px)'}}>
          <div className={classes.tableWrap}>
            <Table stickyHeader size='small'>
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell>
                    Модуль/РПД
                  </TableCell>
                  <TableCell> Тип </TableCell>
                  {canEdit && <TableCell/>}
                </TableRow>
              </TableHead>
              <TableBody>
                {module?.childs?.map((item: any) => this.renderModule(item, 0))}
              </TableBody>
            </Table>
          </div>
        </Scrollbars>
        <div className={classes.createModuleButtonWrap}>
          <Button onClick={this.handleCreateNewModule} variant="outlined" className={classes.createModuleButton}>
            <AddIcon/>
            Создать модуль
          </Button>
        </div>
      </>
    )
  }

  renderGeneral = () => {
    const {module, classes, canEdit} = this.props

    return (
      <>
        <div className={classes.editors}>
          <Typography className={classes.editorsTitle}>
            Редакторы:
          </Typography>

          {module?.editors?.map((editor: UserType) =>
            <Chip
              key={editor.id}
              label={getUserFullName(editor)}
              onDelete={canEdit ? this.handleDeletingEditor(editor.id) : undefined}
              className={classes.editorsItem}
            />
          )}

          {module?.editors?.length === 0 && <Typography>ни одного редактора не добавлено</Typography>}

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

        <>
          <Typography className={classes.textField}>
            ID конструктора РПД: <b>{module?.[TrainingModuleFields.ID]}</b>
          </Typography>
          <TextField variant="outlined"
                     label="Описание"
                     value={this.state.description}
                     onChange={(e) => this.setState({ description: e.target.value })}
                     onBlur={this.updateTrainingModuleField(TrainingModuleFields.DESCRIPTION)}
                     className={classes.textField}
                     InputLabelProps={{
                       shrink: true,
                     }}
          />
          <TextField variant="outlined"
                     label="ISU id"
                     value={this.state.isuId}
                     onChange={(e) => this.setState({ description: e.target.value })}
                     onBlur={this.updateTrainingModuleField(TrainingModuleFields.ISU_ID)}
                     className={classes.textField}
                     InputLabelProps={{
                       shrink: true,
                     }}
          />
          <SimpleSelector label="Правило выбора"
                          value={module?.[TrainingModuleFields.SELECTION_RULE]}
                          onChange={this.updateSelectRule}
                          metaList={selectRulesArray}
                          wrapClass={classes.selectorWrap}
          />

          {/*<Typography className={classes.textItem}>*/}
          {/*  <b>Описание:</b> {module.description}*/}
          {/*</Typography>*/}
          {/*<Typography className={classes.textItem}>*/}
          {/*  <b>ISU id:</b> {module.module_isu_id}*/}
          {/*</Typography>*/}
          {/*<Typography className={classes.textItem}>*/}
          {/*  <b>Правило выбора:</b> {module.selection_rule}*/}
          {/*</Typography>*/}
        </>
      </>
    )
  }

  renderPlans = () => {
    const {classes, module} = this.props

    return (
      <>
        <Typography className={classes.subTitle}>
          {steps[StepsEnum.PLANS]}
        </Typography>
        <Scrollbars style={{height: 'calc(100vh - 400px)'}}>
          <Table stickyHeader>
            <TableHead style={{height: 45}}>
              <TableRow>
                <TableCell className={classes.header}>Образовательная программа</TableCell>
                <TableCell className={classes.header}>Направление</TableCell>
                <TableCell className={classes.header}>Год набора</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {module?.educational_programs_to_access?.map((plan: any) => (
                <TableRow>
                  <TableCell>
                    {get(plan, 'title')}
                  </TableCell>
                  <TableCell>
                    {get(plan, 'field_of_study.0.title')}
                  </TableCell>
                  <TableCell>
                    {get(plan, 'year')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbars>
      </>
    )
  }

  renderContent = () => {
    const {activeStep} = this.state

    switch (activeStep) {
      case StepsEnum.GENERAL:
        return this.renderGeneral()
      case StepsEnum.MODULES:
        return this.renderModules()
      case StepsEnum.PLANS:
        return this.renderPlans()
      case StepsEnum.EVALUATION_TOOLS:
        return <EvaluationTools />
    }
  }

  render() {
    const {module, classes, moduleRating} = this.props;
    const {deleteBlockConfirmId, deletedWorkProgramsLength, addEditorsMode, activeStep} = this.state;

    return (
      <div className={classes.wrap}>
        <Paper className={classes.root}>
          <Stepper activeStep={activeStep}
                   orientation="vertical"
                   nonLinear
                   className={classes.stepper}
          >
            {Object.keys(steps).map((key) => (
              <Step key={key} onClick={() => this.setState({activeStep: parseInt(key)})}>
                <StepButton completed={false}
                            style={{textAlign: 'left',}}
                            key={key}
                >{/*
                                                // @ts-ignore*/}
                  {steps[parseInt(key)]}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <div className={classes.content}>
            <div className={classes.title}>
              <Typography> {get(module, ModuleFields.NAME, '')} </Typography>
              <LikeButton onClick={this.handleClickLike}
                          isLiked={moduleRating}
              />
            </div>
            {this.renderContent()}
          </div>

          <ConfirmDialog onConfirm={this.handleConfirmBlockDeleteDialog}
                         onDismiss={this.closeConfirmDeleteDialog}
                         confirmText={`Вы точно уверены, что хотите ${deletedWorkProgramsLength > 1 ? 'комлект рабочих программ' : 'рабочую программу'}?`}
                         isOpen={Boolean(deleteBlockConfirmId)}
                         dialogTitle={`Удалить ${deletedWorkProgramsLength > 1 ? 'комлект рабочих программ' : 'рабочую программу'}`}
                         confirmButtonText={'Удалить'}
          />

          <WPBlockCreateModal disableZUN
                              moduleId={this.getModuleId()}
          />

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
        </Paper>

        <TrainingModuleCreateModal/>
        <AddTrainingModuleModal />
      </div>
    );
  }
}

export default connect(withStyles(styles)(withRouter(DetailTrainingModule)));
