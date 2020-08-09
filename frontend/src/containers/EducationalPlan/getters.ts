import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {EducationalPlanFields, fields} from './enum';

import {educationalPlanState, EducationalPlanType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";

const getStateData = (state: rootState): educationalPlanState => get(state, GENERAL_PATH);
export const getEducationalPlan = (state: rootState): Array<EducationalPlanType> => get(getStateData(state), fields.EDUCATIONAL_PLAN_LIST, []);
export const getEducationalPlanDetail = (state: rootState): EducationalPlanType|{} => get(getStateData(state), fields.DETAIL_PLAN, {});

export const getEducationalPlanDetailBlocks = (state: rootState): Array<EducationalPlanType> =>
    get(getEducationalPlanDetail(state), EducationalPlanFields.DISCIPLINE_BLOCKS, []);
export const getEducationalPlanDetailId = (state: rootState): Array<EducationalPlanType> =>
    get(getEducationalPlanDetail(state), EducationalPlanFields.ID, '');

export const getEducationalPlanForSelector = (state: rootState): SelectorListType =>
    getEducationalPlan(state).map((competence: EducationalPlanType) => ({
        value: competence[EducationalPlanFields.ID],
        label: `${competence[EducationalPlanFields.NUMBER]} ${competence[EducationalPlanFields.PROFILE]}`,
    }))

export const getEducationalPlanDialog = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_PLAN_DIALOG, {});
export const isOpenDialog = (state: rootState) => get(getEducationalPlanDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getEducationalPlanDialog(state), fields.DIALOG_DATA, false);

export const getEducationalPlanDetailDialog = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_PLAN_DETAIL_DIALOG, {});
export const isOpenDetailDialog = (state: rootState) => get(getEducationalPlanDetailDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDetailDialogData = (state: rootState) => get(getEducationalPlanDetailDialog(state), fields.DIALOG_DATA, {});

export const getEducationalPlanModuleDialog = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_PLAN_MODULE_DIALOG, {});
export const isOpenModuleDialog = (state: rootState) => get(getEducationalPlanModuleDialog(state), fields.IS_OPEN_DIALOG, false);
export const getModuleDialogData = (state: rootState) => get(getEducationalPlanModuleDialog(state), fields.DIALOG_DATA, {});

export const getDownloadDialog = (state: rootState) => get(getStateData(state), fields.DOWNLOAD_DIALOG, {});
export const isOpenDownloadDialog = (state: rootState) => get(getDownloadDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDownloadDialogData = (state: rootState) => get(getDownloadDialog(state), fields.DIALOG_DATA, {});
export const getDirectionsDependedOnWorkProgram = (state: rootState) => get(getStateData(state), fields.DIRECTIONS_DEPENDED_ON_WORK_PROGRAM, []);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');