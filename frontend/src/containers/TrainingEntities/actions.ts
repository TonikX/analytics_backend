import {createAction} from "@reduxjs/toolkit";

import {TrainingEntitiesActions} from './types';

const getTrainingEntities = createAction('GET_TRAINING_ENTITIES');
const setTrainingEntities = createAction('SET_TRAINING_ENTITIES');

const createNewTrainingEntities = createAction('CREATE_NEW_TRAINING_ENTITIES');
const changeTrainingEntities = createAction('CHANGE_TRAINING_ENTITIES');
const deleteTrainingEntities = createAction('DELETE_TRAINING_ENTITIES');

const openDialog = createAction('OPEN_TRAINING_ENTITIES_DIALOG');
const closeDialog = createAction('CLOSE_TRAINING_ENTITIES_DIALOG');

const changeSearchQuery = createAction('TRAINING_ENTITIES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('TRAINING_ENTITIES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('TRAINING_ENTITIES_CHANGE_ALL_COUNT');
const changeSorting = createAction('TRAINING_ENTITIES_CHANGE_SORTING');
const changeSubjectId = createAction('TRAINING_ENTITIES_CHANGE_SUBJECT_ID');

const actions: TrainingEntitiesActions = {
    changeSubjectId,
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