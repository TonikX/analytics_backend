import {createAction} from "@reduxjs/toolkit";

import {IndividualTrajectoriesActions} from './types';

const getIndividualTrajectories = createAction('GET_INDIVIDUAL_TRAJECTORIES_IN_DIRECTION');
const setIndividualTrajectories = createAction('SET_INDIVIDUAL_TRAJECTORIES_IN_DIRECTION');

const deleteIndividualTrajectories = createAction('DELETE_INDIVIDUAL_TRAJECTORIES');

const changeSearchQuery = createAction('INDIVIDUAL_TRAJECTORIES_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('INDIVIDUAL_TRAJECTORIES_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('INDIVIDUAL_TRAJECTORIES_CHANGE_ALL_COUNT');
const changeSorting = createAction('INDIVIDUAL_TRAJECTORIES_CHANGE_SORTING');

const showOnlyMy = createAction('INDIVIDUAL_TRAJECTORIES_SHOW_ONLY_MY');
const changeFiltering = createAction('INDIVIDUAL_TRAJECTORIES_CHANGE_FILTERING');

const actions: IndividualTrajectoriesActions = {
    getIndividualTrajectories,
    setIndividualTrajectories,
    deleteIndividualTrajectories,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
    showOnlyMy,
    changeFiltering,
}

export default actions;