import createReducer from "../../store/createReducer";
import {fields, filterFields} from './enum';
import actions from "./actions";

import {personalitiesState} from "./types";

export const GENERAL_PATH = 'personalities';

export const initialState: personalitiesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: '',
    },
    [fields.FILTERING]: {
        [filterFields.FILTERING_SEARCH_QUERY]: '',
        [filterFields.FILTERING_GROUPS]: ''
    },
    [fields.ALL_COUNT]: 1,
    [fields.CURRENT_PAGE]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.PERSONALITIES_LIST]: []
}

const setPersonalities = (state: personalitiesState, {payload}: any): personalitiesState => {
    // console.log("reduc: ", payload)
    return{
    ...state,
    [fields.PERSONALITIES_LIST]: payload
    }
}

const changeSearchQuery = (state: personalitiesState, {payload}: any): personalitiesState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: personalitiesState, {payload}: any): personalitiesState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: personalitiesState, {payload}: any): personalitiesState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const changeSorting = (state: personalitiesState, {payload}: any): personalitiesState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

const changeFiltering = (state: personalitiesState, {payload}: any): personalitiesState => ({
    ...state,
    [fields.FILTERING]: {
        [filterFields.FILTERING_SEARCH_QUERY]: state[fields.FILTERING][filterFields.FILTERING_SEARCH_QUERY],
        [filterFields.FILTERING_GROUPS]: payload.groups
    }
})

const changeFilterSearchQuery = (state: personalitiesState, {payload}: any): personalitiesState => ({
    ...state,
    [fields.FILTERING]: {
        [filterFields.FILTERING_GROUPS]: state[fields.FILTERING][filterFields.FILTERING_GROUPS],
        [filterFields.FILTERING_SEARCH_QUERY]: payload,
    }
})

export const reducer = createReducer(initialState, {
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeFilterSearchQuery.type]: changeFilterSearchQuery,
    [actions.changeFiltering.type]: changeFiltering,
    [actions.setPersonalities.type]: setPersonalities,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeSorting.type]: changeSorting
})