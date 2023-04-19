import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields, structuralUnitFields} from './enum';

import {SelectorListType} from "../../components/SearchSelector/types";
import {structuralUnitsState, structuralUnitType} from "./types";
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): structuralUnitsState => get(state, GENERAL_PATH);
export const getStructuralUnits = (state: rootState): Array<structuralUnitType> => get(getStateData(state), fields.STRUCTURAL_UNIT_LIST, []);
export const getStructuralUnit = (state: rootState): structuralUnitType|{} => get(getStateData(state), fields.STRUCTURAL_UNIT, {});

export const getStructuralUnitsForSelector = (state: rootState): SelectorListType =>
    getStructuralUnits(state).map((STRUCTURAL_UNITS: structuralUnitType) => ({
        value: STRUCTURAL_UNITS[structuralUnitFields.ID],
        label: STRUCTURAL_UNITS[structuralUnitFields.TITLE],
    }))

export const getStructuralUnitDialog = (state: rootState) => get(getStateData(state), fields.STRUCTURAL_UNIT_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getStructuralUnitDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getStructuralUnitDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);


