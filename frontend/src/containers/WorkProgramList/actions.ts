import {createAction} from "@reduxjs/toolkit";

import {WorkProgramListActions} from './types';

const getWorkProgramList = createAction('GET_WORK_PROGRAM_LIST');
const setWorkProgramList = createAction('SET_WORK_PROGRAM_LIST');

const createNewWorkProgram = createAction('CREATE_NEW_WORK_PROGRAM');
const changeWorkProgram = createAction('CHANGE_WORK_PROGRAM');
const deleteWorkProgram = createAction('DELETE_WORK_PROGRAM');

const openDialog = createAction('OPEN_WORK_PROGRAM_DIALOG');
const closeDialog = createAction('CLOSE_WORK_PROGRAM_DIALOG');

const changeSearchQuery = createAction('WORK_PROGRAM_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('WORK_PROGRAM_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('WORK_PROGRAM_CHANGE_ALL_COUNT');
const changeSorting = createAction('WORK_PROGRAM_CHANGE_SORTING');
const changeFiltering = createAction('WORK_PROGRAMS_CHANGE_FILTERING');

const setWorkProgramIdForRedirect = createAction('WORK_PROGRAM_ID_FOR_REDIRECT');

const pageDown = createAction('WORK_PROGRAM_LIST_PAGE_DOWN');

const actions: WorkProgramListActions = {
    setWorkProgramIdForRedirect,
    pageDown,
    changeFiltering,
    getWorkProgramList,
    setWorkProgramList,
    createNewWorkProgram,
    changeWorkProgram,
    deleteWorkProgram,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;
