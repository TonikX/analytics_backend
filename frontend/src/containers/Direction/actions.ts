import {createAction} from "@reduxjs/toolkit";

import {DirectionActions} from './types';

const getDirections = createAction<string>('GET_DIRECTIONS');
const setDirections = createAction<string>('SET_DIRECTIONS');

const createNewDirection = createAction<string>('CREATE_NEW_DIRECTION');
const changeDirection = createAction<string>('CHANGE_DIRECTION');
const deleteDirection = createAction<string>('DELETE_DIRECTION');

const openDialog = createAction<string>('OPEN_DIRECTION_DIALOG');
const closeDialog = createAction<string>('CLOSE_DIRECTION_DIALOG');

const changeSearchQuery = createAction<string>('DIRECTION_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('DIRECTION_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('DIRECTION_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('DIRECTION_CHANGE_SORTING');

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