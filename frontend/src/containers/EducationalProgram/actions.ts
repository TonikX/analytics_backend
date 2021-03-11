import {createAction} from "@reduxjs/toolkit";

import {CharacteristicCreateGroupActionType, EducationalProgramActions} from './types';
import {CompetenceTableType} from "./enum";

const getEducationalProgramList = createAction('GET_EDUCATIONAL_PROGRAM_LIST');
const setEducationalProgramList = createAction('SET_EDUCATIONAL_PROGRAM_LIST');
const createEducationalProgram = createAction('CREATE_EDUCATIONAL_PROGRAM');
const deleteEducationalProgram = createAction('DELETE_EDUCATIONAL_PROGRAM');
const changeEducationalProgram = createAction('CHANGE_EDUCATIONAL_PROGRAM');

const getEducationalProgramCharacteristic = createAction('GET_EDUCATIONAL_PROGRAM_CHARACTERISTIC');
const setEducationalProgramCharacteristic = createAction('SET_EDUCATIONAL_PROGRAM_CHARACTERISTIC');

const characteristicCreateGroup = createAction<CharacteristicCreateGroupActionType>('CHARACTERISTIC_COMPETENCIES_CREATE_GROUP');
const characteristicSaveGroupTitle = createAction<{title: string, type: CompetenceTableType}>('CHARACTERISTIC_COMPETENCIES_SAVE_GROUP_TITLE');
const characteristicSaveCompetence = createAction<{competenceId: number, type: CompetenceTableType}>('CHARACTERISTIC_COMPETENCIES_SAVE_COMPETENCE');
const characteristicSaveIndicators = createAction<{indicatorId: number, type: CompetenceTableType}>('CHARACTERISTIC_COMPETENCIES_SAVE_INDICATORS');
const characteristicDeleteGroup = createAction<{groupId: number, type: CompetenceTableType}>('CHARACTERISTIC_COMPETENCIES_DELETE_GROUP');

const changeEducationalProgramCharacteristic = createAction('CHANGE_EDUCATIONAL_PROGRAM_CHARACTERISTIC');

const openDialog = createAction('OPEN_CREATE_EDUCATIONAL_PROGRAM_DIALOG');
const closeDialog = createAction('CLOSE_CREATE_EDUCATIONAL_PROGRAM_DIALOG');

const changeSearchQuery = createAction('EDUCATIONAL_PROGRAM_LIST_SEARCH_QUERY');
const changeCurrentPage = createAction('EDUCATIONAL_PROGRAM_LIST_CURRENT_PAGE');
const changeAllCount = createAction('EDUCATIONAL_PROGRAM_LIST_CHANGE_ALL_COUNT');
const changeSorting = createAction('EDUCATIONAL_PROGRAM_LIST_CHANGE_SORTING');

const actions: EducationalProgramActions = {
    characteristicCreateGroup,
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