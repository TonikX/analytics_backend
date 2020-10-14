import {createAction} from "@reduxjs/toolkit";

import {ProfessionsActions} from './types';

const getProfessionsList = createAction<string>('GET_SKILLS_PROFESSIONS');
const setProfessionsList = createAction<string>('SET_SKILLS_PROFESSIONS');

const changeSearchQuery = createAction<string>('SKILLS_PROFESSIONS_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('SKILLS_PROFESSIONS_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('SKILLS_PROFESSIONS_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('SKILLS_PROFESSIONS_CHANGE_SORTING');
const changeFilteredRole = createAction<string>('SKILLS_PROFESSIONS_CHANGE_FILTERED_ROLE');

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