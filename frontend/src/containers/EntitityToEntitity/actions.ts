import {createAction} from "@reduxjs/toolkit";

import {EntityToEntityActions} from './types';

const getEntityToEntityList = createAction('GET_ENTITY_TO_ENTITY');
const setEntityToEntityList = createAction('SET_ENTITY_TO_ENTITY');

const createNewEntityToEntity = createAction('CREATE_NEW_ENTITY_TO_ENTITY');
const changeEntityToEntity = createAction('CHANGE_ENTITY_TO_ENTITY');
const deleteEntityToEntity = createAction('DELETE_ENTITY_TO_ENTITY');

const openDialog = createAction('OPEN_ENTITY_TO_ENTITY_DIALOG');
const closeDialog = createAction('CLOSE_ENTITY_TO_ENTITY_DIALOG');

const changeSearchQuery = createAction('ENTITY_TO_ENTITY_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('ENTITY_TO_ENTITY_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('ENTITY_TO_ENTITY_CHANGE_ALL_COUNT');
const changeSorting = createAction('ENTITY_TO_ENTITY_CHANGE_SORTING');
const changeSubjectId = createAction('ENTITY_TO_ENTITY_CHANGE_SUBJECT_ID');

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