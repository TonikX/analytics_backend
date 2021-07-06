import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {EducationalPlanFields, fields} from './enum';

import {EducationalPlanListType, educationalPlanState, EducationalPlanType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {UserType} from "../../layout/types";
import {DirectionType} from "../Direction/types";

const getStateData = (state: rootState): educationalPlanState => get(state, GENERAL_PATH);
export const getEducationalPlan = (state: rootState): Array<EducationalPlanListType> => get(getStateData(state), fields.EDUCATIONAL_PLAN_LIST, []);
export const getEducationalPlanDetail = (state: rootState): EducationalPlanType|{} => get(getStateData(state), fields.DETAIL_PLAN, {});
export const getIsTrajectoryRoute = (state: rootState): boolean => get(getStateData(state), fields.IS_TRAJECTORY_ROUTE, false);
export const getTrajectoryUserData = (state: rootState): UserType|{} => get(getStateData(state), fields.TRAJECTORY_USER_DATA, {});
export const getTrajectoryDirection = (state: rootState): DirectionType|{} => get(getStateData(state), fields.TRAJECTORY_DIRECTION, {});

export const getEducationalPlanDetailBlocks = (state: rootState): Array<EducationalPlanType> =>
    get(getEducationalPlanDetail(state), EducationalPlanFields.DISCIPLINE_BLOCKS, []);
export const getEducationalPlanDetailId = (state: rootState): Array<EducationalPlanType> =>
    get(getEducationalPlanDetail(state), EducationalPlanFields.ID, '');

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
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');