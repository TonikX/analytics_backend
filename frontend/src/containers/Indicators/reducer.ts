import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {indicatorsState} from "./types";

export const GENERAL_PATH = 'indicator';

export const initialState: indicatorsState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.INDICATORS_LIST]: [],
    [fields.INDICATORS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setIndicators = (state: indicatorsState, {payload}: any): indicatorsState => ({
    ...state,
    [fields.INDICATORS_LIST]: payload,
});

const changeSearchQuery = (state: indicatorsState, {payload}: any): indicatorsState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: indicatorsState, {payload}: any): indicatorsState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: indicatorsState, {payload}: any): indicatorsState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: indicatorsState, {payload}: any): indicatorsState => ({
    ...state,
    [fields.INDICATORS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: indicatorsState): indicatorsState => ({
    ...state,
    [fields.INDICATORS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: indicatorsState, {payload}: any): indicatorsState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setIndicators.type]: setIndicators,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});