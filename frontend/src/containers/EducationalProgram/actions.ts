import {createAction} from "@reduxjs/toolkit";

import {EducationalProgramActions} from './types';

const getEducationalProgram = createAction<string>('GET_EDUCATIONAL_PROGRAMS');
const setEducationalProgram = createAction<string>('SET_EDUCATIONAL_PROGRAMS');

const createNewEducationalProgram = createAction<string>('CREATE_NEW_EDUCATIONAL_PROGRAM');
const changeEducationalProgram = createAction<string>('CHANGE_EDUCATIONAL_PROGRAM');
const deleteEducationalProgram = createAction<string>('DELETE_EDUCATIONAL_PROGRAM');

const openDialog = createAction<string>('OPEN_EDUCATIONAL_PROGRAM_DIALOG');
const closeDialog = createAction<string>('CLOSE_EDUCATIONAL_PROGRAM_DIALOG');

const changeSearchQuery = createAction<string>('EDUCATIONAL_PROGRAM_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('EDUCATIONAL_PROGRAM_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('EDUCATIONAL_PROGRAM_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('EDUCATIONAL_PROGRAM_CHANGE_SORTING');

const actions: EducationalProgramActions = {
    getEducationalProgram: getEducationalProgram,
    setEducationalProgram: setEducationalProgram,
    createNewEducationalProgram: createNewEducationalProgram,
    changeEducationalProgram: changeEducationalProgram,
    deleteEducationalProgram: deleteEducationalProgram,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;