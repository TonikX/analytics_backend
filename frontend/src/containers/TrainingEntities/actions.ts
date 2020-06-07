import {createAction} from "@reduxjs/toolkit";

import {TrainingEntitiesActions} from './types';

const getTrainingEntities = createAction<string>('GET_TRAINING_ENTITIES');
const setTrainingEntities = createAction<string>('SET_TRAINING_ENTITIES');

const createNewTrainingEntities = createAction<string>('CREATE_NEW_TRAINING_ENTITIES');
const changeTrainingEntities = createAction<string>('CHANGE_TRAINING_ENTITIES');
const deleteTrainingEntities = createAction<string>('DELETE_TRAINING_ENTITIES');

const openDialog = createAction<string>('OPEN_TRAINING_ENTITIES_DIALOG');
const closeDialog = createAction<string>('CLOSE_TRAINING_ENTITIES_DIALOG');

const changeSearchQuery = createAction<string>('TRAINING_ENTITIES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('TRAINING_ENTITIES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('TRAINING_ENTITIES_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('TRAINING_ENTITIES_CHANGE_SORTING');

const actions: TrainingEntitiesActions = {
    getTrainingEntities,
    setTrainingEntities,
    createNewTrainingEntities,
    changeTrainingEntities,
    deleteTrainingEntities,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;