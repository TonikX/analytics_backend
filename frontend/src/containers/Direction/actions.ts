import {createAction} from "@reduxjs/toolkit";

import {DirectionActions} from './types';

const getDirections = createAction<string>('GET_EDUCATIONAL_PROGRAMS');
const setDirections = createAction<string>('SET_EDUCATIONAL_PROGRAMS');

const createNewDirection = createAction<string>('CREATE_NEW_EDUCATIONAL_PROGRAM');
const changeDirection = createAction<string>('CHANGE_EDUCATIONAL_PROGRAM');
const deleteDirection = createAction<string>('DELETE_EDUCATIONAL_PROGRAM');

const openDialog = createAction<string>('OPEN_EDUCATIONAL_PROGRAM_DIALOG');
const closeDialog = createAction<string>('CLOSE_EDUCATIONAL_PROGRAM_DIALOG');

const changeSearchQuery = createAction<string>('EDUCATIONAL_PROGRAM_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('EDUCATIONAL_PROGRAM_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('EDUCATIONAL_PROGRAM_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('EDUCATIONAL_PROGRAM_CHANGE_SORTING');

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