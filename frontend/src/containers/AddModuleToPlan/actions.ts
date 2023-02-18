import {AddModuleToPlanActions} from "./types";
import {createAction} from "@reduxjs/toolkit";

const getTrainingModulesList = createAction('GET_MODULES');
const setTrainingModulesList = createAction('SET_MODULES');
const changeModulesCurrentPage = createAction('MODULES_CHANGE_CURRENT_PAGE');
const setModulesSortingMode = createAction('SET_SORTING_MODE');
const changeModulesAllCount = createAction('CHANGE_MODULES_ALL_COUNT');
const setModulesSearchQuery = createAction('SET_SEARCH_QUERY');

const getEducationalPlan = createAction('GET_EDUCATIONAL_PLAN');
const setEducationalPlan = createAction('SET_EDUCATIONAL_PLAN');
const changePlansAllCount = createAction('CHANGE_PLANS_ALL_COUNT');
const setPlansSearchQuery = createAction('SET_PLANS_QUERY');
const changePlansCurrentPage = createAction('CHANGE_PLANS_CURRENT_PAGE');

const setSelectedPlans = createAction('SET_SELECTED_PLANS');
const setSelectedModules = createAction('SET_SELECTED_MODULES');
const setSelectedBlock = createAction('SET_SELECTED_BLOCK');
const setSelectAll = createAction('SET_SELECT_ALL');

const setQualification = createAction('SET_QUALIFICATION');
const addModuleToPlan = createAction('ADD_MODULE_TO_PLAN');

const actions: AddModuleToPlanActions = {
    getTrainingModulesList,
    setTrainingModulesList,
    changeModulesCurrentPage,
    setModulesSortingMode,
    changeModulesAllCount,
    setModulesSearchQuery,

    getEducationalPlan,
    setEducationalPlan,
    changePlansAllCount,
    setPlansSearchQuery,
    changePlansCurrentPage,

    setSelectedPlans,
    setSelectedModules,
    setSelectedBlock,
    setSelectAll,

    setQualification,
    addModuleToPlan
};

export default actions;
