import {createAction} from "@reduxjs/toolkit";

import {ExpertisesActions} from './types';

const getExpertisesList = createAction<string>('GET_EXPERTISES');
const setExpertisesList = createAction<string>('SET_EXPERTISES');

const getExpertise = createAction<string>('GET_EXPERTISE');
const setExpertise = createAction<string>('SET_EXPERTISE');
const approveExpertise = createAction<string>('APPROVE_EXPERTISE');
const updateExpertiseExperts = createAction<string>('UPDATE_EXPERTISE_EXPERTS');

const changeSearchQuery = createAction<string>('EXPERTISES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('EXPERTISES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('EXPERTISES_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('EXPERTISES_CHANGE_SORTING');

const actions: ExpertisesActions = {
    getExpertisesList,
    setExpertisesList,

    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,

    getExpertise,
    setExpertise,
    approveExpertise,
    updateExpertiseExperts,
}

export default actions;