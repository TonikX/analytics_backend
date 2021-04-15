import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {IndividualEducationalPlansState} from "./types";

export const GENERAL_PATH = 'IndividualEducationalPlans';

export const initialState: IndividualEducationalPlansState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.INDIVIDUAL_EDUCATIONAL_PLANS]: [],
    [fields.SHOW_ONLY_MY]: false,
};

const setIndividualEducationalPlans = (state: IndividualEducationalPlansState, {payload}: any): IndividualEducationalPlansState => ({
    ...state,
    [fields.INDIVIDUAL_EDUCATIONAL_PLANS]: payload,
});

const changeSearchQuery = (state: IndividualEducationalPlansState, {payload}: any): IndividualEducationalPlansState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: IndividualEducationalPlansState, {payload}: any): IndividualEducationalPlansState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: IndividualEducationalPlansState, {payload}: any): IndividualEducationalPlansState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const showOnlyMy = (state: IndividualEducationalPlansState, {payload}: any): IndividualEducationalPlansState => ({
    ...state,
    [fields.SHOW_ONLY_MY]: payload,
});

const changeSorting = (state: IndividualEducationalPlansState, {payload}: any): IndividualEducationalPlansState => ({
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
    [actions.showOnlyMy.type]: showOnlyMy,
});