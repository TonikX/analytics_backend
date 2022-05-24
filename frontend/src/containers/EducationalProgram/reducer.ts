import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {educationalProgramState} from "./types";

export const GENERAL_PATH = 'educationalProgram';

export const initialState: educationalProgramState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.EDUCATION_PROGRAM_CHARACTERISTIC]: {},
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.EDUCATION_PROGRAM_LIST]: [],
    [fields.KINDS_OF_ACTIVITIES]: [],
    [fields.OBJECTS_OF_ACTIVITIES]: [],
    [fields.TASKS_TYPES]: [],
    [fields.EDUCATION_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.COMPETENCE_MATRIX]: {}
};

const setEducationalProgramList = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.EDUCATION_PROGRAM_LIST]: payload,
});

const setEducationalProgramCharacteristic = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.EDUCATION_PROGRAM_CHARACTERISTIC]: payload,
});

const setCompetenceMatrix = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.COMPETENCE_MATRIX]: payload,
});


const changeSearchQuery = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.EDUCATION_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: educationalProgramState): educationalProgramState => ({
    ...state,
    [fields.EDUCATION_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

const setKindsOfActivity = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.KINDS_OF_ACTIVITIES]: payload
});

const setObjectsOfActivity = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.OBJECTS_OF_ACTIVITIES]: payload
});

const setTasksTypes = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.TASKS_TYPES]: payload
});

export const reducer = createReducer(initialState, {
    [actions.setEducationalProgramList.type]: setEducationalProgramList,
    [actions.setEducationalProgramCharacteristic.type]: setEducationalProgramCharacteristic,
    [actions.setCompetenceMatrix.type]: setCompetenceMatrix,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.setKindsOfActivity.type]: setKindsOfActivity,
    [actions.setObjectsOfActivity.type]: setObjectsOfActivity,
    [actions.setTasksTypes.type]: setTasksTypes,
});
