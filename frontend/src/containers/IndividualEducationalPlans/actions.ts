import {createAction} from "@reduxjs/toolkit";

import {IndividualEducationalPlansActions} from './types';

const getIndividualEducationalPlans = createAction('GET_INDIVIDUAL_EDUCATIONAL_PLANS_IN_DIRECTION');
const setIndividualEducationalPlans = createAction('SET_INDIVIDUAL_EDUCATIONAL_PLANS_IN_DIRECTION');

const deleteIndividualEducationalPlans = createAction('DELETE_INDIVIDUAL_EDUCATIONAL_PLANS');

const changeSearchQuery = createAction('INDIVIDUAL_EDUCATIONAL_PLANS_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('INDIVIDUAL_EDUCATIONAL_PLANS_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('INDIVIDUAL_EDUCATIONAL_PLANS_CHANGE_ALL_COUNT');
const changeSorting = createAction('INDIVIDUAL_EDUCATIONAL_PLANS_CHANGE_SORTING');

const actions: IndividualEducationalPlansActions = {
    getIndividualEducationalPlans,
    setIndividualEducationalPlans,
    deleteIndividualEducationalPlans,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;