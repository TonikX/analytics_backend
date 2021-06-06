import {createAction} from "@reduxjs/toolkit";

import {
    ChangeTrainingModulePayload,
    CreateTrainingModulePayload,
    GetTrainingModulePayload,
    OpenDialogPayload,
    TrainingModulesActions
} from './types';

const getTrainingModulesList = createAction('GET_TRAINING_MODULES');
const setTrainingModulesList = createAction('SET_TRAINING_MODULES');
const getTrainingModule = createAction<GetTrainingModulePayload>('GET_TRAINING_MODULE');
const setTrainingModule = createAction('SET_TRAINING_MODULE');

const createTrainingModule = createAction<CreateTrainingModulePayload>('CREATE_TRAINING_MODULES');
const changeTrainingModule = createAction<ChangeTrainingModulePayload>('CHANGE_TRAINING_MODULES');
const deleteTrainingModule = createAction('DELETE_TRAINING_MODULES');

const openDialog = createAction<OpenDialogPayload>('OPEN_TRAINING_MODULE_DIALOG');
const closeDialog = createAction('CLOSE_TRAINING_MODULE_DIALOG');

const changeSearchQuery = createAction('TRAINING_MODULES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('TRAINING_MODULES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('TRAINING_MODULES_CHANGE_ALL_COUNT');
const changeSorting = createAction('TRAINING_MODULES_CHANGE_SORTING');
const changeFiltering = createAction('TRAINING_MODULES_CHANGE_FILTERING');

const showOnlyMy = createAction<boolean>('TRAINING_MODULES_SHOW_ONLY_MY');

const changeEditorList = createAction('TRAINING_MODULES_CHANGE_EDITOR_LIST');

const actions: TrainingModulesActions = {
    changeFiltering,
    getTrainingModulesList,
    setTrainingModulesList,
    getTrainingModule,
    setTrainingModule,

    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,

    createTrainingModule,
    changeTrainingModule,
    deleteTrainingModule,

    openDialog,
    closeDialog,

    showOnlyMy,

    changeEditorList,
}

export default actions;
