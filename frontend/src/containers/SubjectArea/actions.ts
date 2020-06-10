import {createAction} from "@reduxjs/toolkit";

import {SubjectAreaActions} from './types';

const getSubjectArea = createAction<string>('GET_SUBJECT_AREA');
const setSubjectArea = createAction<string>('SET_SUBJECT_AREA');

const createNewSubjectArea = createAction<string>('CREATE_NEW_SUBJECT_AREA');
const changeSubjectArea = createAction<string>('CHANGE_SUBJECT_AREA');
const deleteSubjectArea = createAction<string>('DELETE_SUBJECT_AREA');

const openDialog = createAction<string>('OPEN_SUBJECT_AREA_DIALOG');
const closeDialog = createAction<string>('CLOSE_SUBJECT_AREA_DIALOG');

const changeSearchQuery = createAction<string>('SUBJECT_AREA_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('SUBJECT_AREA_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('SUBJECT_AREA_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('SUBJECT_AREA_CHANGE_SORTING');

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