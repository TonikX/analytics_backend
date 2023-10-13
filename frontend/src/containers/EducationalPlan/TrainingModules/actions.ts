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
const getTrainingModule = createAction<any>('GET_TRAINING_MODULE');
const setTrainingModule = createAction('SET_TRAINING_MODULE');
const updateTrainingModuleFilters = createAction('UPDATE_TRAINING_MODULE_FILTERS');

const createTrainingModule = createAction<CreateTrainingModulePayload>('CREATE_TRAINING_MODULES');
const changeTrainingModule = createAction<ChangeTrainingModulePayload>('CHANGE_TRAINING_MODULES');
const changeTrainingModuleEducationalPrograms = createAction('CHANGE_TRAINING_MODULES_EDUCATIONAL_PROGRAM');
const deleteTrainingModule = createAction('DELETE_TRAINING_MODULES');

const removeFatherFromModule = createAction<any>('REMOVE_FATHER_FROM_MODULE');
const updateChildModules = createAction<any>('ADD_FATHER_TO_MODULES');

const openDialog = createAction<any>('OPEN_TRAINING_MODULE_DIALOG');
const closeDialog = createAction('CLOSE_TRAINING_MODULE_DIALOG');

const changeSearchQuery = createAction('TRAINING_MODULES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('TRAINING_MODULES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('TRAINING_MODULES_CHANGE_ALL_COUNT');
const changeSorting = createAction('TRAINING_MODULES_CHANGE_SORTING');
const changeFiltering = createAction('TRAINING_MODULES_CHANGE_FILTERING');
const resetFilters = createAction('TRAINING_MODULES_RESET_FILTERS');

const showOnlyMy = createAction<boolean>('TRAINING_MODULES_SHOW_ONLY_MY');

const changeEditorList = createAction('TRAINING_MODULES_CHANGE_EDITOR_LIST');

const deleteIntermediateCertification = createAction('TRAINING_MODULES_DELETE_INTERMEDIATE_CERTIFICATION');
const addIntermediateCertification = createAction('TRAINING_MODULES_ADD_INTERMEDIATE_CERTIFICATION');
const changeIntermediateCertification = createAction('TRAINING_MODULES_CHANGE_INTERMEDIATE_CERTIFICATION');
const getIntermediateCertification = createAction('TRAINING_MODULES_GET_INTERMEDIATE_CERTIFICATION');

const setTrainingModuleIdForRedirect = createAction('SET_TRAINING_MODULE_ID_FOR_REDIRECT');
const trainingModulesPageDown = createAction('TRAINING_MODULES_PAGE_DOWN');

const copyDisciplineBlockModule = createAction('DISCIPLINE_BLOCK_MODULE');

const actions: TrainingModulesActions = {
    trainingModulesPageDown,
    copyDisciplineBlockModule,
    resetFilters,
    setTrainingModuleIdForRedirect,
    updateTrainingModuleFilters,
    deleteIntermediateCertification,
    addIntermediateCertification,
    changeIntermediateCertification,
    getIntermediateCertification,
    changeTrainingModuleEducationalPrograms,
    changeFiltering,
    getTrainingModulesList,
    setTrainingModulesList,
    getTrainingModule,
    setTrainingModule,
    removeFatherFromModule,
    updateChildModules,

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
