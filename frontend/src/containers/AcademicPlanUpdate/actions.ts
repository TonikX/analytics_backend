import {createAction} from "@reduxjs/toolkit";

import {AcademicPlanUpdateActions} from './types';

const updateSchedulerConfiguration = createAction("UPDATE_SCHEDULER_CONFIGURATION");
const getSchedulerConfiguration = createAction("GET_SCHEDULER_CONFIGURATION");
const setSchedulerConfiguration = createAction("SET_SCHEDULER_CONFIGURATION");
const updateAcademicPlanConfiguration = createAction('UPDATE_ACADEMIC_PLAN_CONFIGURATION');
const createNewAcademicPlanUpdateConfiguration = createAction('CREATE_NEW_ACADEMIC_PLAN_UPDATE_CONFIGURATION');
const openDialog = createAction('OPEN_UPDATED_ACADEMIC_PLAN_DIALOG');
const closeDialog = createAction('CLOSE_UPDATED_ACADEMIC_PLAN_DIALOG');
const updateAcademicPlans = createAction('UPDATE_ACADEMIC_PLANS');
const updateAcademicPlansFrom2023 = createAction('UPDATE_ACADEMIC_PLANS_FROM_2023');
const getUpdatedAcademicPlans = createAction('GET_UPDATED_ACADEMIC_PLANS');
const setUpdatedAcademicPlans = createAction('SET_UPDATED_ACADEMIC_PLANS');
const getAcademicPlansExcel = createAction('GET_ACADEMIC_PLANS_EXCEL');
const getAcademicPlanUpdateLogs = createAction('GET_ACADEMIC_PLAN_UPDATE_LOGS');
const setAcademicPlanUpdateLogs = createAction('SET_ACADEMIC_PLAN_UPDATE_LOGS');

const logsChangeSearchQuery = createAction('LOGS_CHANGE_SEARCH_QUERY');
const logsChangeCurrentPage = createAction('LOGS_CHANGE_CURRENT_PAGE');
const logsChangeAllCount = createAction('LOGS_CHANGE_ALL_COUNT');
const logsChangeSorting = createAction('LOGS_CHANGE_SORTING');


const updatedPlansChangeSearchQuery = createAction('UPDATED_PLANS_CHANGE_SEARCH_QUERY');
const updatedPlansChangeCurrentPage = createAction('UPDATED_PLANS_CHANGE_CURRENT_PAGE');
const updatedPlansChangeAllCount = createAction('UPDATED_PLANS_CHANGE_ALL_COUNT');
const updatedPlansChangeSorting = createAction('UPDATED_PLANS_CHANGE_SORTING');

const updateAcademicPlanOver23 = createAction('UPDATE_ACADEMIC_PLAN_OVER_23');

const actions: AcademicPlanUpdateActions = {
    updateAcademicPlansFrom2023,
    updateSchedulerConfiguration,
    setSchedulerConfiguration,
    getSchedulerConfiguration,
    updateAcademicPlanConfiguration,
    updateAcademicPlanOver23,
    createNewAcademicPlanUpdateConfiguration,
    openDialog,
    closeDialog,
    getUpdatedAcademicPlans,
    setUpdatedAcademicPlans,
    updateAcademicPlans,
    getAcademicPlansExcel,
    setAcademicPlanUpdateLogs,
    getAcademicPlanUpdateLogs,
    logsChangeSearchQuery,
    logsChangeCurrentPage,
    logsChangeAllCount,
    logsChangeSorting,
    updatedPlansChangeSearchQuery,
    updatedPlansChangeCurrentPage,
    updatedPlansChangeAllCount,
    updatedPlansChangeSorting

}

export default actions;
