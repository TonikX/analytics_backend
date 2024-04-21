import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields} from './enum';

import {literatureState, LiteratureType} from './types';
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): literatureState => get(state, GENERAL_PATH);
export const getLiterature = (state: rootState): Array<LiteratureType> => get(getStateData(state), fields.LITERATURE_LIST, []);

export const getLiteratureDialog = (state: rootState) => get(getStateData(state), fields.LITERATURE_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getLiteratureDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getLiteratureDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);
