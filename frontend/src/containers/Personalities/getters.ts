import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {PersonalityFields, fields, filterFields} from './enum';

import {personalitiesState, PersonalityType, groupType, filteringType} from './types';
import {SelectorListType} from "../../components/SearchSelector/types";
import {SortingType} from "../../components/SortingButton/types";

const getStateData = (state: rootState): personalitiesState => get(state, GENERAL_PATH);

export const getPersonalities = (state: rootState): Array<PersonalityType> => { 
    return get(getStateData(state), fields.PERSONALITIES_LIST, [])
};

export const getPersonalitiesForSelector = (state: rootState): SelectorListType =>
    getPersonalities(state).map((personality: any) => ({
        value: personality[PersonalityFields.ID],
        label: personality[PersonalityFields.USERNAME],
        })
    )

export const getAllCount = (state: rootState): number => get(getStateData(state), fields.ALL_COUNT, 1);
export const getCurrentPage = (state: rootState): number => get(getStateData(state), fields.CURRENT_PAGE, 1);
export const getSearchQuery = (state: rootState): string => get(getStateData(state), fields.SEARCH_QUERY, '');
export const getSorting = (state: rootState) => get(getStateData(state), fields.SORTING, {});
export const getSortingField = (state: rootState): string => get(getSorting(state), fields.SORTING_FIELD, '');
export const getSortingMode = (state: rootState): SortingType => get(getSorting(state), fields.SORTING_MODE, '');
export const getFilters = (state: rootState): filteringType => get(getStateData(state), fields.FILTERING)
export const getFilterSearchQuery = (state: rootState): string => get(getFilters(state), filterFields.FILTERING_SEARCH_QUERY, '')