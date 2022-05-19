import {createAction} from "@reduxjs/toolkit";

import {PracticeActions} from './types';

const getPractice = createAction('GET_PRACTICE');
const setPractice = createAction('SET_PRACTICE');
const setField = createAction('SET_FIELD_PRACTICE');
const saveField = createAction('SAVE_FIELD_PRACTICE');
const getTemplateText = createAction('GET_TEMPLATE_TEXT_PRACTICE');
const setTemplateText = createAction('SET_TEMPLATE_TEXT_PRACTICE');
const setError = createAction('SET_ERROR');

export const actions: PracticeActions = {
    getPractice,
    setPractice,
    setField,
    saveField,
    setTemplateText,
    getTemplateText,
    setError,
}

export default actions;
