import {createAction} from "@reduxjs/toolkit";

import {PracticeActions} from './types';

const getPractice = createAction('GET_PRACTICE');
const setPractice = createAction('SET_PRACTICE');
const setField = createAction('SET_FIELD');
const savePractice = createAction('SAVE_PRACTICE');

export const actions: PracticeActions = {
    getPractice,
    setPractice,
    setField,
    savePractice,
}

export default actions;
