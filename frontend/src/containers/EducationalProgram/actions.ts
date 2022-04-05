import {createAction} from "@reduxjs/toolkit";

import {
    CharacteristicAddCompetenceActionType,
    CharacteristicAddIndicatorActionType,
    CharacteristicAddProfessionalStandardActionType,
    CharacteristicCreateGroupActionType,
    CharacteristicDeleteCompetenceActionType,
    CharacteristicDeleteGroupActionType,
    CharacteristicDeleteIndicatorActionType,
    CharacteristicDeleteProfessionalStandardActionType,
    CharacteristicSaveCompetenceLaborFunctionActionType,
    CharacteristicSaveGroupTitleActionType,
    EducationalProgramActions
} from './types';

const getEducationalProgramList = createAction('GET_EDUCATIONAL_PROGRAM_LIST');
const setEducationalProgramList = createAction('SET_EDUCATIONAL_PROGRAM_LIST');
const createEducationalProgram = createAction('CREATE_EDUCATIONAL_PROGRAM');
const deleteEducationalProgram = createAction('DELETE_EDUCATIONAL_PROGRAM');
const changeEducationalProgram = createAction('CHANGE_EDUCATIONAL_PROGRAM');

const getEducationalProgramCharacteristic = createAction('GET_EDUCATIONAL_PROGRAM_CHARACTERISTIC');
const setEducationalProgramCharacteristic = createAction('SET_EDUCATIONAL_PROGRAM_CHARACTERISTIC');

const characteristicCreateGroup = createAction<CharacteristicCreateGroupActionType>('CHARACTERISTIC_COMPETENCIES_CREATE_GROUP');
const characteristicSaveGroupTitle = createAction<CharacteristicSaveGroupTitleActionType>('CHARACTERISTIC_COMPETENCIES_SAVE_GROUP_TITLE');

const characteristicSaveCompetence = createAction<CharacteristicAddCompetenceActionType>('CHARACTERISTIC_COMPETENCIES_SAVE_COMPETENCE');
const characteristicDeleteCompetence = createAction<CharacteristicDeleteCompetenceActionType>('CHARACTERISTIC_COMPETENCIES_DELETE_COMPETENCE');
const characteristicSaveCompetenceLaborFunction = createAction<CharacteristicSaveCompetenceLaborFunctionActionType>('CHARACTERISTIC_COMPETENCIES_SAVE_COMPETENCE_LABOR_FUNCTION');

const characteristicSaveCompetenceKindsOfActivity = createAction<any>('CHARACTERISTIC_COMPETENCIES_SAVE_COMPETENCE_KINDS_OF_ACTIVITY');

const characteristicSaveIndicator = createAction<CharacteristicAddIndicatorActionType>('CHARACTERISTIC_COMPETENCIES_SAVE_INDICATOR');
const characteristicDeleteIndicator = createAction<CharacteristicDeleteIndicatorActionType>('CHARACTERISTIC_COMPETENCIES_DELETE_INDICATOR');

const characteristicSaveKindOfActivity = createAction<any>('CHARACTERISTIC_COMPETENCIES_SAVE_KIND_OF_ACTIVITY');
const characteristicDeleteKindOfActivity = createAction<any>('CHARACTERISTIC_COMPETENCIES_DELETE_KIND_OF_ACTIVITY');

const characteristicSaveProfessionalStandard = createAction<CharacteristicAddProfessionalStandardActionType>('CHARACTERISTIC_COMPETENCIES_SAVE_PROFESSIONAL_STANDARD');
const characteristicDeleteProfessionalStandard = createAction<CharacteristicDeleteProfessionalStandardActionType>('CHARACTERISTIC_COMPETENCIES_DELETE_PROFESSIONAL_STANDARD');

const characteristicDeleteGroup = createAction<CharacteristicDeleteGroupActionType>('CHARACTERISTIC_COMPETENCIES_DELETE_GROUP');

const changeEducationalProgramCharacteristic = createAction('CHANGE_EDUCATIONAL_PROGRAM_CHARACTERISTIC');

const openDialog = createAction('OPEN_CREATE_EDUCATIONAL_PROGRAM_DIALOG');
const closeDialog = createAction('CLOSE_CREATE_EDUCATIONAL_PROGRAM_DIALOG');

const changeSearchQuery = createAction('EDUCATIONAL_PROGRAM_LIST_SEARCH_QUERY');
const changeCurrentPage = createAction('EDUCATIONAL_PROGRAM_LIST_CURRENT_PAGE');
const changeAllCount = createAction('EDUCATIONAL_PROGRAM_LIST_CHANGE_ALL_COUNT');
const changeSorting = createAction('EDUCATIONAL_PROGRAM_LIST_CHANGE_SORTING');

const createKindOfActivity = createAction('CREATE_KIND_OF_ACTIVITY');
const getKindsOfActivity = createAction('GET_KINDS_OF_ACTIVITY');
const setKindsOfActivity = createAction('SET_KINDS_OF_ACTIVITY');

const actions: EducationalProgramActions = {
    characteristicSaveKindOfActivity,
    characteristicDeleteKindOfActivity,
    createKindOfActivity,
    getKindsOfActivity,
    setKindsOfActivity,

    characteristicSaveProfessionalStandard,
    characteristicDeleteProfessionalStandard,

    characteristicCreateGroup,
    characteristicSaveGroupTitle,

    characteristicSaveCompetence,
    characteristicDeleteCompetence,
    characteristicSaveCompetenceLaborFunction,
    characteristicSaveCompetenceKindsOfActivity,

    characteristicSaveIndicator,
    characteristicDeleteIndicator,
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