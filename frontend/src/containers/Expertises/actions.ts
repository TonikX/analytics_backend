import {createAction} from "@reduxjs/toolkit";

import {ExpertisesActions} from './types';

const getExpertisesList = createAction('GET_EXPERTISES');
const setExpertisesList = createAction('SET_EXPERTISES');

const getExpertise = createAction('GET_EXPERTISE');
const setExpertise = createAction('SET_EXPERTISE');
const approveExpertise = createAction('APPROVE_EXPERTISE');
const sendExpertiseForRework = createAction('SEND_EXPERTISE_FOR_REWORK');

const changeSearchQuery = createAction('EXPERTISES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('EXPERTISES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('EXPERTISES_CHANGE_ALL_COUNT');
const changeSorting = createAction('EXPERTISES_CHANGE_SORTING');

const openAddExpertModal = createAction('EXPERTISES_OPEN_ADD_EXPERT_MODAL');
const closeAddExpertModal = createAction('EXPERTISES_CLOSE_ADD_EXPERT_MODAL');

const addExpertToExpertise = createAction('ADD_EXPERT_TO_EXPERTISE');
const removeExpertFromExpertise = createAction('REMOVE_EXPERT_FROM_EXPERTISE');

const changeSelectedStatus = createAction('EXPERTISES_CHANGE_SELECTED_STATUS');
const changeSelectedQualification = createAction('EXPERTISES_CHANGE_SELECTED_QUALIFICATION');

const getComments = createAction('EXPERTISES_GET_COMMENTS');
const setComments = createAction('EXPERTISES_SET_COMMENTS');
const createComment = createAction('EXPERTISES_CREATE_COMMENT');
const updateUnreadCommentStatus = createAction('EXPERTISES_UPDATE_UNREAD_COMMENT_STATUS');

const actions: ExpertisesActions = {
    getComments,
    setComments,
    createComment,
    updateUnreadCommentStatus,

    changeSelectedQualification,
    changeSelectedStatus,

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