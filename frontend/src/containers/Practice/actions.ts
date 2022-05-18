import {createAction} from "@reduxjs/toolkit";

import {PracticeActions} from './types';

const getPractice = createAction('GET_PRACTICE');
const setPractice = createAction('SET_PRACTICE');
const setField = createAction('SET_FIELD');
const savePractice = createAction('SAVE_PRACTICE');
const saveField = createAction('SAVE_FIELD');
const getTemplateText = createAction('GET_TEMPLATE_TEXT');
const setTemplateText = createAction('SET_TEMPLATE_TEXT');

export const actions: PracticeActions = {
    getPractice,
    setPractice,
    setField,
    savePractice,
    saveField,
    setTemplateText,
    getTemplateText,
}

export default actions;
