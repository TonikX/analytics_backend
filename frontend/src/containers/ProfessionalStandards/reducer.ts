import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {professionalStandardsState} from "./types";

export const GENERAL_PATH = 'professional_standards';

export const initialState: professionalStandardsState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.PROFESSIONAL_STANDARD_LIST]: [],
    [fields.PROFESSIONAL_STANDARD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setProfessionalStandards = (state: professionalStandardsState, {payload}: any): professionalStandardsState => {

    return ({
        ...state,
        [fields.PROFESSIONAL_STANDARD_LIST]: payload,
    });
}

const changeSearchQuery = (state: professionalStandardsState, {payload}: any): professionalStandardsState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: professionalStandardsState, {payload}: any): professionalStandardsState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: professionalStandardsState, {payload}: any): professionalStandardsState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: professionalStandardsState, {payload}: any): professionalStandardsState => ({
    ...state,
    [fields.PROFESSIONAL_STANDARD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: professionalStandardsState): professionalStandardsState => ({
    ...state,
    [fields.PROFESSIONAL_STANDARD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: professionalStandardsState, {payload}: any): professionalStandardsState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setProfessionalStandards.type]: setProfessionalStandards,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});