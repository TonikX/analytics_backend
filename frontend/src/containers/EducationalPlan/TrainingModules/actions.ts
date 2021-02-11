import {createAction} from "@reduxjs/toolkit";

import {ChangeTrainingModulePayload, CreateTrainingModulePayload, OpenDialogPayload, TrainingModulesActions} from './types';

const getTrainingModulesList = createAction('GET_TRAINING_MODULES');
const setTrainingModulesList = createAction('SET_TRAINING_MODULES');

const createTrainingModule = createAction<CreateTrainingModulePayload>('CREATE_TRAINING_MODULES');
const changeTrainingModule = createAction<ChangeTrainingModulePayload>('CHANGE_TRAINING_MODULES');
const deleteTrainingModule = createAction('DELETE_TRAINING_MODULES');

const openDialog = createAction<OpenDialogPayload>('OPEN_TRAINING_MODULE_DIALOG');
const closeDialog = createAction('CLOSE_TRAINING_MODULE_DIALOG');

const changeSearchQuery = createAction('TRAINING_MODULES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('TRAINING_MODULES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('TRAINING_MODULES_CHANGE_ALL_COUNT');
const changeSorting = createAction('TRAINING_MODULES_CHANGE_SORTING');

const actions: TrainingModulesActions = {
    getTrainingModulesList,
    setTrainingModulesList,

    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,

    createTrainingModule,
    changeTrainingModule,
    deleteTrainingModule,

    openDialog,
    closeDialog,
}

export default actions;