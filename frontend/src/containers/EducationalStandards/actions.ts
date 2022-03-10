import {createAction} from "@reduxjs/toolkit";

const getEducationalStandards = createAction('GET_EDUCATIONAL_STANDARDS');
const setEducationalStandards = createAction('SET_EDUCATIONAL_STANDARDS');

const getEducationalStandard = createAction('GET_EDUCATIONAL_STANDARD');
const setEducationalStandard = createAction('SET_EDUCATIONAL_STANDARD');

const createNewEducationalStandard = createAction('CREATE_NEW_EDUCATIONAL_STANDARD');
const changeEducationalStandard = createAction('CHANGE_EDUCATIONAL_STANDARD');
const deleteEducationalStandard = createAction('DELETE_EDUCATIONAL_STANDARD');

const openDialog = createAction('OPEN_EDUCATIONAL_STANDARDS_DIALOG');
const closeDialog = createAction('CLOSE_EDUCATIONAL_STANDARDS_DIALOG');

const changeSearchQuery = createAction('EDUCATIONAL_STANDARDS_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('EDUCATIONAL_STANDARDS_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('EDUCATIONAL_STANDARDS_CHANGE_ALL_COUNT');
const changeSorting = createAction('EDUCATIONAL_STANDARDS_CHANGE_SORTING');

const actions = {
    getEducationalStandards,
    getEducationalStandard,
    setEducationalStandard,
    setEducationalStandards,
    createNewEducationalStandard,
    changeEducationalStandard,
    deleteEducationalStandard,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;