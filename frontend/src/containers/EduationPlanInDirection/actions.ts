import {createAction} from "@reduxjs/toolkit";

import {EducationalPlanInDirectionActions} from './types';

const getEducationalPlansInDirection = createAction<string>('GET_EDUCATIONAL_PLANS_IN_DIRECTION');
const setEducationalPlansInDirection = createAction<string>('SET_EDUCATIONAL_PLANS_IN_DIRECTION');

const createNewEducationalPlanInDirection = createAction<string>('CREATE_NEW_EDUCATIONAL_PLAN_IN_DIRECTION');
const changeEducationalPlanInDirection = createAction<string>('CHANGE_EDUCATIONAL_PLAN_IN_DIRECTION');
const deleteEducationalPlanInDirection = createAction<string>('DELETE_EDUCATIONAL_PLAN_IN_DIRECTION');

const openDialog = createAction<string>('OPEN_EDUCATIONAL_PLAN_IN_DIRECTION_DIALOG');
const closeDialog = createAction<string>('CLOSE_EDUCATIONAL_PLAN_IN_DIRECTION_DIALOG');

const changeSearchQuery = createAction<string>('EDUCATIONAL_PLAN_IN_DIRECTION_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('EDUCATIONAL_PLAN_IN_DIRECTION_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('EDUCATIONAL_PLAN_IN_DIRECTION_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('EDUCATIONAL_PLAN_IN_DIRECTION_CHANGE_SORTING');

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