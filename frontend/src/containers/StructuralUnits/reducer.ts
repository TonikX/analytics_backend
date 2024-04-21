import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {structuralUnitsState} from "./types";

export const GENERAL_PATH = 'STRUCTURAL_UNITS';

export const initialState: structuralUnitsState = {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: '',
        [fields.SORTING_MODE]: ''
    },
    [fields.CURRENT_PAGE]: 1,
    [fields.ALL_COUNT]: 1,
    [fields.SEARCH_QUERY]: '',
    [fields.STRUCTURAL_UNIT_LIST]: [],
    [fields.STRUCTURAL_UNIT]: {},
    [fields.STRUCTURAL_UNIT_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
};

const setStructuralUnits = (state: structuralUnitsState, {payload}: any): structuralUnitsState => ({
    ...state,
    [fields.STRUCTURAL_UNIT_LIST]: payload,
});

const setStructuralUnit = (state: structuralUnitsState, {payload}: any): structuralUnitsState => ({
    ...state,
    [fields.STRUCTURAL_UNIT]: payload,
});

const changeSearchQuery = (state: structuralUnitsState, {payload}: any): structuralUnitsState => ({
    ...state,
    [fields.SEARCH_QUERY]: payload,
});

const changeCurrentPage = (state: structuralUnitsState, {payload}: any): structuralUnitsState => ({
    ...state,
    [fields.CURRENT_PAGE]: payload,
});

const changeAllCount = (state: structuralUnitsState, {payload}: any): structuralUnitsState => ({
    ...state,
    [fields.ALL_COUNT]: payload,
});

const openDialog = (state: structuralUnitsState, {payload}: any): structuralUnitsState => ({
    ...state,
    [fields.STRUCTURAL_UNIT_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: true,
        [fields.DIALOG_DATA]: payload
    }
});

const closeDialog = (state: structuralUnitsState): structuralUnitsState => ({
    ...state,
    [fields.STRUCTURAL_UNIT_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: false,
        [fields.DIALOG_DATA]: {}
    }
});

const changeSorting = (state: structuralUnitsState, {payload}: any): structuralUnitsState => ({
    ...state,
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: payload.field,
        [fields.SORTING_MODE]: payload.mode
    }
});

export const reducer = createReducer(initialState, {
    [actions.setStructuralUnits.type]: setStructuralUnits,
    [actions.openDialog.type]: openDialog,
    [actions.closeDialog.type]: closeDialog,
    [actions.changeSearchQuery.type]: changeSearchQuery,
    [actions.changeCurrentPage.type]: changeCurrentPage,
    [actions.changeAllCount.type]: changeAllCount,
    [actions.changeSorting.type]: changeSorting,
    [actions.setStructuralUnit.type]: setStructuralUnit,
});
