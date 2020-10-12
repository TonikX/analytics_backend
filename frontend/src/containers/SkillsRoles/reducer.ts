import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {rolesState} from "./types";

export const GENERAL_PATH = 'skillsRolesPath';

export const initialState: rolesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: "",
    [fields.ROLES_LIST]: [],
};

const setData = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.ROLES_LIST]: payload,
});

const changeSearchQuery = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const changeSorting = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setRolesList.type]: setData,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting
});