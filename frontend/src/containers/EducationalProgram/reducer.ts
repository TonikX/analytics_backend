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
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.EDUCATIONAL_PROGRAM_LIST]: [],
    [fields.EDUCATIONAL_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setEducationalProgram = (state: educationalProgramState, {payload}: any): educationalProgramState => ({
    ...state,
    [fields.EDUCATIONAL_PROGRAM_LIST]: payload,
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
    [fields.EDUCATIONAL_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: educationalProgramState): educationalProgramState => ({
    ...state,
    [fields.EDUCATIONAL_PROGRAM_DIALOG]: {
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

export const reducer = createReducer(initialState, {
    [actions.setEducationalProgram.type]: setEducationalProgram,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});