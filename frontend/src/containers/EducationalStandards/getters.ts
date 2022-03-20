import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields, EducationalStandardFields} from './enum';

import {SelectorListType} from "../../components/SearchSelector/types";
import {educationalStandardsState, EducationalStandardType} from "./types";

const getStateData = (state: rootState): educationalStandardsState => get(state, GENERAL_PATH);
export const getEducationalStandards = (state: rootState): Array<EducationalStandardType> => get(getStateData(state), fields.EDUCATIONAL_STANDARD_LIST, []);

export const getEducationalStandardsForSelector = (state: rootState): SelectorListType =>
    getEducationalStandards(state).map((educational_standards: EducationalStandardType) => ({
        value: educational_standards[EducationalStandardFields.ID],
        label: educational_standards[EducationalStandardFields.TITLE],
    }))

export const getDialog = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_STANDARD_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');

export const getProfStandard = (state: rootState) => get(getStateData(state), fields.EDUCATIONAL_STANDARD, {});


