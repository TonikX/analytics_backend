import {createAction} from "@reduxjs/toolkit";

import {ExpertisesActions} from './types';

const getExpertisesList = createAction<string>('GET_EXPERTISES');
const setExpertisesList = createAction<string>('SET_EXPERTISES');

const getExpertise = createAction<string>('GET_EXPERTISE');
const setExpertise = createAction<string>('SET_EXPERTISE');
const approveExpertise = createAction<string>('APPROVE_EXPERTISE');
const sendExpertiseForRework = createAction<string>('SEND_EXPERTISE_FOR_REWORK');

const changeSearchQuery = createAction<string>('EXPERTISES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('EXPERTISES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('EXPERTISES_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('EXPERTISES_CHANGE_SORTING');

const openAddExpertModal = createAction<string>('EXPERTISES_OPEN_ADD_EXPERT_MODAL');
const closeAddExpertModal = createAction<string>('EXPERTISES_CLOSE_ADD_EXPERT_MODAL');

const addExpertToExpertise = createAction<string>('ADD_EXPERT_TO_EXPERTISE');
const removeExpertFromExpertise = createAction<string>('REMOVE_EXPERT_FROM_EXPERTISE');

const actions: ExpertisesActions = {
    openAddExpertModal,
    closeAddExpertModal,

    getExpertisesList,
    setExpertisesList,

    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,

    getExpertise,
    setExpertise,
    approveExpertise,
    sendExpertiseForRework,

    addExpertToExpertise,
    removeExpertFromExpertise,
}

export default actions;