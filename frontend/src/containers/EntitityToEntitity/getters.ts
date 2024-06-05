import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields} from './enum';

import {entityToEntityState, EntityToEntityType} from './types';
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): entityToEntityState => get(state, GENERAL_PATH);
export const getEntityToEntityList = (state: rootState): Array<EntityToEntityType> => get(getStateData(state), fields.ENTITY_TO_ENTITY_LIST, []);

export const getEntityToEntityDialog = (state: rootState) => get(getStateData(state), fields.ENTITY_TO_ENTITY_LIST_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getEntityToEntityDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getEntityToEntityDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');
export const getSubjectId = (state: rootState) => get(getStateData(state), fields.SUBJECT_ID, null);

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);
