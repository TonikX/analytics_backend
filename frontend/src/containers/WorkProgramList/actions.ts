import {createAction} from "@reduxjs/toolkit";

import {WorkProgramListActions} from './types';

const getWorkProgramList = createAction<string>('GET_WORK_PROGRAM_LIST');
const setWorkProgramList = createAction<string>('SET_WORK_PROGRAM_LIST');

const createNewWorkProgram = createAction<string>('CREATE_NEW_WORK_PROGRAM');
const changeWorkProgram = createAction<string>('CHANGE_WORK_PROGRAM');
const deleteWorkProgram = createAction<string>('DELETE_WORK_PROGRAM');

const openDialog = createAction<string>('OPEN_WORK_PROGRAM_DIALOG');
const closeDialog = createAction<string>('CLOSE_WORK_PROGRAM_DIALOG');

const changeSearchQuery = createAction<string>('WORK_PROGRAM_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('WORK_PROGRAM_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('WORK_PROGRAM_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('WORK_PROGRAM_CHANGE_SORTING');

const pageDown = createAction<string>('WORK_PROGRAM_LIST_PAGE_DOWN');

const actions: WorkProgramListActions = {
    pageDown,
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