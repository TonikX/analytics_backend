import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {individualEducationalPlansState} from "./types";

export const GENERAL_PATH = 'IndividualEducationalPlans';

export const initialState: individualEducationalPlansState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.INDIVIDUAL_EDUCATIONAL_PLANS]: [],
};

const setIndividualEducationalPlans = (state: individualEducationalPlansState, {payload}: any): individualEducationalPlansState => ({
    ...state,
    [fields.INDIVIDUAL_EDUCATIONAL_PLANS]: payload,
});

const changeSearchQuery = (state: individualEducationalPlansState, {payload}: any): individualEducationalPlansState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: individualEducationalPlansState, {payload}: any): individualEducationalPlansState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: individualEducationalPlansState, {payload}: any): individualEducationalPlansState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const changeSorting = (state: individualEducationalPlansState, {payload}: any): individualEducationalPlansState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setIndividualEducationalPlans.type]: setIndividualEducationalPlans,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});
