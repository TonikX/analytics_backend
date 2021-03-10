import {createAction} from "@reduxjs/toolkit";

import {EducationalProgramActions} from './types';

const getEducationalProgramList = createAction('GET_EDUCATIONAL_PROGRAM_LIST');
const setEducationalProgramList = createAction('SET_EDUCATIONAL_PROGRAM_LIST');
const createEducationalProgram = createAction('CREATE_EDUCATIONAL_PROGRAM');
const deleteEducationalProgram = createAction('DELETE_EDUCATIONAL_PROGRAM');
const changeEducationalProgram = createAction('CHANGE_EDUCATIONAL_PROGRAM');

const getEducationalProgramCharacteristic = createAction('GET_EDUCATIONAL_PROGRAM_CHARACTERISTIC');
const setEducationalProgramCharacteristic = createAction('SET_EDUCATIONAL_PROGRAM_CHARACTERISTIC');

const characteristicSaveGroupTitle = createAction<{title: string}>('CHARACTERISTIC_COMPETENCIES_SAVE_GROUP_TITLE');
const characteristicSaveCompetence = createAction<{competenceId: number}>('CHARACTERISTIC_COMPETENCIES_SAVE_COMPETENCE');
const characteristicSaveIndicators = createAction<{indicatorId: number}>('CHARACTERISTIC_COMPETENCIES_SAVE_INDICATORS');
const characteristicDeleteGroup = createAction<{groupId: number}>('CHARACTERISTIC_COMPETENCIES_DELETE_GROUP');

const changeEducationalProgramCharacteristic = createAction('CHANGE_EDUCATIONAL_PROGRAM_CHARACTERISTIC');

const openDialog = createAction('OPEN_CREATE_EDUCATIONAL_PROGRAM_DIALOG');
const closeDialog = createAction('CLOSE_CREATE_EDUCATIONAL_PROGRAM_DIALOG');

const changeSearchQuery = createAction('EDUCATIONAL_PROGRAM_LIST_SEARCH_QUERY');
const changeCurrentPage = createAction('EDUCATIONAL_PROGRAM_LIST_CURRENT_PAGE');
const changeAllCount = createAction('EDUCATIONAL_PROGRAM_LIST_CHANGE_ALL_COUNT');
const changeSorting = createAction('EDUCATIONAL_PROGRAM_LIST_CHANGE_SORTING');

const actions: EducationalProgramActions = {
    characteristicSaveGroupTitle,
    characteristicSaveCompetence,
    characteristicSaveIndicators,
    characteristicDeleteGroup,

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