import createReducer from "../../store/createReducer";
import {RolesFields, fields} from './enum';
import actions from "./actions";

import {rolesState} from "./types";

export const GENERAL_PATH = 'rolesList';

export const initialState: rolesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: {
        [RolesFields.ROLE]: '',
        [RolesFields.TITLE]: '',
    },
    [fields.ROLE]: null,
    [fields.ROLES_LIST]: [],
    [fields.ROLES]: {},
    [fields.SKILLS_LIST]: [],
    [fields.ROLES_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setData = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.ROLES_LIST]: payload,
});

const setSkillList = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.SKILLS_LIST]: payload,
});

const setRole = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.ROLE]: payload,
});

const changeSearchQuery = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.SEARCH_QUERY]: {
        ...state[fields.SEARCH_QUERY],
        ...payload
    },
});

const changeCurrentPage = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const changeFilteredRole = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.ROLE]: payload,
});

const openDialog = (state: rolesState, {payload}: any): rolesState => ({
    ...state,
    [fields.ROLES_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: rolesState): rolesState => ({
    ...state,
    [fields.ROLES_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
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
    [actions.setSkills.type]: setSkillList,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.changeFilteredRole.type]: changeFilteredRole,
    [actions.setRole.type]: setRole,
});