import {createAction} from "@reduxjs/toolkit";

import {CompetenceActions} from './types';

const getCompetence = createAction('GET_COMPETENCE');
const setCompetence = createAction('GET_COMPETENCE');
const getCompetences = createAction('GET_COMPETENCES');
const setCompetences = createAction('SET_COMPETENCES');
const getIndicators = createAction('GET_INDICATORS');
const setIndicators = createAction('SET_INDICATORS');

const createNewCompetence = createAction('CREATE_NEW_COMPETENCE');
const changeCompetence = createAction('CHANGE_COMPETENCE');
const deleteCompetence = createAction('DELETE_COMPETENCE');

const createIndicator = createAction('CREATE_INDICATOR');
const changeIndicator = createAction('CHANGE_INDICATOR');
const deleteIndicator = createAction('DELETE_INDICATOR');

const openDialog = createAction('OPEN_COMPETENCE_DIALOG');
const closeDialog = createAction('CLOSE_COMPETENCE_DIALOG');

const changeSearchQuery = createAction('COMPETENCE_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('COMPETENCE_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('COMPETENCE_CHANGE_ALL_COUNT');
const changeSorting = createAction('COMPETENCE_CHANGE_SORTING');

const actions: CompetenceActions = {
    createIndicator,
    changeIndicator,
    deleteIndicator,
    getCompetence,
    setCompetence,
    getIndicators,
    setIndicators,
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