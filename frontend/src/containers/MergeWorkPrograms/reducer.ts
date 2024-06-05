import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {mergeWorkProgramsState} from "./types";

export const GENERAL_PATH = 'mergeWorkPrograms';

export const initialState: mergeWorkProgramsState = {
    [fields.WORK_PROGRAM_LIST]: [],
    [fields.SEARCH_QUERY]: ''
};

const setData = (state: mergeWorkProgramsState, {payload}: any): mergeWorkProgramsState => {
    return ({
        ...state,
        [fields.WORK_PROGRAM_LIST]: payload,
    });
};

const changeSearchQuery = (state: mergeWorkProgramsState, {payload}: any): mergeWorkProgramsState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

export const reducer = createReducer(initialState, {
    [actions.setWorkProgramsList.type]: setData,
    [actions.setSearchQuery.type]: changeSearchQuery,
});
