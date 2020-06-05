import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {trainingEntitiesState} from "./types";

export const GENERAL_PATH = 'trainingEntities';

export const initialState: trainingEntitiesState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.TRAINING_ENTITIES_LIST]: [],
    [fields.TRAINING_ENTITIES_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setData = (state: trainingEntitiesState, {payload}: any): trainingEntitiesState => ({
    ...state,
    [fields.TRAINING_ENTITIES_LIST]: payload,
});

const changeSearchQuery = (state: trainingEntitiesState, {payload}: any): trainingEntitiesState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: trainingEntitiesState, {payload}: any): trainingEntitiesState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: trainingEntitiesState, {payload}: any): trainingEntitiesState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: trainingEntitiesState, {payload}: any): trainingEntitiesState => ({
    ...state,
    [fields.TRAINING_ENTITIES_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: trainingEntitiesState): trainingEntitiesState => ({
    ...state,
    [fields.TRAINING_ENTITIES_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: trainingEntitiesState, {payload}: any): trainingEntitiesState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setTrainingEntities.type]: setData,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
});