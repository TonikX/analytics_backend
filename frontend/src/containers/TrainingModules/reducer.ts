import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {trainingModulesState, OpenDialogPayload} from "./types";

export const GENERAL_PATH = 'trainingModule';

export const initialState: trainingModulesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: "",
    [fields.TRAINING_MODULES_LIST]: [],
    [fields.TRAINING_MODULE_DIALOG]: {
        [fields.IS_OPEN_TRAINING_MODULE_DIALOG]: false,
        [fields.TRAINING_MODULE_DIALOG_DATA]: {}
    },
};

const setData = (state: trainingModulesState, {payload}: any): trainingModulesState => ({
    ...state,
    [fields.TRAINING_MODULES_LIST]: payload,
});

const changeSearchQuery = (state: trainingModulesState, {payload}: any): trainingModulesState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: trainingModulesState, {payload}: any): trainingModulesState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: trainingModulesState, {payload}: any): trainingModulesState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: trainingModulesState, {payload}: {payload: OpenDialogPayload}): trainingModulesState => ({
    ...state,
    [fields.TRAINING_MODULE_DIALOG]: {
        [fields.IS_OPEN_TRAINING_MODULE_DIALOG]: true,
        [fields.TRAINING_MODULE_DIALOG_DATA]: payload.data
    },
});

const closeDialog = (state: trainingModulesState): trainingModulesState => ({
    ...state,
    [fields.TRAINING_MODULE_DIALOG]: initialState[fields.TRAINING_MODULE_DIALOG],
});

const changeSorting = (state: trainingModulesState, {payload}: any): trainingModulesState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setTrainingModulesList.type]: setData,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
});