import {createAction} from "@reduxjs/toolkit";

import {PracticeActions} from './types';

const getPractice = createAction('GET_PRACTICE');
const setPractice = createAction('SET_PRACTICE');
const setField = createAction('SET_FIELD');
const savePractice = createAction('SAVE_PRACTICE');
const saveField = createAction('SAVE_FIELD');

export const actions: PracticeActions = {
    getPractice,
    setPractice,
    setField,
    savePractice,
    saveField,
}

export default actions;
