import {createAction} from "@reduxjs/toolkit";

import { PersonalitiesActions } from "./types";

const getPersonalities = createAction('GET_PERSONALITIES');
const setPersonalities = createAction('SET_PERSONALITIES');

const createNewPersonality = createAction('CREATE_NEW_PERSONALITY');
const changePersonality = createAction('CHANGE_PERSONALITY');
const deletePersonality = createAction('DELETE_PERSONALITY');

const changeSearchQuery = createAction('PERSONALITIES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('PERSONALITIES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('PERSONALITIES_CHANGE_ALL_COUNT');
const changeSorting = createAction('PERSONALITIES_CHANGE_SORTING');
const changeFiltering = createAction('PERSONALITIES_CHANGE_FILTERING')
const changeFilterSearchQuery = createAction('PERSONALITIES_CHANGE_FILTER_SEARCH_QUERY')

const actions: PersonalitiesActions = {
    getPersonalities,
    setPersonalities,
    createNewPersonality,
    changePersonality,
    deletePersonality,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
    changeFiltering,
    changeFilterSearchQuery
}

export default actions;