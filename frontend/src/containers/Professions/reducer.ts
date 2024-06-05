import createReducer from "../../store/createReducer";
import {ProfessionsFields, fields} from './enum';
import actions from "./actions";

import {professionsState} from "./types";

export const GENERAL_PATH = 'professionsList';

export const initialState: professionsState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: {
        [ProfessionsFields.ROLE]: '',
        [ProfessionsFields.TITLE]: '',
    },
    [fields.ROLE]: null,
    [fields.PROFESSIONS_LIST]: [],
    [fields.PROFESSION]: {},
    [fields.SKILLS_LIST]: [],
    [fields.PROFESSIONS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setData = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.PROFESSIONS_LIST]: payload,
});

const setSkillList = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.SKILLS_LIST]: payload,
});

const setProfession = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.PROFESSION]: payload,
});

const changeSearchQuery = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.SEARCH_QUERY]: {
        ...state[fields.SEARCH_QUERY],
        ...payload
    },
});

const changeCurrentPage = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const changeFilteredRole = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.ROLE]: payload,
});

const openDialog = (state: professionsState, {payload}: any): professionsState => ({
    ...state,
    [fields.PROFESSIONS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: professionsState): professionsState => ({
    ...state,
    [fields.PROFESSIONS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
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
    [actions.setSkills.type]: setSkillList,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.changeFilteredRole.type]: changeFilteredRole,
    [actions.setProfession.type]: setProfession,
});
