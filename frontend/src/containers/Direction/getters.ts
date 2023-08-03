import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {DirectionFields, fields} from './enum';

import {directionState, DirectionType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): directionState => get(state, GENERAL_PATH);
export const getEducationalProgram = (state: rootState): Array<DirectionType> => get(getStateData(state), fields.EDUCATIONAL_PROGRAM_LIST, []);

export const getDirectionsForSelector = (state: rootState): SelectorListType =>
    getEducationalProgram(state).map((direction: DirectionType) => ({
        value: direction[DirectionFields.ID],
        label: direction[DirectionFields.TITLE] + ' ' + direction[DirectionFields.NUMBER],
    }))

export const getEducationalProgramDialog = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_PROGRAM_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getEducationalProgramDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getEducationalProgramDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);