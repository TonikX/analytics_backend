import {createAction} from "@reduxjs/toolkit";

import {IndicatorProgramActions} from './types';

const getIndicatorsDependsCompetence = createAction('GET_INDICATORS_DEPENDS_COMPETENCE');

const getIndicators = createAction('GET_INDICATORS');
const setIndicators = createAction('SET_INDICATORS');

const createNewIndicator = createAction('CREATE_NEW_INDICATOR');
const changeIndicator = createAction('CHANGE_INDICATOR');
const deleteIndicator = createAction('DELETE_INDICATOR');

const openDialog = createAction('OPEN_INDICATOR_DIALOG');
const closeDialog = createAction('CLOSE_INDICATOR_DIALOG');

const changeSearchQuery = createAction('INDICATOR_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('INDICATOR_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('INDICATOR_CHANGE_ALL_COUNT');
const changeSorting = createAction('INDICATOR_CHANGE_SORTING');

const actions: IndicatorProgramActions = {
    getIndicatorsDependsCompetence,
    getIndicators,
    setIndicators,
    createNewIndicator,
    changeIndicator,
    deleteIndicator,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;
