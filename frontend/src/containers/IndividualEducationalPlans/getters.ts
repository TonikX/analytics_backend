import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields} from './enum';

import {individualEducationalPlansState, IndividualEducationalPlansType} from './types';

const getStateData = (state: rootState): individualEducationalPlansState => get(state, GENERAL_PATH);
export const getIndividualEducationalPlans = (state: rootState): Array<IndividualEducationalPlansType> => get(getStateData(state), fields.INDIVIDUAL_EDUCATIONAL_PLANS, []);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, '');