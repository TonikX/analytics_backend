import {createAction} from "@reduxjs/toolkit";

import {CertificationListActions} from './types';

const getCertificationList = createAction('GET_CERTIFICATION_LIST');
const setCertificationList = createAction('SET_CERTIFICATION_LIST');
const setSearchText = createAction('SET_SEARCH_TEXT');
const setSortingField = createAction('SET_SORTING_FIELD');
const setSortingMode = createAction('SET_SORTING_MODE');
const setCertificationCount = createAction('SET_CERTIFICATION_COUNT');
const setCurrentPage = createAction('SET_CURRENT_PAGE');

export const actions: CertificationListActions = {
    getCertificationList,
    setCertificationList,
    setSearchText,
    setSortingField,
    setSortingMode,
    setCertificationCount,
    setCurrentPage,
}

export default actions;
