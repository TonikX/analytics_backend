import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {fields} from './enum';

import {individualTrajectoriesState, IndividualTrajectoriesType} from './types';
import {Types} from "../../components/SortingButton/types";

const getStateData = (state: rootState): individualTrajectoriesState => get(state, GENERAL_PATH);
export const getIndividualTrajectories = (state: rootState): Array<IndividualTrajectoriesType> => get(getStateData(state), fields.INDIVIDUAL_TRAJECTORIES, []);

export const getShowOnlyMy = (state: rootState) => get(getStateData(state), fields.SHOW_ONLY_MY, false);

export const getAllCount = (state: rootState) => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState) => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState) => get(getStateData(state), fields.SEARCH_QUERY, '');

export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState) => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState) => get(getSorting(state), fields.SORTING_MODE, Types.ASC);

export const getFilters = (state: rootState) => get(getStateData(state), fields.FILTERING, {});
