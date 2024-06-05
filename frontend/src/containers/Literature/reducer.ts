import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {literatureState} from "./types";

export const GENERAL_PATH = 'literature';

export const initialState: literatureState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.LITERATURE_LIST]: [],
    [fields.LITERATURE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setData = (state: literatureState, {payload}: any): literatureState => ({
    ...state,
    [fields.LITERATURE_LIST]: payload,
});

const changeSearchQuery = (state: literatureState, {payload}: any): literatureState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: literatureState, {payload}: any): literatureState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: literatureState, {payload}: any): literatureState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: literatureState, {payload}: any): literatureState => ({
    ...state,
    [fields.LITERATURE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: literatureState): literatureState => ({
    ...state,
    [fields.LITERATURE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: literatureState, {payload}: any): literatureState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setLiterature.type]: setData,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});
