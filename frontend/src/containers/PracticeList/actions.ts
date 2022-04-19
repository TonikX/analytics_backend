import {createAction} from "@reduxjs/toolkit";

import {PracticeListActions} from './types';

const getPracticeList = createAction('GET_PRACTICE_LIST');
const setPracticeList = createAction('SET_PRACTICE_LIST');

export const actions: PracticeListActions = {
    getPracticeList,
    setPracticeList,
}

export default actions;
