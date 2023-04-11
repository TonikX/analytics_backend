import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {IndicatorsFields, fields} from './enum';

import {indicatorsState, IndicatorType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): indicatorsState => get(state, GENERAL_PATH);
export const getIndicators = (state: rootState): Array<IndicatorType> => get(getStateData(state), fields.INDICATORS_LIST, []);

export const getIndicatorsForSelector = (state: rootState): SelectorListType =>
    getIndicators(state).map((indicator: IndicatorType) => ({
        value: indicator[IndicatorsFields.ID],
        label: indicator[IndicatorsFields.TITLE],
    }))

export const getIndicatorsDialog = (state: rootState) => get(getStateData(state), fields.INDICATORS_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getIndicatorsDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getIndicatorsDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);