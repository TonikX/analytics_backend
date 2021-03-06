import {createAction} from "@reduxjs/toolkit";

import {EducationalPlanActions} from './types';

const getEducationalPlans = createAction('GET_EDUCATIONAL_PLANS');
const setEducationalPlans = createAction('SET_EDUCATIONAL_PLANS');

const getEducationalDetail = createAction('GET_EDUCATIONAL_PLAN_DETAIL');
const setEducationalDetail = createAction('SET_EDUCATIONAL_PLAN_DETAIL');

const createNewEducationalPlan = createAction('CREATE_NEW_EDUCATIONAL_PLAN');
const changeEducationalPlan = createAction('CHANGE_EDUCATIONAL_PLAN');
const deleteEducationalPlan = createAction('DELETE_EDUCATIONAL_PLAN');

const openDialog = createAction('OPEN_EDUCATIONAL_PLAN_DIALOG');
const closeDialog = createAction('CLOSE_EDUCATIONAL_PLAN_DIALOG');

const openModuleDialog = createAction('OPEN_EDUCATIONAL_PLAN_MODULE_DIALOG');
const closeModuleDialog = createAction('CLOSE_EDUCATIONAL_PLAN_MODULE_DIALOG');

const openAddModuleDialog = createAction('OPEN_EDUCATIONAL_PLAN_ADD_MODULE_DIALOG');
const closeAddModuleDialog = createAction('CLOSE_EDUCATIONAL_PLAN_ADD_MODULE_DIALOG');

const openDetailDialog = createAction('OPEN_DETAIL_EDUCATIONAL_PLAN_DIALOG');
const closeDetailDialog = createAction('CLOSE_DETAIL_EDUCATIONAL_PLAN_DIALOG');

const changeSearchQuery = createAction('EDUCATIONAL_PLAN_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('EDUCATIONAL_PLAN_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('EDUCATIONAL_PLAN_CHANGE_ALL_COUNT');
const changeSorting = createAction('EDUCATIONAL_PLAN_CHANGE_SORTING');

const createBlockOfWorkPrograms = createAction('CREATE_BLOCK_OF_WORK_PROGRAM');
const changeBlockOfWorkPrograms = createAction('CHANGE_BLOCK_OF_WORK_PROGRAM');
const deleteBlockOfWorkPrograms = createAction('DELETE_BLOCK_OF_WORK_PROGRAM');

const createModule = createAction('EDUCATIONAL_PLAN_CREATE_MODULE');
const changeModule = createAction('EDUCATIONAL_PLAN_CHANGE_MODULE');
const deleteModule = createAction('EDUCATIONAL_PLAN_DELETE_MODULE');
const addModule = createAction('EDUCATIONAL_PLAN_ADD_MODULE');

const getDirectionsDependedOnWorkProgram = createAction('GET_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM');
const setDirectionsDependedOnWorkProgram = createAction('SET_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM');

const openDownloadModal = createAction('OPEN_DOWNLOAD_MODAL');
const closeDownloadModal = createAction('CLOSE_DOWNLOAD_MODAL');

const saveCompetenceBlock = createAction('SAVE_COMPETENCE_BLOCK');
const deleteCompetenceBlock = createAction('DELETE_COMPETENCE_BLOCK');

const deleteWorkProgramFromZun = createAction('DELETE_WP_FROM_ZUN');
const pageDown = createAction('EDUCATIONAL_PLAN_PAGE_DOWN');

const actions: EducationalPlanActions = {
    openAddModuleDialog,
    closeAddModuleDialog,
    pageDown,
    deleteWorkProgramFromZun,
    deleteCompetenceBlock,
    saveCompetenceBlock,
    createModule,
    openDownloadModal,
    closeDownloadModal,
    getDirectionsDependedOnWorkProgram,
    setDirectionsDependedOnWorkProgram,
    openCreateModuleDialog: openModuleDialog,
    closeCreateModuleDialog: closeModuleDialog,
    changeModule,
    deleteModule,
    addModule,
    createBlockOfWorkPrograms,
    changeBlockOfWorkPrograms,
    deleteBlockOfWorkPrograms,
    openDetailDialog,
    closeDetailDialog,
    getEducationalDetail,
    setEducationalDetail,
    getEducationalPlans,
    setEducationalPlans,
    createNewEducationalPlan,
    changeEducationalPlan,
    deleteEducationalPlan,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;