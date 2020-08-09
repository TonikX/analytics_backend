import {createAction} from "@reduxjs/toolkit";

import {IndicatorProgramActions} from './types';

const getIndicatorsDependsCompetence = createAction<string>('GET_INDICATORS_DEPENDS_COMPETENCE');

const getIndicators = createAction<string>('GET_INDICATORS');
const setIndicators = createAction<string>('SET_INDICATORS');

const createNewIndicator = createAction<string>('CREATE_NEW_INDICATOR');
const changeIndicator = createAction<string>('CHANGE_INDICATOR');
const deleteIndicator = createAction<string>('DELETE_INDICATOR');

const openDialog = createAction<string>('OPEN_INDICATOR_DIALOG');
const closeDialog = createAction<string>('CLOSE_INDICATOR_DIALOG');

const changeSearchQuery = createAction<string>('INDICATOR_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('INDICATOR_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('INDICATOR_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('INDICATOR_CHANGE_SORTING');

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