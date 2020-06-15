import {createAction} from "@reduxjs/toolkit";

import {CompetenceActions} from './types';

const getCompetences = createAction<string>('GET_COMPETENCES');
const setCompetences = createAction<string>('SET_COMPETENCES');

const createNewCompetence = createAction<string>('CREATE_NEW_COMPETENCE');
const changeCompetence = createAction<string>('CHANGE_COMPETENCE');
const deleteCompetence = createAction<string>('DELETE_COMPETENCE');

const openDialog = createAction<string>('OPEN_COMPETENCE_DIALOG');
const closeDialog = createAction<string>('CLOSE_COMPETENCE_DIALOG');

const changeSearchQuery = createAction<string>('COMPETENCE_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('COMPETENCE_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('COMPETENCE_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('COMPETENCE_CHANGE_SORTING');

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