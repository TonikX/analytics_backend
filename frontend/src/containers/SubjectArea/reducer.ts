import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {subjectAreaState} from "./types";

export const GENERAL_PATH = 'subjectArea';

export const initialState: subjectAreaState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.SUBJECT_AREA_LIST]: [],
    [fields.SUBJECT_AREA_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setData = (state: subjectAreaState, {payload}: any): subjectAreaState => ({
    ...state,
    [fields.SUBJECT_AREA_LIST]: payload,
});

const changeSearchQuery = (state: subjectAreaState, {payload}: any): subjectAreaState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: subjectAreaState, {payload}: any): subjectAreaState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: subjectAreaState, {payload}: any): subjectAreaState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: subjectAreaState, {payload}: any): subjectAreaState => ({
    ...state,
    [fields.SUBJECT_AREA_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: subjectAreaState): subjectAreaState => ({
    ...state,
    [fields.SUBJECT_AREA_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: subjectAreaState, {payload}: any): subjectAreaState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setSubjectArea.type]: setData,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});
