import {createAction} from "@reduxjs/toolkit";

import {EducationalPlanInDirectionActions} from './types';

const getEducationalPlansInDirection = createAction('GET_EDUCATIONAL_PLANS_IN_DIRECTION');
const setEducationalPlansInDirection = createAction('SET_EDUCATIONAL_PLANS_IN_DIRECTION');

const createNewEducationalPlanInDirection = createAction('CREATE_NEW_EDUCATIONAL_PLAN_IN_DIRECTION');
const changeEducationalPlanInDirection = createAction('CHANGE_EDUCATIONAL_PLAN_IN_DIRECTION');
const deleteEducationalPlanInDirection = createAction('DELETE_EDUCATIONAL_PLAN_IN_DIRECTION');

const openDialog = createAction('OPEN_EDUCATIONAL_PLAN_IN_DIRECTION_DIALOG');
const closeDialog = createAction('CLOSE_EDUCATIONAL_PLAN_IN_DIRECTION_DIALOG');

const changeSearchQuery = createAction('EDUCATIONAL_PLAN_IN_DIRECTION_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('EDUCATIONAL_PLAN_IN_DIRECTION_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('EDUCATIONAL_PLAN_IN_DIRECTION_CHANGE_ALL_COUNT');
const changeSorting = createAction('EDUCATIONAL_PLAN_IN_DIRECTION_CHANGE_SORTING');

const actions: EducationalPlanInDirectionActions = {
    getEducationalPlansInDirection,
    setEducationalPlansInDirection,
    createNewEducationalPlanInDirection,
    changeEducationalPlanInDirection,
    deleteEducationalPlanInDirection,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;