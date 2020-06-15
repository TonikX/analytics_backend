import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {educationalPlanState} from "./types";

export const GENERAL_PATH = 'educationalPlan';

export const initialState: educationalPlanState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.EDUCATIONAL_PLAN_LIST]: [],
    [fields.EDUCATIONAL_PLAN_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setEducationalPlan = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_LIST]: payload,
});

const changeSearchQuery = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: educationalPlanState): educationalPlanState => ({
    ...state,
    [fields.EDUCATIONAL_PLAN_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: educationalPlanState, {payload}: any): educationalPlanState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setEducationalPlan.type]: setEducationalPlan,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});