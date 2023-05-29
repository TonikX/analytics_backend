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
    [fields.SEARCH_CODE]: '',
    [fields.FILTER_ONLY_WITH_STANDARD]: false,
    [fields.FILTER_ACADEMIC_PLAN]: undefined,
    [fields.INDICATORS]: [],
    [fields.COMPETENCE]: {},
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

const setCompetence = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.COMPETENCE]: payload,
});

const setIndicators = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.INDICATORS]: payload,
});

const changeSearchQuery = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCodeQuery = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.SEARCH_CODE]: payload,
});

const changeFilterOnlyWithStandard = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.FILTER_ONLY_WITH_STANDARD]: payload,
});

const changeFilterAcademicPlan = (state: competenceState, {payload}: any): competenceState => ({
    ...state,
    [fields.FILTER_ACADEMIC_PLAN]: payload,
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
    [actions.setCompetence.type]: setCompetence,
    [actions.setIndicators.type]: setIndicators,
    [actions.setCompetences.type]: setCompetences,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCodeQuery.type]: changeCodeQuery,
    [actions.changeFilterOnlyWithStandard.type]: changeFilterOnlyWithStandard,
    [actions.changeFilterAcademicPlan.type]: changeFilterAcademicPlan,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});
