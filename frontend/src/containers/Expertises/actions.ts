import {createAction} from "@reduxjs/toolkit";

import {ExpertisesActions} from './types';

const getExpertisesList = createAction<string>('GET_EXPERTISES');
const setExpertisesList = createAction<string>('SET_EXPERTISES');

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
}

export default actions;