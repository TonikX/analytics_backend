import createReducer from "../../store/createReducer";
import {EntityToEntityFields, fields} from './enum';
import actions from "./actions";

import {entityToEntityState} from "./types";

export const GENERAL_PATH = 'entityToEntity';

export const initialState: entityToEntityState = {
  [fields.SORTING]: {
    [fields.SORTING_FIELD]: '',
    [fields.SORTING_MODE]: ''
  },
  [fields.CURRENT_PAGE]: 1,
  [fields.ALL_COUNT]: 1,
  [fields.SEARCH_QUERY]: {
    [EntityToEntityFields.RELATION]: '',
    [EntityToEntityFields.ITEM1]: '',
    [EntityToEntityFields.ITEM2]: '',
  },
  [fields.SUBJECT_ID]: null,
  [fields.ENTITY_TO_ENTITY_LIST]: [],
  [fields.ENTITY_TO_ENTITY_LIST_DIALOG]: {
    [fields.IS_OPEN_DIALOG]: false,
    [fields.DIALOG_DATA]: {}
  }
};

const setData = (state: entityToEntityState, {payload}: any): entityToEntityState => ({
  ...state,
  [fields.ENTITY_TO_ENTITY_LIST]: payload,
});

const changeSearchQuery = (state: entityToEntityState, {payload}: any): entityToEntityState => ({
  ...state,
  [fields.SEARCH_QUERY]: {
    ...state[fields.SEARCH_QUERY],
    ...payload
  },
});

const changeCurrentPage = (state: entityToEntityState, {payload}: any): entityToEntityState => ({
  ...state,
  [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: entityToEntityState, {payload}: any): entityToEntityState => ({
  ...state,
  [fields.ALL_COUNT]: payload,
});

const changeSubjectId = (state: entityToEntityState, {payload}: any): entityToEntityState => ({
  ...state,
  [fields.SUBJECT_ID]: payload,
});

const openDialog = (state: entityToEntityState, {payload}: any): entityToEntityState => ({
  ...state,
  [fields.ENTITY_TO_ENTITY_LIST_DIALOG]: {
    [fields.IS_OPEN_DIALOG]: true,
    [fields.DIALOG_DATA]: payload
  }
});

const closeDialog = (state: entityToEntityState): entityToEntityState => ({
  ...state,
  [fields.ENTITY_TO_ENTITY_LIST_DIALOG]: {
    [fields.IS_OPEN_DIALOG]: false,
    [fields.DIALOG_DATA]: {}
  }
});

const changeSorting = (state: entityToEntityState, {payload}: any): entityToEntityState => ({
  ...state,
  [fields.SORTING]: {
    [fields.SORTING_FIELD]: payload.field,
    [fields.SORTING_MODE]: payload.mode
  }
});

export const reducer = createReducer(initialState, {
  [actions.setEntityToEntityList.type]: setData,
  [actions.openDialog.type]: openDialog,
  [actions.closeDialog.type]: closeDialog,
  [actions.changeSearchQuery.type]: changeSearchQuery,
  [actions.changeCurrentPage.type]: changeCurrentPage,
  [actions.changeAllCount.type]: changeAllCount,
  [actions.changeSorting.type]: changeSorting,
  [actions.changeSubjectId.type]: changeSubjectId,
});
