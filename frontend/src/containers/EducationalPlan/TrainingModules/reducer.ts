import createReducer from "../../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {trainingModulesState, OpenDialogPayload} from "./types";

export const GENERAL_PATH = 'trainingModule';

export const initialState: trainingModulesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '-id',
        [fields.SORTING_MODE]: ''
    },
    [fields.FILTERS]: {
        [fields.FILTER_ID]: '',
        [fields.FILTER_MODULE_ISU_ID]: '',
        [fields.FILTER_MODULE_NAME]: '',
        [fields.FILTER_MODULE_DISCIPLINE_NAME]: '',
        [fields.FILTER_MODULE_AVAILABLE_FOR_ALL]: true,
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: "",
    [fields.TRAINING_MODULES_LIST]: [],
    [fields.CREATE_TRAINING_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.ADD_TRAINING_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {
            moduleId: 0,
            trainingModules: []
        }
    },
    [fields.EVALUATION_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    },
    [fields.ADD_EDUCATIONAL_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
    },
    [fields.EVALUATION_DESCRIPTION_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: ''
    },
    [fields.DETAIL_TRAINING_MODULE]: {},
    [fields.SHOW_ONLY_MY]: false,
    [fields.TRAINIG_MODULE_ID_FOR_REDIRECT]: null,
};

const setData = (state: trainingModulesState, {payload}: any): trainingModulesState => ({
    ...state,
    [fields.TRAINING_MODULES_LIST]: payload,
});

const setTrainingModule = (state: trainingModulesState, {payload}: any): trainingModulesState => ({
    ...state,
    [fields.DETAIL_TRAINING_MODULE]: payload,
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
    [payload.dialog]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload.data
    },
});

const closeDialog = (state: trainingModulesState): trainingModulesState => ({
    ...state,
    [fields.CREATE_TRAINING_MODULE_DIALOG]: initialState[fields.CREATE_TRAINING_MODULE_DIALOG],
    [fields.EVALUATION_MODULE_DIALOG]: initialState[fields.EVALUATION_MODULE_DIALOG],
    [fields.EVALUATION_DESCRIPTION_MODULE_DIALOG]: initialState[fields.EVALUATION_DESCRIPTION_MODULE_DIALOG],
    [fields.ADD_TRAINING_MODULE_DIALOG]: initialState[fields.ADD_TRAINING_MODULE_DIALOG],
    [fields.ADD_EDUCATIONAL_PROGRAM_DIALOG]: initialState[fields.ADD_EDUCATIONAL_PROGRAM_DIALOG],
});

const changeSorting = (state: trainingModulesState, {payload}: any): trainingModulesState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

const updateTrainingModuleFilters = (state: trainingModulesState, {payload}: any): trainingModulesState => ({
    ...state,
    [fields.FILTERS]: {
        ...state[fields.FILTERS],
        [payload.field]: payload.value,
    }
});

const showOnlyMy = (state: trainingModulesState, {payload}: {payload: boolean}): trainingModulesState => ({
    ...state,
    [fields.SHOW_ONLY_MY]: payload
});

const setTrainingModuleIdForRedirect = (state: trainingModulesState, {payload}: {payload: number|null}): trainingModulesState => ({
    ...state,
    [fields.TRAINIG_MODULE_ID_FOR_REDIRECT]: payload
});

export const reducer = createReducer(initialState, {
    [actions.setTrainingModulesList.type]: setData,
    [actions.setTrainingModule.type]: setTrainingModule,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.showOnlyMy.type]: showOnlyMy,
    [actions.updateTrainingModuleFilters.type]: updateTrainingModuleFilters,
    [actions.setTrainingModuleIdForRedirect.type]: setTrainingModuleIdForRedirect,
});
