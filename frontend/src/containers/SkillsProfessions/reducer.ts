import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {professionsState} from "./types";

export const GENERAL_PATH = 'skillsProfessionsPath';

export const initialState: professionsState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: "",
    [fields.PROFESSIONS_LIST]: [],
};

const setData = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.PROFESSIONS_LIST]: payload,
});

const changeSearchQuery = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const changeSorting = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setProfessionsList.type]: setData,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting
});