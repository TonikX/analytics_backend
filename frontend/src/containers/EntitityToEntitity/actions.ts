import {createAction} from "@reduxjs/toolkit";

import {EntityToEntityActions} from './types';

const getEntityToEntityList = createAction<string>('GET_ENTITY_TO_ENTITY');
const setEntityToEntityList = createAction<string>('SET_ENTITY_TO_ENTITY');

const createNewEntityToEntity = createAction<string>('CREATE_NEW_ENTITY_TO_ENTITY');
const changeEntityToEntity = createAction<string>('CHANGE_ENTITY_TO_ENTITY');
const deleteEntityToEntity = createAction<string>('DELETE_ENTITY_TO_ENTITY');

const openDialog = createAction<string>('OPEN_ENTITY_TO_ENTITY_DIALOG');
const closeDialog = createAction<string>('CLOSE_ENTITY_TO_ENTITY_DIALOG');

const changeSearchQuery = createAction<string>('ENTITY_TO_ENTITY_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction<string>('ENTITY_TO_ENTITY_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction<string>('ENTITY_TO_ENTITY_CHANGE_ALL_COUNT');
const changeSorting = createAction<string>('ENTITY_TO_ENTITY_CHANGE_SORTING');
const changeSubjectId = createAction<string>('ENTITY_TO_ENTITY_CHANGE_SUBJECT_ID');

const actions: EntityToEntityActions = {
    changeSubjectId,
    getEntityToEntityList,
    setEntityToEntityList,
    createNewEntityToEntity,
    changeEntityToEntity,
    deleteEntityToEntity,
    openDialog,
    closeDialog,
    changeSearchQuery,
    changeCurrentPage,
    changeAllCount,
    changeSorting,
}

export default actions;