import {createAction} from "@reduxjs/toolkit";

import {StructuralUnitsActions} from './types';

const getStructuralUnits = createAction('GET_STRUCTURAL_UNITS');
const setStructuralUnits = createAction('SET_STRUCTURAL_UNITS');

const getStructuralUnit = createAction('GET_STRUCTURAL_UNIT');
const setStructuralUnit = createAction('SET_STRUCTURAL_UNIT');

const addUserToStructuralUnit = createAction('ADD_USER_TO_STRUCTURAL_UNIT');
const removeUserFromStructuralUnit = createAction('REMOVE_USER_FROM_STRUCTURAL_UNIT');
const changeUserFromStructuralUnit = createAction('CHANGE_USER_FROM_STRUCTURAL_UNIT');

const createNewStructuralUnit = createAction('CREATE_NEW_STRUCTURAL_UNIT');
const changeStructuralUnit = createAction('CHANGE_STRUCTURAL_UNIT');
const deleteStructuralUnit = createAction('DELETE_STRUCTURAL_UNIT');

const openDialog = createAction('OPEN_STRUCTURAL_UNITS_DIALOG');
const closeDialog = createAction('CLOSE_STRUCTURAL_UNITS_DIALOG');

const changeSearchQuery = createAction('STRUCTURAL_UNITS_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('STRUCTURAL_UNITS_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('STRUCTURAL_UNITS_CHANGE_ALL_COUNT');
const changeSorting = createAction('STRUCTURAL_UNITS_CHANGE_SORTING');

const actions: StructuralUnitsActions = {
    addUserToStructuralUnit,
    removeUserFromStructuralUnit,
    changeUserFromStructuralUnit,
    getStructuralUnit,
    setStructuralUnit,
    getStructuralUnits,
    setStructuralUnits,
    createNewStructuralUnit,
    changeStructuralUnit,
    deleteStructuralUnit,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;