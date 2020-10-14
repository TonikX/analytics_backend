import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {expertisesState} from "./types";

export const GENERAL_PATH = 'expertisesPath';

export const initialState: expertisesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: "",
    [fields.EXPERTISES_LIST]: [],
};

const setData = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.EXPERTISES_LIST]: payload,
});

const changeSearchQuery = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const changeSorting = (state: expertisesState, {payload}: any): expertisesState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setExpertisesList.type]: setData,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting
});