import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {educationalPlanInDirectionState} from "./types";
import {filterFields} from "./enum";

export const GENERAL_PATH = 'educationalPlanInDirection';

export const initialState: educationalPlanInDirectionState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.FILTERING]: {
        [filterFields.NUMBER_DP]: '',
        [filterFields.NAME_DP]: '',
        [filterFields.SPECIALIZATION]: '',
        [filterFields.STRUCTURAL_UNIT]: '',
        [filterFields.PREREQUISITE]: '',
        [filterFields.OUTCOMES]: '',
        [filterFields.YEAR]: '',
        [filterFields.QUALIFICATION]: '',
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.EDUCATION_PLAN_IN_DIRECTION]: [],
    [fields.EDUCATION_PLAN_IN_DIRECTION_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setEducationalPlansInDirection = (state: educationalPlanInDirectionState, {payload}: any): educationalPlanInDirectionState => ({
    ...state,
    [fields.EDUCATION_PLAN_IN_DIRECTION]: payload,
});

const changeSearchQuery = (state: educationalPlanInDirectionState, {payload}: any): educationalPlanInDirectionState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: educationalPlanInDirectionState, {payload}: any): educationalPlanInDirectionState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: educationalPlanInDirectionState, {payload}: any): educationalPlanInDirectionState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: educationalPlanInDirectionState, {payload}: any): educationalPlanInDirectionState => ({
    ...state,
    [fields.EDUCATION_PLAN_IN_DIRECTION_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: educationalPlanInDirectionState): educationalPlanInDirectionState => ({
    ...state,
    [fields.EDUCATION_PLAN_IN_DIRECTION_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: educationalPlanInDirectionState, {payload}: any): educationalPlanInDirectionState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

const changeFiltering = (state: educationalPlanInDirectionState, {payload}: any): educationalPlanInDirectionState => ({
    ...state,
    [fields.FILTERING]: {
        ...state[fields.FILTERING],
        ...payload
    },
});

export const reducer = createReducer(initialState, {
    [actions.setEducationalPlansInDirection.type]: setEducationalPlansInDirection,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.changeFiltering.type]: changeFiltering,
});