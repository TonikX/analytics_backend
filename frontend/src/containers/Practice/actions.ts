import {createAction} from "@reduxjs/toolkit";

import {PracticeActions} from './types';

const getPractice = createAction('GET_PRACTICE');
const setPractice = createAction('SET_PRACTICE');
const setField = createAction('SET_FIELD_PRACTICE');
const saveField = createAction('SAVE_FIELD_PRACTICE');
const getTemplateText = createAction('GET_TEMPLATE_TEXT_PRACTICE');
const setTemplateText = createAction('SET_TEMPLATE_TEXT_PRACTICE');
const setError = createAction('PRACTICE_SET_ERROR');
const setErroredFields = createAction('PRACTICE_SET_ERRORED_FIELDS');
const addToErroredFields = createAction('PRACTICE_ADD_TO_ERRORED_FIELDS');
const removeFromErroredFields = createAction('PRACTICE_REMOVE_FROM_ERRORED_FIELDS');
const showErrors = createAction('PRACTICE_SHOW_ERRORS');
const showErroredField = createAction('PRACTICE_SHOW_ERRORED_FIELD');
const hideErroredField = createAction('PRACTICE_HIDE_ERRORED_FIELD');
const createExpertise = createAction('PRACTICE_CREATE_EXPERTISE');
const approvePractice = createAction('APPROVE_PRACTICE');
const sendPracticeToRework = createAction('SEND_PRACTICE_TO_REWORK');
const getComments = createAction('GET_COMMENTS_PRACTICE');
const setComments = createAction('SET_COMMENTS_PRACTICE');
const sendComment = createAction('SEND_COMMENT_PRACTICE');
const openDialog = createAction('OPEN_DIALOG');
const closeDialog = createAction('CLOSE_DIALOG');
const addPrerequisite = createAction('PRACTICE_ADD_PREREQUISITE');
const changePrerequisite = createAction('PRACTICE_CHANGE_PREREQUISITE');
const deletePrerequisite = createAction('PRACTICE_DELETE_PREREQUISITE');
const getResults = createAction('PRACTICE_GET_RESULTS');
const deleteZUN = createAction('PRACTICE_DELETE_ZUN');
const saveZUN = createAction('PRACTICE_SAVE_ZUN');
const deleteResult = createAction('PRACTICE_DELETE_RESULT');
const changeResult = createAction('PRACTICE_CHANGE_RESULT');
const addResult = createAction('PRACTICE_ADD_RESULT');
const getCompetencesDependedOnPractice = createAction('GET_COMPETENCES_DEPENDENT_ON_PRACTICE');
const setCompetencesDependedOnPractice = createAction('SET_COMPETENCES_DEPENDENT_ON_PRACTICE');
const sendToIsu = createAction('SEND_PRACTICE_TO_ISU');

export const actions: PracticeActions = {
    getPractice,
    setPractice,
    setField,
    saveField,
    setTemplateText,
    getTemplateText,
    setError,
    setErroredFields,
    addToErroredFields,
    removeFromErroredFields,
    showErrors,
    showErroredField,
    hideErroredField,
    createExpertise,
    approvePractice,
    sendPracticeToRework,
    getComments,
    setComments,
    sendComment,
    openDialog,
    closeDialog,
    deletePrerequisite,
    addPrerequisite,
    changePrerequisite,
    getResults,
    deleteZUN,
    saveZUN,
    deleteResult,
    changeResult,
    addResult,
    getCompetencesDependedOnPractice,
    setCompetencesDependedOnPractice,
    sendToIsu
};

export default actions;
