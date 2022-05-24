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
}

export default actions;
