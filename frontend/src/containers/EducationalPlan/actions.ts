import {createAction} from "@reduxjs/toolkit";

import {EducationalPlanActions} from './types';

const getEducationalPlans = createAction<string>('GET_EDUCATIONAL_PLANS');
const setEducationalPlans = createAction<string>('SET_EDUCATIONAL_PLANS');

const getEducationalDetail = createAction<string>('GET_EDUCATIONAL_PLAN_DETAIL');
const setEducationalDetail = createAction<string>('SET_EDUCATIONAL_PLAN_DETAIL');

const createNewEducationalPlan = createAction<string>('CREATE_NEW_EDUCATIONAL_PLAN');
const changeEducationalPlan = createAction<string>('CHANGE_EDUCATIONAL_PLAN');
const deleteEducationalPlan = createAction<string>('DELETE_EDUCATIONAL_PLAN');

const openDialog = createAction<string>('OPEN_EDUCATIONAL_PLAN_DIALOG');
const closeDialog = createAction<string>('CLOSE_EDUCATIONAL_PLAN_DIALOG');

const openDetailDialog = createAction<string>('OPEN_DETAIL_EDUCATIONAL_PLAN_DIALOG');
const closeDetailDialog = createAction<string>('CLOSE_DETAIL_EDUCATIONAL_PLAN_DIALOG');

const changeSearchQuery = createAction<string>('EDUCATIONAL_PLAN_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('EDUCATIONAL_PLAN_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('EDUCATIONAL_PLAN_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('EDUCATIONAL_PLAN_CHANGE_SORTING');

const actions: EducationalPlanActions = {
    openDetailDialog,
    closeDetailDialog,
    getEducationalDetail,
    setEducationalDetail,
    getEducationalPlans,
    setEducationalPlans,
    createNewEducationalPlan,
    changeEducationalPlan,
    deleteEducationalPlan,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;