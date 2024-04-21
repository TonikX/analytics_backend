import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {individualTrajectoriesState} from "./types";
import {filterFields} from "./enum";

export const GENERAL_PATH = 'IndividualTrajectories';

export const initialState: individualTrajectoriesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.INDIVIDUAL_TRAJECTORIES]: [],
    [fields.SHOW_ONLY_MY]: false,
    [fields.FILTERING]: {
        [filterFields.NUMBER_OP]: '',
        [filterFields.NAME_OP]: '',
        [filterFields.SPECIALIZATION]: '',
        [filterFields.LANGUAGE]: '',
    },
};

const setIndividualTrajectories = (state: individualTrajectoriesState, {payload}: any): individualTrajectoriesState => ({
    ...state,
    [fields.INDIVIDUAL_TRAJECTORIES]: payload,
});

const changeSearchQuery = (state: individualTrajectoriesState, {payload}: any): individualTrajectoriesState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: individualTrajectoriesState, {payload}: any): individualTrajectoriesState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: individualTrajectoriesState, {payload}: any): individualTrajectoriesState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const showOnlyMy = (state: individualTrajectoriesState, {payload}: any): individualTrajectoriesState => ({
    ...state,
    [fields.SHOW_ONLY_MY]: payload,
});

const changeSorting = (state: individualTrajectoriesState, {payload}: any): individualTrajectoriesState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

const changeFiltering = (state: individualTrajectoriesState, {payload}: any): individualTrajectoriesState => ({
    ...state,
    [fields.FILTERING]: {
        ...state[fields.FILTERING],
        ...payload
    },
});

export const reducer = createReducer(initialState, {
    [actions.setIndividualTrajectories.type]: setIndividualTrajectories,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.showOnlyMy.type]: showOnlyMy,
    [actions.changeFiltering.type]: changeFiltering,
});
