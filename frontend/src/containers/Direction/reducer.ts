import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {directionState} from "./types";

export const GENERAL_PATH = 'directions';

export const initialState: directionState = {
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

const setEducationalProgram = (state: directionState, {payload}: any): directionState => ({
    ...state,
    [fields.EDUCATIONAL_PROGRAM_LIST]: payload,
});

const changeSearchQuery = (state: directionState, {payload}: any): directionState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: directionState, {payload}: any): directionState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: directionState, {payload}: any): directionState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: directionState, {payload}: any): directionState => ({
    ...state,
    [fields.EDUCATIONAL_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: directionState): directionState => ({
    ...state,
    [fields.EDUCATIONAL_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: directionState, {payload}: any): directionState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setDirections.type]: setEducationalProgram,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});