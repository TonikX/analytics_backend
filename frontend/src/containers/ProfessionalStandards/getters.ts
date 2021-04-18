import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields, ProfessionalStandardFields} from './enum';

import {SelectorListType} from "../../components/SearchSelector/types";
import {professionalStandardsState, ProfessionalStandardsType} from "./types";

const getStateData = (state: rootState): professionalStandardsState => get(state, GENERAL_PATH);
export const getProfessionalStandards = (state: rootState): Array<ProfessionalStandardsType> => get(getStateData(state), fields.PROFESSIONAL_STANDARD_LIST, []);

export const getProfStandardsForSelector = (state: rootState): SelectorListType =>
    getProfessionalStandards(state).map((professional_standards: ProfessionalStandardsType) => ({
        value: professional_standards[ProfessionalStandardFields.ID],
        label: professional_standards[ProfessionalStandardFields.TITLE],
    }))

export const getCourseDialog = (state: rootState) => get(getStateData(state), fields.PROFESSIONAL_STANDARD_DIALOG, {});

export const isOpenDialog = (state: rootState) => get(getCourseDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getCourseDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');


