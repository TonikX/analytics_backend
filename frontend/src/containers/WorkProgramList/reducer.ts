import createReducer from "../../store/createReducer";
import {fields, filterFields} from './enum';
import actions from "./actions";

import {workProgramListState} from "./types";

export const GENERAL_PATH = 'workProgramList';

export const initialState: workProgramListState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.WORK_PROGRAM_LIST]: [],
    [fields.FILTERING]: {
        [filterFields.NUMBER_OP]: '',
        [filterFields.NAME_OP]: '',
        [filterFields.SPECIALIZATION]: '',
        [filterFields.LANGUAGE]: '',
        [filterFields.STRUCTURAL_UNIT]: '',
        [filterFields.ONLY_MY]: false,
        [filterFields.ARCHIVE]: false,
        [filterFields.PREREQUISITE]: '',
        [filterFields.OUTCOMES]: '',
        [filterFields.EDU_PROGRAM]: '',
        [filterFields.STATUS]: null,
    },
    [fields.WORK_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.WORK_PROGRAM_ID_FOR_REDIRECT]: null,
};

const setWorkProgramList = (state: workProgramListState, {payload}: any): workProgramListState => ({
    ...state,
    [fields.WORK_PROGRAM_LIST]: payload,
});

const changeSearchQuery = (state: workProgramListState, {payload}: any): workProgramListState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: workProgramListState, {payload}: any): workProgramListState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: workProgramListState, {payload}: any): workProgramListState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const setWorkProgramIdForRedirect = (state: workProgramListState, {payload}: any): workProgramListState => ({
    ...state,
    [fields.WORK_PROGRAM_ID_FOR_REDIRECT]: payload,
});

const changeFiltering = (state: workProgramListState, {payload}: any): workProgramListState => ({
    ...state,
    [fields.FILTERING]: {
        ...state[fields.FILTERING],
        ...payload
    },
});

const openDialog = (state: workProgramListState, {payload}: any): workProgramListState => ({
    ...state,
    [fields.WORK_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: workProgramListState): workProgramListState => ({
    ...state,
    [fields.WORK_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: workProgramListState, {payload}: any): workProgramListState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

const pageDown = () => initialState;

export const reducer = createReducer(initialState, {
    [actions.setWorkProgramList.type]: setWorkProgramList,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.pageDown.type]: pageDown,
    [actions.changeFiltering.type]: changeFiltering,
    [actions.setWorkProgramIdForRedirect.type]: setWorkProgramIdForRedirect,
});
