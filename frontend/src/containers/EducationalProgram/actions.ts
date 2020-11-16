import {createAction} from "@reduxjs/toolkit";

import {EducationalProgramActions} from './types';

const getEducationalProgramList = createAction<string>('GET_EDUCATIONAL_PROGRAM_LIST');
const setEducationalProgramList = createAction<string>('SET_EDUCATIONAL_PROGRAM_LIST');
const createEducationalProgram = createAction<string>('CREATE_EDUCATIONAL_PROGRAM');
const deleteEducationalProgram = createAction<string>('DELETE_EDUCATIONAL_PROGRAM');
const changeEducationalProgram = createAction<string>('CHANGE_EDUCATIONAL_PROGRAM');

const getEducationalProgramCharacteristic = createAction<string>('GET_EDUCATIONAL_PROGRAM_CHARACTERISTIC');
const setEducationalProgramCharacteristic = createAction<string>('SET_EDUCATIONAL_PROGRAM_CHARACTERISTIC');

const changeEducationalProgramCharacteristic = createAction<string>('CHANGE_EDUCATIONAL_PROGRAM_CHARACTERISTIC');

const openDialog = createAction<string>('OPEN_CREATE_EDUCATIONAL_PROGRAM_DIALOG');
const closeDialog = createAction<string>('CLOSE_CREATE_EDUCATIONAL_PROGRAM_DIALOG');

const changeSearchQuery = createAction<string>('EDUCATIONAL_PROGRAM_LIST_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('EDUCATIONAL_PROGRAM_LIST_CURRENT_PAGE');
const changeAllCount = createAction<string>('EDUCATIONAL_PROGRAM_LIST_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('EDUCATIONAL_PROGRAM_LIST_CHANGE_SORTING');

const actions: EducationalProgramActions = {
    getEducationalProgramList,
    setEducationalProgramList,
    createEducationalProgram,
    deleteEducationalProgram,
    changeEducationalProgram,
    getEducationalProgramCharacteristic,
    setEducationalProgramCharacteristic,
    changeEducationalProgramCharacteristic,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;