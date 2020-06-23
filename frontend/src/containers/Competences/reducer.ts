import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {competenceState} from "./types";

export const GENERAL_PATH = 'competences';

export const initialState: competenceState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.COMPETENCE_LIST]: [],
    [fields.COMPETENCE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setCompetences = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.COMPETENCE_LIST]: payload,
});

const changeSearchQuery = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.COMPETENCE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: competenceState): competenceState => ({
    ...state,
    [fields.COMPETENCE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setCompetences.type]: setCompetences,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});