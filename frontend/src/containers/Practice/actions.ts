import {createAction} from "@reduxjs/toolkit";

import {PracticeActions} from './types';

const getPractice = createAction('GET_PRACTICE');
const setPractice = createAction("SET_PRACTICE");

export const actions: PracticeActions = {
    getPractice,
    setPractice,
}

export default actions;
