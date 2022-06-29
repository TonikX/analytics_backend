import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";
import {AcademicPlanUpdateLogType, academicPlanUpdateState, UpdatedAcademicPlanType} from "./types";
import {fields} from "./enum";


const getStateData = (state: rootState): academicPlanUpdateState => get(state, GENERAL_PATH);
export const getAcademicPlanUpdateLogs = (state: rootState): Array<AcademicPlanUpdateLogType> => get(getStateData(state), fields.ACADEMIC_PLAN_UPDATE_LOG_LIST, []);
export const getUpdatedAcademicPlans = (state: rootState): Array<UpdatedAcademicPlanType> => get(getStateData(state), fields.UPDATED_ACADEMIC_PLANS_LIST, []);

export const getSchedulerConfiguration = (state: rootState) => get(getStateData(state), fields.SCHEDULER_CONFIGURATION, {});

export const getUpdatedAcademicPlansDialog = (state: rootState) => get(getStateData(state), fields.UPDATED_ACADEMIC_PLANS_DIALOG, {});
export const isOpenDialog = (state: rootState) => get(getUpdatedAcademicPlansDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getUpdatedAcademicPlansDialog(state), fields.DIALOG_DATA, false);

export const getLogsAllCount = (state: rootState) => get(getStateData(state), fields.LOGS_ALL_COUNT, 1);
export const getLogsCurrentPage = (state: rootState) => get(getStateData(state), fields.LOGS_CURRENT_PAGE, 1);
export const getLogsSearchQuery = (state: rootState) => get(getStateData(state), fields.LOGS_SEARCH_QUERY, '');

export const getLogsSorting = (state: rootState) => get(getStateData(state), fields.LOGS_SORTING, {});
export const getLogsSortingField = (state: rootState) => get(getLogsSorting(state), fields.LOGS_SORTING_FIELD, '');
export const getLogsSortingMode = (state: rootState) => get(getLogsSorting(state), fields.LOGS_SORTING_MODE, '');


export const getUpdatedPlansAllCount = (state: rootState) => get(getStateData(state), fields.UPDATED_PLANS_ALL_COUNT, 1);
export const getUpdatedPlansCurrentPage = (state: rootState) => get(getStateData(state), fields.UPDATED_PLANS_CURRENT_PAGE, 1);
export const getUpdatedPlansSearchQuery = (state: rootState) => get(getStateData(state), fields.UPDATED_PLANS_SEARCH_QUERY, '');

export const getUpdatedPlansSorting = (state: rootState) => get(getStateData(state), fields.UPDATED_PLANS_SORTING, {});
export const getUpdatedPlansSortingField = (state: rootState) => get(getUpdatedPlansSorting(state), fields.UPDATED_PLANS_SORTING_FIELD, '');
export const getUpdatedPlansSortingMode = (state: rootState) => get(getUpdatedPlansSorting(state), fields.UPDATED_PLANS_SORTING_MODE, '');
