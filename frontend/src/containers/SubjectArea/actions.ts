import {createAction} from "@reduxjs/toolkit";

import {SubjectAreaActions} from './types';

const getSubjectArea = createAction('GET_SUBJECT_AREA');
const setSubjectArea = createAction('SET_SUBJECT_AREA');

const createNewSubjectArea = createAction('CREATE_NEW_SUBJECT_AREA');
const changeSubjectArea = createAction('CHANGE_SUBJECT_AREA');
const deleteSubjectArea = createAction('DELETE_SUBJECT_AREA');

const openDialog = createAction('OPEN_SUBJECT_AREA_DIALOG');
const closeDialog = createAction('CLOSE_SUBJECT_AREA_DIALOG');

const changeSearchQuery = createAction('SUBJECT_AREA_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('SUBJECT_AREA_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('SUBJECT_AREA_CHANGE_ALL_COUNT');
const changeSorting = createAction('SUBJECT_AREA_CHANGE_SORTING');

const actions: SubjectAreaActions = {
    getSubjectArea,
    setSubjectArea,
    createNewSubjectArea,
    changeSubjectArea,
    deleteSubjectArea,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;
