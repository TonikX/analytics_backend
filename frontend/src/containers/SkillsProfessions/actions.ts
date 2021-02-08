import {createAction} from "@reduxjs/toolkit";

import {ProfessionsActions} from './types';

const getProfessionsList = createAction('GET_SKILLS_PROFESSIONS');
const setProfessionsList = createAction('SET_SKILLS_PROFESSIONS');

const changeSearchQuery = createAction('SKILLS_PROFESSIONS_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('SKILLS_PROFESSIONS_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('SKILLS_PROFESSIONS_CHANGE_ALL_COUNT');
const changeSorting = createAction('SKILLS_PROFESSIONS_CHANGE_SORTING');
const changeFilteredRole = createAction('SKILLS_PROFESSIONS_CHANGE_FILTERED_ROLE');

const actions: ProfessionsActions = {
    changeFilteredRole,
    getProfessionsList,
    setProfessionsList,

    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;