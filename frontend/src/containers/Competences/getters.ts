import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {CompetenceFields, fields} from './enum';

import {competenceState, CompetenceType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";

const getStateData = (state: rootState): competenceState => get(state, GENERAL_PATH);
export const getCompetences = (state: rootState): Array<CompetenceType> => get(getStateData(state), fields.COMPETENCE_LIST, []);

export const getCompetencesForSelector = (state: rootState): SelectorListType =>
    getCompetences(state).map((competence: CompetenceType) => ({
        value: competence[CompetenceFields.ID],
        label: competence[CompetenceFields.TITLE],
    }))

export const getCourseDialog = (state: rootState) => get(getStateData(state), fields.COMPETENCE_DIALOG, {});
export const getCompetence = (state: rootState) => get(getStateData(state), fields.COMPETENCE, {});
export const getIndicators = (state: rootState) => get(getStateData(state), fields.INDICATORS, []);

export const isOpenDialog = (state: rootState) => get(getCourseDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getCourseDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');