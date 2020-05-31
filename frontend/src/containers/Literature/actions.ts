import {createAction} from "@reduxjs/toolkit";

import {LiteratureActions} from './types';

const getLiterature = createAction<string>('GET_LITERATURE');
const setLiterature = createAction<string>('SET_LITERATURE');

const createNewLiterature = createAction<string>('CREATE_NEW_LITERATURE');
const changeLiterature = createAction<string>('CHANGE_LITERATURE');
const deleteLiterature = createAction<string>('DELETE_LITERATURE');

const openDialog = createAction<string>('OPEN_LITERATURE_DIALOG');
const closeDialog = createAction<string>('CLOSE_LITERATURE_DIALOG');

const changeSearchQuery = createAction<string>('CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('CHANGE_SORTING');

const actions: LiteratureActions = {
    getLiterature,
    setLiterature,
    createNewLiterature,
    changeLiterature,
    deleteLiterature,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;