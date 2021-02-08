import {createAction} from "@reduxjs/toolkit";

import {CompetenceActions} from './types';

const getCompetences = createAction('GET_COMPETENCES');
const setCompetences = createAction('SET_COMPETENCES');

const createNewCompetence = createAction('CREATE_NEW_COMPETENCE');
const changeCompetence = createAction('CHANGE_COMPETENCE');
const deleteCompetence = createAction('DELETE_COMPETENCE');

const openDialog = createAction('OPEN_COMPETENCE_DIALOG');
const closeDialog = createAction('CLOSE_COMPETENCE_DIALOG');

const changeSearchQuery = createAction('COMPETENCE_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('COMPETENCE_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('COMPETENCE_CHANGE_ALL_COUNT');
const changeSorting = createAction('COMPETENCE_CHANGE_SORTING');

const actions: CompetenceActions = {
    getCompetences,
    setCompetences,
    createNewCompetence,
    changeCompetence,
    deleteCompetence,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;