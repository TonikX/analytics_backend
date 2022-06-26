import createReducer from "../../store/createReducer";
import {fields, SchedulerConfigurationFields} from './enum';
import actions from "./actions";

import {academicPlanUpdateState} from "./types";

export const GENERAL_PATH = 'academicPlaUpdate';

export const initialState: academicPlanUpdateState = {
    [fields.LOGS_SORTING]: {
        [fields.LOGS_SORTING_FIELD]: '',
        [fields.LOGS_SORTING_MODE]: ''
    },
    [fields.UPDATED_PLANS_SORTING]: {
        [fields.UPDATED_PLANS_SORTING_FIELD]: '',
        [fields.UPDATED_PLANS_SORTING_MODE]: ''
    },
    [fields.LOGS_CURRENT_PAGE]: 1,
    [fields.UPDATED_PLANS_CURRENT_PAGE]: 1,
    [fields.LOGS_ALL_COUNT]: 1,
    [fields.UPDATED_PLANS_ALL_COUNT]: 1,
    [fields.LOGS_SEARCH_QUERY]: '',
    [fields.UPDATED_PLANS_SEARCH_QUERY]: '',

    [fields.ACADEMIC_PLAN_UPDATE_LOG_LIST]: [],
    [fields.UPDATED_ACADEMIC_PLANS_LIST]: [],
    [fields.SCHEDULER_CONFIGURATION]:{
        [SchedulerConfigurationFields.EXECUTION_HOURS]: 0,
        [SchedulerConfigurationFields.DAYS_INTERVAL]: 0
    },
    [fields.UPDATED_ACADEMIC_PLANS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};


const changeLogsSearchQuery = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.LOGS_SEARCH_QUERY]: payload,
});

const changeUpdatedPlansSearchQuery = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.UPDATED_PLANS_SEARCH_QUERY]: payload,
});

const changeLogsCurrentPage = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.LOGS_CURRENT_PAGE]: payload,
});

const changeUpdatedPlansCurrentPage = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.UPDATED_PLANS_CURRENT_PAGE]: payload,
});

const changeLogsAllCount = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.LOGS_ALL_COUNT]: payload,
});

const changeUpdatedPlansAllCount = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.UPDATED_PLANS_ALL_COUNT]: payload,
});

const changeLogsSorting = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.LOGS_SORTING]: {
        [fields.LOGS_SORTING_FIELD]: payload.field,
        [fields.LOGS_SORTING_MODE]: payload.mode
    }
});

const changeUpdatedPlansSorting = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.UPDATED_PLANS_SORTING]: {
        [fields.UPDATED_PLANS_SORTING_FIELD]: payload.field,
        [fields.UPDATED_PLANS_SORTING_MODE]: payload.mode
    }
});


const setAcademicPlanUpdateLogs = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.ACADEMIC_PLAN_UPDATE_LOG_LIST]: payload,
});

const setUpdatedAcademicPlans = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.UPDATED_ACADEMIC_PLANS_LIST]: payload,
});

const setSchedulerConfiguration = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.SCHEDULER_CONFIGURATION]: payload,
});


const openDialog = (state: academicPlanUpdateState, {payload}: any): academicPlanUpdateState => ({
    ...state,
    [fields.UPDATED_ACADEMIC_PLANS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: academicPlanUpdateState): academicPlanUpdateState => ({
    ...state,
    [fields.UPDATED_ACADEMIC_PLANS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

export const reducer = createReducer(initialState, {
    [actions.closeDialog.type]: closeDialog,
    [actions.openDialog.type]: openDialog,
    [actions.logsChangeSearchQuery.type]: changeLogsSearchQuery,
    [actions.updatedPlansChangeSearchQuery.type]: changeUpdatedPlansSearchQuery,
    [actions.logsChangeCurrentPage.type]: changeLogsCurrentPage,
    [actions.updatedPlansChangeCurrentPage.type]: changeUpdatedPlansCurrentPage,
    [actions.logsChangeAllCount.type]: changeLogsAllCount,
    [actions.updatedPlansChangeAllCount.type]: changeUpdatedPlansAllCount,
    [actions.logsChangeSorting.type]: changeLogsSorting,
    [actions.updatedPlansChangeSorting.type]: changeUpdatedPlansSorting,
    [actions.setAcademicPlanUpdateLogs.type]: setAcademicPlanUpdateLogs,
    [actions.setUpdatedAcademicPlans.type]: setUpdatedAcademicPlans,
    [actions.setSchedulerConfiguration.type]: setSchedulerConfiguration
});
