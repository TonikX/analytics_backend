import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {CompetenceFields, fields} from './enum';

import {competenceState, CompetenceType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {IndicatorType} from "../Indicators/types";
import {IndicatorsFields} from "../Indicators/enum";
import {SortingType, Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): competenceState => get(state, GENERAL_PATH);
export const getCompetences = (state: rootState): Array<CompetenceType> => get(getStateData(state), fields.COMPETENCE_LIST, []);

export const getCompetencesForSelector = (state: rootState): SelectorListType =>
    getCompetences(state).map((competence: CompetenceType) => ({
        value: competence[CompetenceFields.ID],
        label: competence[CompetenceFields.NUMBER] + ' ' + competence[CompetenceFields.TITLE],
    }))

export const getIndicatorsForSelector = (state: rootState): SelectorListType =>
  getIndicators(state).map((indicator: IndicatorType) => ({
    value: indicator[IndicatorsFields.ID],
    label: indicator[IndicatorsFields.NUMBER] + ' ' + indicator[IndicatorsFields.TITLE],
  }))

export const getCourseDialog = (state: rootState) => get(getStateData(state), fields.COMPETENCE_DIALOG, {});
export const getCompetence = (state: rootState) => get(getStateData(state), fields.COMPETENCE, {});
export const getIndicators = (state: rootState): Array<any> => get(getStateData(state), fields.INDICATORS, []);

export const isOpenDialog = (state: rootState) => get(getCourseDialog(state), fields.IS_OPEN_DIALOG, false);
export const getDialogData = (state: rootState) => get(getCourseDialog(state), fields.DIALOG_DATA, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');
export const getSearchCodeQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_CODE, '');
export const getFilterOnlyWithStandard = (state: rootState) => get(getStateData(state), fields.FILTER_ONLY_WITH_STANDARD, false);
export const getFilterAcademicPlan = (state: rootState) => get(getStateData(state), fields.FILTER_ACADEMIC_PLAN, undefined);
export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState): SortingType => get(getSorting(state), fields.SORTING_MODE, Types.ASC);
