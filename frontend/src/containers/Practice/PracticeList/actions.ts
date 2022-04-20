import {createAction} from "@reduxjs/toolkit";

import {PracticeListActions} from './types';

const getPracticeList = createAction('GET_PRACTICE_LIST');
const setPracticeList = createAction('SET_PRACTICE_LIST');
const createPractice = createAction('PRACTICE_LIST_CREATE_PRACTICE');
const openModal = createAction('PRACTICE_LIST_OPEN_MODAL');
const closeModal = createAction('PRACTICE_LIST_CLOSE_MODAL');

export const actions: PracticeListActions = {
    getPracticeList,
    setPracticeList,
    createPractice,
    openModal,
    closeModal
}

export default actions;
