import {createAction} from "@reduxjs/toolkit";

import {PracticeListActions} from './types';

const getPracticeList = createAction('GET_PRACTICE_LIST');
const setPracticeList = createAction('SET_PRACTICE_LIST');
const createPractice = createAction('PRACTICE_LIST_CREATE_PRACTICE');
const openModal = createAction('PRACTICE_LIST_OPEN_MODAL');
const closeModal = createAction('PRACTICE_LIST_CLOSE_MODAL');
const setSearchText = createAction('SET_SEARCH_TEXT');
const setSortingField = createAction('SET_SORTING_FIELD');
const setSortingMode = createAction('SET_SORTING_MODE');
const setPracticeCount = createAction('SET_PRACTICE_COUNT');
const setCurrentPage = createAction('SET_CURRENT_PAGE');

export const actions: PracticeListActions = {
    getPracticeList,
    setPracticeList,
    createPractice,
    openModal,
    closeModal,
    setSearchText,
    setSortingField,
    setSortingMode,
    setPracticeCount,
    setCurrentPage,
}

export default actions;
