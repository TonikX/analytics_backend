import {createAction} from "@reduxjs/toolkit";

import {PracticeActions} from './types';

const getPractice = createAction('GET_PRACTICE');
const setPractice = createAction('SET_PRACTICE');
const setField = createAction('SET_FIELD');

export const actions: PracticeActions = {
    getPractice,
    setPractice,
    setField,
}

export default actions;
