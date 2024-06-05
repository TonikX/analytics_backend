import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {educationalStandardsState} from "./types";

export const GENERAL_PATH = 'educational_standards';

export const initialState: educationalStandardsState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.EDUCATIONAL_STANDARD_LIST]: [],
    [fields.EDUCATIONAL_STANDARD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.EDUCATIONAL_STANDARD]: {},
};

const setEducationalStandards = (state: educationalStandardsState, {payload}: any): educationalStandardsState => ({
    ...state,
    [fields.EDUCATIONAL_STANDARD_LIST]: payload,
});

const changeSearchQuery = (state: educationalStandardsState, {payload}: any): educationalStandardsState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: educationalStandardsState, {payload}: any): educationalStandardsState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: educationalStandardsState, {payload}: any): educationalStandardsState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: educationalStandardsState, {payload}: any): educationalStandardsState => ({
    ...state,
    [fields.EDUCATIONAL_STANDARD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: educationalStandardsState): educationalStandardsState => ({
    ...state,
    [fields.EDUCATIONAL_STANDARD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: educationalStandardsState, {payload}: any): educationalStandardsState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

const setEducationalStandard = (state: educationalStandardsState, {payload}: any): educationalStandardsState => ({
    ...state,
    [fields.EDUCATIONAL_STANDARD]: payload,
});

export const reducer = createReducer(initialState, {
    [actions.setEducationalStandards.type]: setEducationalStandards,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.setEducationalStandard.type]: setEducationalStandard,
});
