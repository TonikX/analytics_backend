import {createAction} from "@reduxjs/toolkit";

import {DirectionActions} from './types';

const getDirections = createAction('GET_DIRECTIONS');
const setDirections = createAction('SET_DIRECTIONS');

const createNewDirection = createAction('CREATE_NEW_DIRECTION');
const changeDirection = createAction('CHANGE_DIRECTION');
const deleteDirection = createAction('DELETE_DIRECTION');

const openDialog = createAction('OPEN_DIRECTION_DIALOG');
const closeDialog = createAction('CLOSE_DIRECTION_DIALOG');

const changeSearchQuery = createAction('DIRECTION_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('DIRECTION_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('DIRECTION_CHANGE_ALL_COUNT');
const changeSorting = createAction('DIRECTION_CHANGE_SORTING');

const actions: DirectionActions = {
    getDirections,
    setDirections,
    createNewDirection,
    changeDirection,
    deleteDirection,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;