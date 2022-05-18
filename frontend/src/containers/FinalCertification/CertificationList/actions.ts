import {createAction} from "@reduxjs/toolkit";

import {CertificationListActions} from './types';

const getCertificationList = createAction('GET_CERTIFICATION_LIST');
const setCertificationList = createAction('SET_CERTIFICATION_LIST');
const setSearchText = createAction('SET_SEARCH_TEXT');
const setSortingField = createAction('SET_SORTING_FIELD');
const setCertificationCount = createAction('SET_CERTIFICATION_COUNT');
const setCurrentPage = createAction('SET_CURRENT_PAGE');
const openModal = createAction('PRACTICE_LIST_OPEN_MODAL');
const closeModal = createAction('PRACTICE_LIST_CLOSE_MODAL');
const createCertification = createAction('CREATE_CERTIFICATION');

export const actions: CertificationListActions = {
    getCertificationList,
    setCertificationList,
    setSearchText,
    setSortingField,
    setCertificationCount,
    setCurrentPage,
    openModal,
    closeModal,
    createCertification,
}

export default actions;
