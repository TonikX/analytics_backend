import {createAction} from "@reduxjs/toolkit";

import {LiteratureActions} from './types';
import {literatureSource} from "../WorkProgram/constants";

const getLiterature = createAction<{ source: literatureSource }>('GET_LITERATURE');
const setLiterature = createAction('SET_LITERATURE');

const createNewLiterature = createAction('CREATE_NEW_LITERATURE');
const changeLiterature = createAction('CHANGE_LITERATURE');
const deleteLiterature = createAction('DELETE_LITERATURE');

const openDialog = createAction('OPEN_LITERATURE_DIALOG');
const closeDialog = createAction('CLOSE_LITERATURE_DIALOG');

const changeSearchQuery = createAction('LITERATURE_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('LITERATURE_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('LITERATURE_CHANGE_ALL_COUNT');
const changeSorting = createAction('LITERATURE_CHANGE_SORTING');

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
