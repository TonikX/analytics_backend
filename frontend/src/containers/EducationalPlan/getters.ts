import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {EducationalPlanFields, fields, PlanStatuses, PlanStatusesColors, PlanStatusesNames} from './enum';

import {EducationalPlanListType, educationalPlanState, EducationalPlanType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {UserType} from "../../layout/types";
import {DirectionType} from "../Direction/types";
import {getTrainingModule} from "./TrainingModules/getters";
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): educationalPlanState => get(state, GENERAL_PATH);
export const getEducationalPlan = (state: rootState): Array<EducationalPlanListType> => get(getStateData(state), fields.EDUCATIONAL_PLAN_LIST, []);
export const getEducationalPlanDetail = (state: rootState): EducationalPlanType|{} => get(getStateData(state), fields.DETAIL_PLAN, {});
// @ts-ignore
export const canSendToValidate = (state: rootState): EducationalPlanType|{} => getEducationalPlanDetail(state)?.[EducationalPlanFields.STATUS] === PlanStatuses.IN_WORK;
// @ts-ignore
export const canValidate = (state: rootState): EducationalPlanType|{} => getEducationalPlanDetail(state)?.[EducationalPlanFields.CAN_VALIDATE] && getEducationalPlanDetail(state)?.[EducationalPlanFields.STATUS] === PlanStatuses.ON_CHECK;
export const getStatusInfo = (state: rootState) => {
  // @ts-ignore
  const status = getEducationalPlanDetail(state)?.[EducationalPlanFields.STATUS] as PlanStatuses

  return {
    status,
    statusText: PlanStatusesNames[status],
    backgroundColor: PlanStatusesColors[status]
  }
};

export const getIsTrajectoryRoute = (state: rootState): boolean => get(getStateData(state), fields.IS_TRAJECTORY_ROUTE, false);
export const getTrajectoryUserData = (state: rootState): UserType|{} => get(getStateData(state), fields.TRAJECTORY_USER_DATA, {});
export const getTrajectoryDirection = (state: rootState): DirectionType|{} => get(getStateData(state), fields.TRAJECTORY_DIRECTION, {});
export const getNewPlanIdForRedirect = (state: rootState): null|number => get(getStateData(state), fields.NEW_PLAN_ID_FOR_REDIRECT, null);

export const getEducationalPlanDetailBlocks = (state: rootState): Array<EducationalPlanType> =>
  get(getEducationalPlanDetail(state), EducationalPlanFields.DISCIPLINE_BLOCKS, []);
export const getEducationalPlanDetailId = (state: rootState): Array<EducationalPlanType> =>
  //@ts-ignore
  get(getEducationalPlanDetail(state), EducationalPlanFields.ID, '');
export const getEducationalPlanOpId = (state: rootState): Array<EducationalPlanType> =>
  //@ts-ignore
  get(getEducationalPlanDetail(state), 'academic_plan_in_field_of_study.0.id', '');

export const getEducationalPlanForSelector = (state: rootState): SelectorListType =>
  getEducationalPlan(state).map((plan: EducationalPlanListType) => ({
      value: plan[EducationalPlanFields.ID],
      label: `${get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.NUMBER])} ${get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.TITLE])}`,
  }))

export const getEducationalPlanDialog = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_PLAN_DIALOG, {});
export const isOpenDialog = (state: rootState) => get(getEducationalPlanDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getEducationalPlanDialog(state), fields.DIALOG_DATA, false);

export const getEducationalPlanDetailDialog = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_PLAN_DETAIL_DIALOG, {});
export const isOpenDetailDialog = (state: rootState) => get(getEducationalPlanDetailDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDetailDialogData = (state: rootState) => get(getEducationalPlanDetailDialog(state), fields.DIALOG_DATA, {});

export const getEducationalPlanModuleDialog = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_PLAN_CREATE_MODULE_DIALOG, {});
export const isOpenModuleDialog = (state: rootState) => get(getEducationalPlanModuleDialog(state), fields.IS_OPEN_DIALOG, false);
export const getModuleDialogData = (state: rootState) => get(getEducationalPlanModuleDialog(state), fields.DIALOG_DATA, {});

export const getAddModuleDialog = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_PLAN_ADD_MODULE_DIALOG, {});
export const isOpenAddModuleDialog = (state: rootState) => get(getAddModuleDialog(state), fields.IS_OPEN_DIALOG, false);
export const getModuleAddDialogData = (state: rootState) => get(getAddModuleDialog(state), fields.DIALOG_DATA, {});

export const getDownloadDialog = (state: rootState) => get(getStateData(state), fields.DOWNLOAD_DIALOG, {});
export const isOpenDownloadDialog = (state: rootState) => get(getDownloadDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDownloadDialogData = (state: rootState) => get(getDownloadDialog(state), fields.DIALOG_DATA, {});
export const getDirectionsDependedOnWorkProgram = (state: rootState): Array<any> => get(getStateData(state), fields.DIRECTIONS_DEPENDED_ON_WORK_PROGRAM, []);

const titlePath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.title'
const yearPath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.year'
const titleDirectionPath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.field_of_study.0.title'
const numberDirectionPath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.field_of_study.0.number'

export const getDirectionsDependedOnWorkProgramForSelector = (state: rootState): SelectorListType =>
  getDirectionsDependedOnWorkProgram(state).map((plan: EducationalPlanListType) => ({
    value: plan[EducationalPlanFields.ID],
    label: `${get(plan, titlePath, '')} ${get(plan, yearPath, '')}: ${get(plan, titleDirectionPath, '')} ${get(plan, numberDirectionPath, '')}`,
  }))

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);

export const getAvailableButtons = (state: rootState) => {
  const module = getTrainingModule(state)
  const find = (item: any) => {
    const workPrograms = item?.work_program;
    const gia = item?.gia || [];
    const practice = item?.practice || [];

    if (workPrograms.length || gia.length || practice.length) return true
    if (item.child) return item.child.find((childItem: any) => find(childItem))
  }

  //@ts-ignore
  const moduleFind = module?.change_blocks_of_work_programs_in_modules?.find((item) => find(item))

  const giaLength = moduleFind?.gia?.length || 0
  const practiceLength = moduleFind?.practice?.length || 0
  const wpLength = moduleFind?.work_program?.length || 0

  const none = giaLength === 0 && practiceLength === 0 && wpLength === 0

  return {
    gia: giaLength > 0 || none,
    practice: moduleFind?.practice?.length > 0 || none,
    wp: moduleFind?.work_program.length > 0 || none,
  }
}